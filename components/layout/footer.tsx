import Link from "next/link"
import { Mail, Phone, Clock, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-gray-300 hover:text-white transition-colors">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/academics/admission" className="text-gray-300 hover:text-white transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              
              <li>
           
              </li>
              <li>
                <Link href="/academics/syllabus" className="text-gray-300 hover:text-white transition-colors">
                  Syllabus
                </Link>
              </li>
              <li>
                <Link href="/academics/faculty" className="text-gray-300 hover:text-white transition-colors">
                  Faculty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/library" className="text-gray-300 hover:text-white transition-colors">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-gray-300 hover:text-white transition-colors">
                  Facilities
                </Link>
              </li>
              <li>
                <Link href="/academics/calendar" className="text-gray-300 hover:text-white transition-colors">
                  Academic Calendar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Siddharth Institute of Pharmacy, Sambhaji Nagar pincode: 431002
</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <a
                  href="mailto:pharmacysiddharth4@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  pharmacysiddharth4@gmail.com 

                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <a href="tel:+917888155999" className="text-gray-300 hover:text-white transition-colors">
                  +917888155999
                </a>
              </li>
             
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-300">Mon-Sat: 9:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-gray-400 mb-2 sm:mb-0">
              &copy; {new Date().getFullYear()} Siddharth Institute of Pharmacy. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Website Engineered with ❤️ by <span className="text-orange-400">SOS STATISTICAL ANALYSIS AND IT SOLUTIONS pvt ltd</span>
              <br />
              contact here <span className="text-orange-400">sosresearch.it5601@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
