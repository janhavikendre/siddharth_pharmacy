import HeroBanner from "@/components/home/hero-banner"
import Announcements from "@/components/home/announcements"
import InstituteHighlights from "@/components/home/institute-highlights"
import WhyChooseUs from "@/components/home/why-choose-us"
import CallToAction from "@/components/home/call-to-action"
import clientPromise from "@/lib/mongodb"

export default async function Home() {
  // Fetch announcements directly from the database
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const announcements = await db
      .collection("announcements")
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .toArray()

    return (
      <div className="flex flex-col ">
        <Announcements announcements={announcements} />
        <HeroBanner />
        <InstituteHighlights />
        <WhyChooseUs />
        <CallToAction />
      </div>
    )
  } catch (error) {
    console.error("Error fetching announcements:", error)

    return (
      <div className="flex flex-col ">
        <Announcements announcements={[]} />
        <HeroBanner />
        <InstituteHighlights />
        <WhyChooseUs />
        <CallToAction />
      </div>
    )
  }
}
