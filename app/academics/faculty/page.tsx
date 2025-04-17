import { FacultyTabs } from "@/components/faculty/faculty-tabs"
import { headers } from 'next/headers'

async function getFaculty() {
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
    
    type Faculty = {
      _id: string;
      name: string;
      designation: string;
      department?: string;
      isTeaching?: boolean;
      [key: string]: any;
    }
    
    const { success, data } = await response.json() as { success: boolean; data: Faculty[] }
    if (!success) throw new Error('Failed to fetch faculty')

    const teaching = data.filter(f => f.isTeaching !== false)
    const nonTeaching = data.filter(f => f.isTeaching === false)

    return { teaching, nonTeaching }
  } catch (error) {
    console.error("Error fetching faculty:", error)
    return { teaching: [], nonTeaching: [] }
  }
}

export default async function FacultyPage() {
  const { teaching, nonTeaching } = await getFaculty()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Our Faculty & Staff</h1>
      <FacultyTabs teaching={teaching} nonTeaching={nonTeaching} />
    </div>
  )
}
