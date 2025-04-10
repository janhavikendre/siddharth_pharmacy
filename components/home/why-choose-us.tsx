import Image from "next/image"
import { CheckCircle } from "lucide-react"

const reasons = [
  "Industry-relevant curriculum updated regularly",
  "Hands-on practical training in state-of-the-art facilities",
  "Experienced faculty with industry background",
  "Strong industry connections for internships and placements",
  "Regular workshops and masterclasses by industry experts",
  "Opportunities to showcase work at fashion shows and exhibitions",
  "Comprehensive library with latest fashion resources",
  "Supportive learning environment fostering creativity",
]

export default function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/image1.png"
              alt="Fashion design students working"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
            <p className="text-lg text-gray-600 mb-8">
              At the National Institute of Fashion Designing, we are committed to providing a comprehensive education
              that prepares students for successful careers in the fashion industry.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-rose-600 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
