import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function AcademicsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Academics</h1>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Programs Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src="/Ba.jpg"
                  alt="B.A. Fashion Design"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">B.A. Fashion Design</h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive three-year program that covers all aspects of fashion design, including garment
                  construction, pattern making, textile design, and fashion illustration.
                </p>
                <Button asChild className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/academics/syllabus">
                    Learn More <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

       
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Academic Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-rose-100 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-rose-600"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Admission</h3>
              <p className="text-sm text-gray-600 mb-4">Information about eligibility, fees, and application process</p>
              <Button asChild variant="outline" size="sm" className="mt-auto">
                <Link href="/academics/admission">View Details</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-rose-100 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-rose-600"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Syllabus</h3>
              <p className="text-sm text-gray-600 mb-4">Detailed course structure and curriculum</p>
              <Button asChild variant="outline" size="sm" className="mt-auto">
                <Link href="/academics/syllabus">View Details</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-rose-100 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-rose-600"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
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
              <div className="bg-rose-100 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-rose-600"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
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

      <section>
        <h2 className="text-2xl font-bold mb-6">Faculty</h2>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative h-48 w-48 flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=192&width=192"
                    alt="Faculty"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Faculty</h3>
                  <p className="text-gray-600 mb-4">
                    The National Institute of Fashion Designing boasts a team of highly qualified and experienced
                    faculty members who are experts in their respective fields. Our faculty includes industry
                    professionals, designers, and academics who bring a wealth of knowledge and practical experience to
                    the classroom.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Our teaching staff is dedicated to providing students with the best education and mentorship to help
                    them succeed in the competitive fashion industry. They are committed to staying updated with the
                    latest trends, technologies, and teaching methodologies.
                  </p>
                  <Button asChild className="bg-rose-600 hover:bg-rose-700">
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
  )
}
