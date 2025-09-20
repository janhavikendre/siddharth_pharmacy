import { CheckCircle } from "lucide-react"

const reasons = [
  "PCI-approved D.Pharmacy program with updated syllabus.",
  "Well-equipped laboratories with modern instruments.",
  "Experienced and qualified faculty in pharmaceutical sciences.",
  "Guidance for competitive exams and higher studies.",
  "Strong academic support and mentorship system.",
  "Focus on ethical values and community service.",
  "Collaborations with healthcare institutions for training.",
  "Calm, focused campus environment ideal for learning.",
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6">
          Why Choose Us?
        </h2>
        <div className="w-full max-w-2xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 text-center">
            At Siddharth Institute of Pharmacy, we are dedicated to competent pharmacy professionals through a value-based, practical, and industry-oriented education.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start justify-center">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-left">{reason}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
