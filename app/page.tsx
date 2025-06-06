import HeroBanner from "@/components/home/hero-banner"
import Announcements from "@/components/home/announcements"
import Banner from "@/components/Banner/Banner"
import InstituteHighlights from "@/components/home/institute-highlights"
import WhyChooseUs from "@/components/home/why-choose-us"
import CallToAction from "@/components/home/call-to-action"
import { headers } from "next/headers"

export default async function Home() {
  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https"
  const baseUrl = `${protocol}://${host}`
  
  let announcements = []
  let banners = []
  
  try {
    const res = await fetch(`${baseUrl}/api/announcements`, { cache: "no-store" })
    const data = await res.json()
    announcements = data.data
  } catch (error) {
    console.error("Error fetching announcements:", error)
  }

  try {
    const res = await fetch(`${baseUrl}/api/Banners`, { cache: "no-store" })
    const data = await res.json()
    banners = data.data
  } catch (error) {
    console.error("Error fetching banners:", error)
  }

  return (
    <div className="flex flex-col">
      <Announcements announcements={announcements} />
      <Banner banners={banners} />
      <HeroBanner />
      <InstituteHighlights />
      <WhyChooseUs />
      <CallToAction />
    </div>
  )
}
