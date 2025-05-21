import Image from "next/image"
import { AboutTabs } from "@/components/about/about-tabs"
import clientPromise from "@/lib/mongodb"
import { WithId } from 'mongodb'

interface AboutContent extends WithId<Document> {
  institute: string
  society: string
  vision?: string
  mission?: string

}

interface Leader extends WithId<Document> {
  name: string
  role: string
  position: string
  message?: string
  imageId?: string
  createdAt: Date
  updatedAt: Date
}

async function getAboutContent() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const aboutContent = await db.collection("content").findOne({ section: "about" }) as AboutContent
    const directors = await db.collection("directors").find({}).sort({ order: 1 }).toArray()
    const leadership = await db.collection("leadership").find({}).toArray() as Leader[]
    
    return {
      about: aboutContent || { institute: "", society: "" },
      directors: directors || [],
      leadership: leadership || [],
    }
  } catch (error) {
    console.error("Error fetching about content:", error)
    return {
      about: { institute: "", society: "" },
      directors: [],
      leadership: [],
    }
  }
}

const LeadershipMessage = ({ leader, title }: { leader: Leader | undefined, title: string }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-rose-100">
      <CardContent className="p-0">
        <div className="flex flex-col items-center p-6 bg-gradient-to-b from-rose-50 to-white">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-200">
            <Image
              src={leader?.imageId ? `/api/files/${leader.imageId}` : "/placeholder-user.jpg"}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-bold text-blue-800">{`${title}'s Message`}</h3>
          <p className="text-sm text-gray-500">{leader?.name || title}</p>
        </div>
        <div
          className="prose max-w-none text-sm p-6"
          dangerouslySetInnerHTML={{ __html: leader?.message || "Message coming soon..." }}
        />
      </CardContent>
    </Card>
  )
}

// Add a reusable AboutPageHero component for the headline/banner
function AboutPageHero({ title, bgImage }: { title: string; bgImage?: string }) {
  return (
    <div className="relative w-full h-40 md:h-56 flex items-center justify-center">
      {bgImage && (
        <Image
          src={bgImage}
          alt="About Banner"
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
      {/* Slant/clip effect at the bottom */}
      <svg className="absolute bottom-0 left-0 w-full" height="32" viewBox="0 0 100 10" preserveAspectRatio="none" style={{ zIndex: 2 }}>
        <polygon points="0,10 100,0 100,10" fill="white" />
      </svg>
    </div>
  )
}

export default async function AboutPage({ searchParams }: { searchParams: { section?: string } }) {
  const { about, directors, leadership } = await getAboutContent()

  const section =
    searchParams.section === "society"
      ? "society"
      : searchParams.section === "vision"
      ? "vision"
      : searchParams.section === "directors"
      ? "directors"
      : searchParams.section === "leadership"
      ? "leadership"
      : "institute"

  return (
    <div>
      <AboutPageHero
        title={
          section === "institute"
            ? "About College"
            : section === "society"
            ? "About Society"
            : section === "vision"
            ? "Vision & Mission"
            : section === "directors"
            ? "Directors"
            : section === "leadership"
            ? "Messages from Leadership"
            : "About"
        }
        bgImage="/about.avif" // Change this to your desired background image path
      />
      <div className="container mx-auto px-4 py-12">
        <AboutTabs about={about} directors={directors} leadership={leadership} section={section} />
      </div>
    </div>
  )
}
