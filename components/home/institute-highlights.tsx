import { GraduationCap, Users, Award, BookOpen } from "lucide-react"

const highlights = [
  {
    icon: GraduationCap,
    title: "Expert Faculty",
    description: "Learn from industry professionals with years of experience in fashion design.",
  },
  {
    icon: Users,
    title: "Industry Connections",
    description: "Build your network with our strong industry partnerships and placement opportunities.",
  },
  {
    icon: Award,
    title: "Recognized Programs",
    description: "Our programs are affiliated with S.N.D.T.W University, Mumbai, ensuring quality education.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    description: "Our curriculum combines theoretical knowledge with practical skills for a well-rounded education.",
  },
]

export default function InstituteHighlights() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Institute Highlights</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover what makes the National Institute of Fashion Designing a premier choice for aspiring fashion
            designers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-rose-100 rounded-full">
                  <highlight.icon className="h-8 w-8 text-rose-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{highlight.title}</h3>
              <p className="text-gray-600 text-center">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
