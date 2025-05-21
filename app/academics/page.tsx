import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

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

export default function AcademicsPage() {
  return (
    <>
      <SectionHero title="Academics" bgImage="/about.avif" />
      <div className="container mx-auto px-4 py-12">

        {/* Pharmacy-specific Introduction */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              The Deshmukh College Of Pharmacy offers a PCI-approved D.Pharmacy program designed to provide students with a strong foundation in pharmaceutical sciences and practical skills for a successful career in pharmacy.
            </p>
            <p className="text-base md:text-lg text-gray-600">
              Our curriculum is regularly updated to meet industry standards and regulatory requirements, ensuring our graduates are well-prepared for the evolving healthcare sector.
            </p>
          </div>
        </section>

        {/* Programs Offered */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Programs Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src="/dpharm.jpg"
                    alt="D.Pharmacy"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-900">D.Pharmacy</h3>
                  <p className="text-gray-700 mb-4">
                    A two-year diploma program approved by PCI, focusing on pharmaceutical chemistry, pharmacology, pharmacognosy, and practical training in dispensing, compounding, and community pharmacy.
                  </p>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/academics/syllabus">
                      View Syllabus <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src="/pharmacy-lab.jpg"
                    alt="Pharmacy Lab"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-blue-900">Practical Training</h3>
                  <p className="text-gray-700 mb-4">
                    Hands-on laboratory sessions and hospital/industry training are integral parts of the program, preparing students for real-world pharmacy practice and regulatory compliance.
                  </p>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/academics/labs">
                      Explore Labs <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Academic Resources */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Academic Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-blue-100 p-3 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <h3 className="font-semibold mb-2">Admission</h3>
                <p className="text-sm text-gray-600 mb-4">Eligibility, fees, and application process for D.Pharmacy</p>
                <Button asChild variant="outline" size="sm" className="mt-auto">
                  <Link href="/academics/admission">View Details</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-blue-100 p-3 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </div>
                <h3 className="font-semibold mb-2">Syllabus</h3>
                <p className="text-sm text-gray-600 mb-4">Detailed D.Pharmacy course structure and curriculum</p>
                <Button asChild variant="outline" size="sm" className="mt-auto">
                  <Link href="/academics/syllabus">View Details</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-blue-100 p-3 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <h3 className="font-semibold mb-2">Academic Calendar</h3>
                <p className="text-sm text-gray-600 mb-4">Important dates, events, and schedules</p>
                <Button asChild variant="outline" size="sm" className="mt-auto">
                  <Link href="/academics/calendar">View Details</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="text-blue-100 p-3 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                </div>
                <h3 className="font-semibold mb-2">Exams & Results</h3>
                <p className="text-sm text-gray-600 mb-4">Examination schedules and result announcements</p>
                <Button asChild variant="outline" size="sm" className="mt-auto">
                  <Link href="/academics/exams">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Faculty Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Faculty</h2>
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative h-48 w-48 flex-shrink-0">
                    <Image
                      src="/faculty-pharmacy.jpg"
                      alt="Faculty"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-blue-900">Our Faculty</h3>
                    <p className="text-gray-700 mb-4">
                      Our faculty comprises experienced and qualified professionals in pharmaceutical sciences, committed to providing value-based education, mentorship, and guidance for competitive exams and higher studies.
                    </p>
                    <p className="text-gray-600 mb-4">
                      The teaching staff is dedicated to fostering ethical values, community service, and a supportive learning environment for all students.
                    </p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/academics/faculty">
                        Meet Our Faculty <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  )
}
