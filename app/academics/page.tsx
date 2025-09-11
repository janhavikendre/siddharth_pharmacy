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
              The Siddharth Institute of Pharmacy offers a PCI-approved D.Pharmacy program designed to provide students with a strong foundation in pharmaceutical sciences and practical skills for a successful career in pharmacy.
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

      </div>
    </>
  )
}
