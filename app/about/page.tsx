import Image from "next/image"
import { AboutTabs } from "@/components/about/about-tabs"
import { Card, CardContent } from "@/components/ui/card"
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
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-rose-200">
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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">About Us</h1>
      <AboutTabs about={about} directors={directors} leadership={leadership} section={section} />
    </div>
  )
}
