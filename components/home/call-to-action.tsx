import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="py-16 bg-rose-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fashion Design Journey?</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Applications are now open for the upcoming academic year. Take the first step towards your creative career in
          fashion design.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/academics/programs">Explore Programs</Link>
          </Button>
          <Button asChild size="lg" className="bg-white text-rose-600 hover:bg-gray-100">
            <Link href="/academics/admission">Apply Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
