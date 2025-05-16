import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Clock, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="text-blue-100 p-3 rounded-full mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <a href="mailto:523nationalinstitute@gmail.com" className="text-blue-600 hover:underline">
              523nationalinstitute@gmail.com
            </a>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="text-blue-100 p-3 rounded-full mb-4">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <a href="tel:+919974469124" className="text-blue-600 hover:underline">
              +91 9974469124
            </a>
            <a href="tel:+918411888688" className="text-blue-600 hover:underline mt-1">
              +91 8411888688
            </a>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="text-blue-100 p-3 rounded-full mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Working Hours</h3>
            <p className="text-gray-700">Monday - Saturday</p>
            <p className="text-gray-700">9:00 AM - 5:00 PM</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter subject" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" rows={5} required />
              </div>

              <Button type="submit" className=" bg-blue-600:bg-blue-700 w-full md:w-auto">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
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
                title="Deshmukh College Of Pharmacy"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Our Address</h3>
              <p className="text-gray-700">
                National Institute of Fashion Designing,
                <br />
                Kasar Sirsi,
                <br />
                Affiliated to S.N.D.T.W University, Mumbai
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
