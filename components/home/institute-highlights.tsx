import Image from "next/image"
import Link from "next/link"
import { Eye } from "lucide-react"

export default function InstituteHighlights() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top grid: left (welcome/quote), right (about/city/btn) */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* Left */}
          <div>
            <h2 className="text-green-600 text-sm font-semibold mb-4 tracking-widest uppercase">
              WELCOME TO SIDDHARTH INSTITUTE OF PHARMACY
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Ramai Pratishthan's Siddharth Institute of Pharmacy (D.Pharmacy) is committed to fostering academic excellence and professional ethics. Located at Mitmita, Chhatrapati Sambhajinagar (Aurangabad) – 431002, the institute is recognized by the Pharmacy Council of India New Delhi (PCI – Code: 10549) and affiliated to DTE, Mumbai. Our mission is to shape competent and compassionate healthcare professionals who serve the community with dedication.
            </p>
            <p className="text-gray-600 text-lg mb-4">
              Our campus offers a conducive learning atmosphere, equipped with modern facilities and located within reach of major cities like Chhatrapati Sambhajinagar (Aurangabad). We emphasize quality education through a curriculum designed to meet global pharmacy standards.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Students are guided by experienced faculty and benefit from excellent infrastructure that supports both academic and co-curricular growth.
            </p>
            <h1 className="text-3xl sm:text-3xl md:text-3xl font-extrabold text-blue-900 mb-0 leading-tight ml-1">
              "Empowering Pharmacy Education for a Better Tomorrow"
            </h1>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-600 text-lg mb-4">
                Our campus offers a conducive learning atmosphere, equipped with modern facilities and located within reach of major cities like Latur. 
                We emphasize quality education through a curriculum designed to meet global pharmacy standards.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Students are guided by experienced faculty and benefit from excellent infrastructure that supports both academic and co-curricular growth.
              </p>
            </div>
            <Link href="/about" className="inline-block w-fit">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded transition text-base">
                READ MORE
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom grid: two images and vision card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Image 1 */}
          <div className="aspect-[4/3] rounded overflow-hidden">
            <Image
              src="/student.jpg"
              alt="Students"
              width={600}
              height={450}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Image 2 */}
          <div className="aspect-[4/3] rounded overflow-hidden">
            <Image
              src="/lab.jpg"
              alt="Lab"
              width={600}
              height={450}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Vision Card */}
          <div className="rounded-lg p-6 flex flex-col justify-center bg-gradient-to-br from-blue-900 to-green-500 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-7 w-7 text-white" />
              <span className="text-2xl font-bold">Vision</span>
            </div>
            <p className="text-base sm:text-lg">
              To provide quality pharmacy education that transforms students into competent healthcare professionals, equipped with knowledge, skills, and ethical values to serve society and contribute to the advancement of pharmaceutical sciences.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
