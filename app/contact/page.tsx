import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Clock, MapPin } from "lucide-react"

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

export default function ContactPage() {
  return (
    <>
      <SectionHero title="Contact Us" bgImage="/about.avif" />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-12 text-blue-800">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow border-blue-100">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-white bg-blue-600 p-3 rounded-full mb-4 shadow-md">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2 text-blue-800">Email</h3>
              <a href="mailto:pharmacysiddharth4@gmail.com" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                pharmacysiddharth4@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-blue-100">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-white bg-blue-600 p-3 rounded-full mb-4 shadow-md">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2 text-blue-800">Phone</h3>
              <a href="tel:+917888155999" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                +917888155999
              </a>
              <a href="tel:+917888155999" className="text-blue-600 hover:text-blue-700 hover:underline mt-1 transition-colors">
                +917888155999
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-blue-100">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-white bg-blue-600 p-3 rounded-full mb-4 shadow-md">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2 text-blue-800">Working Hours</h3>
              <p className="text-gray-700">Monday - Saturday</p>
              <p className="text-gray-700">9:00 AM - 5:00 PM</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-blue-100 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Send Us a Message</h2>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-blue-700 font-medium">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your name" 
                      required 
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-700 font-medium">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      required 
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-blue-700 font-medium">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="Enter subject" 
                    required 
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-blue-700 font-medium">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Enter your message" 
                    rows={5} 
                    required 
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto px-8 py-2 transition-colors shadow-md"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-blue-100 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="h-full min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15186.013811134044!2d76.74156135!3d17.937091199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf4166f8287605%3A0xec1001da3d0dfc40!2sDESHMUKH%20COLLEGE%20OF%20PHARMACY%20KASAR%20SIRSI!5e0!3m2!1sen!2sin!4v1701840230740!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Siddharth Institute of Pharmacy"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-100 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="text-white bg-blue-600 p-2 rounded-full mr-4 mt-1">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-blue-800 text-lg">Our Address</h3>
                <p className="text-gray-700 leading-relaxed">
                  Siddharth Institute of Pharmacy,
                  <br />
                  Mitmita Chhan.
                  <br />
                  Sambhaji Nagar pincode: 431001
                  <br />
                  Approved by PCI New Delhi
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
