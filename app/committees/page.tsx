import { CommitteeTabs } from "@/components/committees/committee-tabs"
import clientPromise from "@/lib/mongodb"
import Image from "next/image"

async function getCommittees() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const committees = await db.collection("committees").find({}).toArray()
    return committees
  } catch (error) {
    console.error("Error fetching committees:", error)
    return []
  }
}

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

export default async function CommitteesPage({ searchParams }: { searchParams: { section?: string } }) {
  const committees = await getCommittees()

  // Define default committees if none are found in the database
  const defaultCommittees = [
    {
      name: "Placement Cell",
      members: [],
    },
    {
      name: "Grievance Committee",
      members: [],
    },
    {
      name: "Anti-Ragging Committee",
      members: [],
    },
    {
      name: "Anti-Discrimination Cell",
      members: [],
    },
    {
      name: "Vishakha Committee",
      members: [],
    },
    {
      name: "Avishkar Cell",
      members: [],
    },
    {
      name: "Development Committee",
      members: [],
    },
    {
      name: "Managing Committee",
      members: [],
    },
  ]

  // Merge database committees with default committees
  const allCommittees = committees.length > 0 ? committees : defaultCommittees

  const section = searchParams.section || "antiragging" // default section

  return (
    <>
      <SectionHero title="Committees" bgImage="/about.avif" />
      <main className="container py-10">
        <CommitteeTabs committees={allCommittees} section={section} />
      </main>
    </>
  )
}
