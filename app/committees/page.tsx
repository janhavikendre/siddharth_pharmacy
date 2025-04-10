import { CommitteeTabs } from "@/components/committees/committee-tabs"
import clientPromise from "@/lib/mongodb"

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

export default async function CommitteesPage() {
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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Committees</h1>
      <CommitteeTabs committees={allCommittees} />
    </div>
  )
}
