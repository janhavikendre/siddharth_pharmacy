import { LibraryTabs } from "@/components/library/library-tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import clientPromise from "@/lib/mongodb"
import Image from "next/image"

async function getLibraryContent() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const content = await db.collection("content").findOne({ section: "library" })
    const resources = await db.collection("library_resources").find({}).sort({ category: 1 }).toArray()

    return {
      content: content || {},
      resources: resources || [],
    }
  } catch (error) {
    console.error("Error fetching library content:", error)
    return {
      content: {},
      resources: [],
    }
  }
}

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

export default async function LibraryPage({ searchParams }: { searchParams: { category?: string } }) {
  const { content, resources } = await getLibraryContent()

  const category = searchParams.category || 'about'

  // Hardcoded books for when database is empty
  const defaultBooks = [
    {
      title: "Pharmaceutical Chemistry",
      author: "Dr. A.K. Sharma",
      description: "Comprehensive guide to pharmaceutical chemistry covering organic and inorganic compounds used in medicine.",
      isbn: "978-0123456789"
    },
    {
      title: "Pharmacology and Therapeutics",
      author: "Dr. R.S. Satoskar",
      description: "Essential textbook covering drug actions, mechanisms, and therapeutic applications.",
      isbn: "978-0234567891"
    },
    {
      title: "Pharmacognosy",
      author: "Dr. C.K. Kokate",
      description: "Study of medicinal plants and natural products used in pharmacy.",
      isbn: "978-0345678912"
    },
    {
      title: "Pharmaceutical Microbiology",
      author: "Dr. S.P. Vyas",
      description: "Microbiological aspects of pharmaceutical science and sterile product manufacturing.",
      isbn: "978-0456789123"
    },
    {
      title: "Hospital and Clinical Pharmacy",
      author: "Dr. M.C. Nahata",
      description: "Practical guide to hospital pharmacy practice and clinical pharmaceutical care.",
      isbn: "978-0567891234"
    },
    {
      title: "Pharmaceutical Jurisprudence",
      author: "Dr. N.K. Jain",
      description: "Legal aspects of pharmacy practice and pharmaceutical regulations.",
      isbn: "978-0678912345"
    }
  ]

  // Use database books if available, otherwise use default books
  const availableBooks = resources.filter(r => r.category === 'books').length > 0 
    ? resources.filter(r => r.category === 'books')
    : defaultBooks

  return (
    <>
      <SectionHero title="Library & Resources" bgImage="/about.avif" />
      <div className="container mx-auto px-4 py-12">
        
        {/* About Section */}
        {category === 'about' && (
          <>
            <h1 className="text-3xl font-bold text-center mb-12">Library & Resources</h1>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-blue-800">About Our Library</h2>
                <div className="prose max-w-none">
                  {content.about ? (
                    <div dangerouslySetInnerHTML={{ __html: content.about }} />
                  ) : (
                    <>
                      <p>
                        The Siddharth Institute of Pharmacy library is a comprehensive resource center for pharmacy
                        students and faculty. Our library houses an extensive collection of books, journals, magazines,
                        digital resources, and archives related to pharmaceutical sciences, pharmacology, medicinal chemistry, and
                        industry practices.
                      </p>
                      <p>
                        Our mission is to provide students with access to quality resources that enhance their learning
                        experience and support their academic and research endeavors. The library is continuously updated with
                        the latest publications and digital resources to keep pace with the evolving pharmaceutical industry.
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-blue-700">Library Hours</h3>
                  <ul className="space-y-1">
                    {content.hours ? (
                      <div dangerouslySetInnerHTML={{ __html: content.hours }} />
                    ) : (
                      <>
                        <li className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>9:00 AM - 6:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Saturday</span>
                          <span>10:00 AM - 4:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Sunday</span>
                          <span>Closed</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <Card className="mb-12 overflow-hidden border-rose-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0 text-blue-100 p-4 rounded-full">
                    <Search className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2 text-blue-800">Online Catalog</h2>
                    <p className="text-gray-700 mb-4">
                      Search our online catalog to find books, journals, and other resources available in our library. You can
                      check availability, place holds, and renew borrowed items through our online system.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Access Online Catalog</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Books Section */}
        {category === 'books' && (
          <>
            <h1 className="text-3xl font-bold text-center mb-12">Available Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableBooks.map((book, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">{book.title}</h3>
                    {book.author && <p className="text-gray-600 mb-2">Author: {book.author}</p>}
                    {book.description && <p className="text-gray-500 text-sm mb-3">{book.description}</p>}
                    {book.isbn && <p className="text-gray-400 text-xs">ISBN: {book.isbn}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Services Section */}
        {category === 'services' && (
          <>
            <h1 className="text-3xl font-bold text-center mb-12">Library Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-900">Book Lending</h3>
                  <p className="text-gray-700 mb-4">
                    Borrow books for extended periods to support your studies and research. Students can check out up to 5 books at a time.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Loan period: 15 days for students</li>
                    <li>• Renewal available (subject to availability)</li>
                    <li>• Late return charges apply</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-900">Digital Resources</h3>
                  <p className="text-gray-700 mb-4">
                    Access to online journals, e-books, and digital databases for pharmaceutical research and studies.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Online journal access</li>
                    <li>• E-book collection</li>
                    <li>• Research database access</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-900">Reading Room</h3>
                  <p className="text-gray-700 mb-4">
                    Quiet study spaces with comfortable seating and proper lighting for focused reading and research.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Silent study area</li>
                    <li>• Individual study carrels</li>
                    <li>• Group study rooms</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-900">Reference Services</h3>
                  <p className="text-gray-700 mb-4">
                    Professional assistance for research, citations, and finding relevant academic resources for your projects.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Research assistance</li>
                    <li>• Citation guidance</li>
                    <li>• Literature search support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        )}

      </div>
    </>
  )
}
