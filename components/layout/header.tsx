"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, MapPin, Phone, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Committees", href: "/committees" },
  { name: "Academics", href: "/academics" },
  { name: "Facilities", href: "/facilities" },
  { name: "Library", href: "/library" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact Us", href: "/contact" },
]

const aboutOptions = [
  { label: "About Institute", value: "institute" },
  { label: "About Society", value: "society" },
  { label: "Vision & Mission", value: "vision" },
  { label: "Directors", value: "directors" },
  { label: "Leadership", value: "leadership" },
]

const committeesOptions = [
  { label: "Placement Cell", value: "placementcell" },
  { label: "Grievance Committee", value: "grievancecommittee" },
  { label: "Anti-Ragging Committee", value: "antiraggingcommittee" },
  { label: "Anti-Discrimination Cell", value: "antidiscriminationcell" },
  { label: "Vishakha Committee", value: "vishakhacommittee" },
  { label: "Avishkar Cell", value: "avishkarcell" },
  { label: "Development Committee", value: "developmentcommittee" },
  { label: "Managing Committee", value: "managingcommittee" },
]

const libraryOptions = [
  { label: "Fashion Design Books", value: "books" },
  { label: "Fashion Journals & Magazines", value: "journals" },
  { label: "Digital Resources", value: "digital" },
  { label: "Fashion Archives", value: "archives" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top Info Section */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-20 w-20">
            <Image src="/logo.svg" alt="Shramjivi Logo" fill className="object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1a237e] uppercase leading-tight">Deshmukh College Of Pharmacy</h1>
            <p className="text-sm text-gray-600">DTE Code- 2636</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-800">
          <div className="flex items-center space-x-2">
            <MapPin className="text-blue-600 w-5 h-5" />
            <div>
              <span className="font-semibold text-[#1a237e]">Location</span><br />
              <span className="text-gray-700">Kasar Sirsi 413607 Tq. Nilanga Dist. Latur</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="text-blue-600 w-5 h-5" />
            <div>
              <span className="font-semibold text-[#1a237e]">Call Us</span><br />
              <span className="text-gray-700 space-y-2">
                <span>9975469123 / </span>
                <span >8411888688</span>
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="text-blue-600 w-5 h-5" />
            <div>
              <span className="font-semibold text-[#1a237e]">Email</span><br />
              <span className="text-gray-700">deshmukhpharmacy2022@@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border between sections */}
      <div className="border-t"></div>

      {/* Navigation Bar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <nav className="hidden md:flex space-x-6">
          {navigation.map((item) =>
            item.name === "About Us" ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <button className="text-sm font-semibold text-[#1a237e] hover:text-blue-500 transition-colors flex items-center">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {aboutOptions.map((opt) => (
                    <DropdownMenuItem
                      key={opt.value}
                      onClick={() => {
                        window.location.href =
                          opt.value === "institute"
                            ? "/about"
                            : `/about?section=${opt.value}`
                      }}
                    >
                      {opt.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.name === "Committees" ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <button className="text-sm font-semibold text-[#1a237e] hover:text-blue-500 transition-colors flex items-center">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {committeesOptions.map((opt) => (
                    <DropdownMenuItem
                      key={opt.value}
                      onClick={() => {
                        window.location.href =
                          opt.value === "placementcell"
                            ? "/committees"
                            : `/committees?section=${opt.value}`
                      }}
                    >
                      {opt.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.name === "Library" ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <button className="text-sm font-semibold text-[#1a237e] hover:text-blue-500 transition-colors flex items-center">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {libraryOptions.map((opt) => (
                    <DropdownMenuItem
                      key={opt.value}
                      onClick={() => {
                        window.location.href =
                          opt.value === "books"
                            ? "/library"
                            : `/library?category=${opt.value}`
                      }}
                    >
                      {opt.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-[#1a237e] hover:text-blue-500 transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        <Button asChild variant="outline" className="hidden md:inline border-green-600 text-blue-600 hover:bg-green-50">
          <Link href="/academics/admission">Apply Now</Link>
        </Button>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow">
          <div className="px-4 py-2 space-y-2">
            {navigation.map((item) =>
              item.name === "About Us" ? (
                <div key={item.name} className="space-y-1">
                  <div className="font-semibold text-[#1a237e]">About Us</div>
                  {aboutOptions.map((opt) => (
                    <button
                      key={opt.value}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        window.location.href =
                          opt.value === "institute"
                            ? "/about"
                            : `/about?section=${opt.value}`
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : item.name === "Committees" ? (
                <div key={item.name} className="space-y-1">
                  <div className="font-semibold text-[#1a237e]">Committees</div>
                  {committeesOptions.map((opt) => (
                    <button
                      key={opt.value}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        window.location.href =
                          opt.value === "placementcell"
                            ? "/committees"
                            : `/committees?section=${opt.value}`
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : item.name === "Library" ? (
                <div key={item.name} className="space-y-1">
                  <div className="font-semibold text-[#1a237e]">Library</div>
                  {libraryOptions.map((opt) => (
                    <button
                      key={opt.value}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        window.location.href =
                          opt.value === "books"
                            ? "/library"
                            : `/library?category=${opt.value}`
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <Button asChild variant="outline" className="w-full border-green-600 text-blue-600 hover:bg-green-50">
              <Link href="/academics/admission">Apply Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
