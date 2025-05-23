import Link from "next/link"
import Image from "next/image"
import { FacultyTabs } from "@/components/faculty/faculty-tabs"
import { headers } from 'next/headers'

function SectionHero({ title, bgImage }: { title: string; bgImage?: string }) {
  return (
    <div className="relative w-full h-40 md:h-56 flex items-center justify-center">
      {bgImage && (
        <Image
          src={bgImage}
          alt={title}
          fill
          className="object-cover"
          style={{ zIndex: 0 }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-green-400/80" style={{ zIndex: 1 }} />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl md:text-4xl font-bold text-white text-center drop-shadow-lg py-8">
          {title}
        </h1>
      </div>
      <svg className="absolute bottom-0 left-0 w-full" height="32" viewBox="0 0 100 10" preserveAspectRatio="none" style={{ zIndex: 2 }}>
        <polygon points="0,10 100,0 100,10" fill="white" />
      </svg>
    </div>
  )
}

interface Faculty {
  _id: string;
  name: string;
  designation: string;
  department?: string;
  qualification?: string;
  experience?: string;
  specialization?: string;
  email?: string;
  bio?: string;
  imageId?: string;
  isTeaching?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ApiResponse {
  success: boolean;
  data: Faculty[];
  error?: string;
}

interface FacultyData {
  teaching: Faculty[];
  nonTeaching: Faculty[];
}

async function getFaculty(): Promise<FacultyData> {
  try {
    const headersList = await headers()
    const host = headersList.get('host') || 'localhost:3000'
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    
    const response = await fetch(`${protocol}://${host}/api/faculty`, {
      next: { revalidate: 0 },
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
    
    const { success, data } = await response.json() as ApiResponse
    if (!success) throw new Error('Failed to fetch faculty')

    const teaching = data.filter(f => f.isTeaching !== false)
    const nonTeaching = data.filter(f => f.isTeaching === false)

    return { teaching, nonTeaching }
  } catch (error) {
    console.error("Error fetching faculty:", error)
    return { teaching: [], nonTeaching: [] }
  }
}

export default async function FacultyPage({ searchParams }: { searchParams: { tab?: string } }) {
  const { teaching, nonTeaching } = await getFaculty()
  const activeTab = searchParams.tab || 'teaching'

  // Display faculty based on active tab without passing defaultTab prop
  const facultyToShow = activeTab === 'non-teaching' ? nonTeaching : teaching
  const title = activeTab === 'non-teaching' ? 'Non-Teaching Faculty' : 'Teaching Faculty'

  return (
    <>
      <SectionHero title="Our Faculty & Staff" bgImage="/about.avif" />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-blue-800">{title}</h2>
        {/* Display faculty grid directly instead of using FacultyTabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyToShow.map((faculty) => (
            <div key={faculty._id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">{faculty.name}</h3>
              <p className="text-gray-600 mb-1">{faculty.designation}</p>
              {faculty.qualification && (
                <p className="text-gray-500 text-sm mb-2">{faculty.qualification}</p>
              )}
              {faculty.specialization && (
                <p className="text-gray-500 text-sm mb-2">Specialization: {faculty.specialization}</p>
              )}
              {faculty.experience && (
                <p className="text-gray-500 text-sm">Experience: {faculty.experience}</p>
              )}
            </div>
          ))}
        </div>
        {facultyToShow.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No faculty members found in this category.</p>
          </div>
        )}
      </div>
    </>
  )
}
