import { FacultyTabs } from "@/components/faculty/faculty-tabs"
import clientPromise from "@/lib/mongodb"

async function getFaculty() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const teachingFaculty = await db
      .collection("faculty")
      .find({ isTeaching: { $ne: false } })
      .sort({ name: 1 })
      .toArray()

    const nonTeachingFaculty = await db.collection("faculty").find({ isTeaching: false }).sort({ name: 1 }).toArray()

    return {
      teaching: JSON.parse(JSON.stringify(teachingFaculty)),
      nonTeaching: JSON.parse(JSON.stringify(nonTeachingFaculty)),
    }
  } catch (error) {
    console.error("Error fetching faculty:", error)
    return { teaching: [], nonTeaching: [] }
  }
}

export default async function FacultyPage() {
  const { teaching, nonTeaching } = await getFaculty()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Our Faculty & Staff</h1>
      <FacultyTabs teaching={teaching} nonTeaching={nonTeaching} />
    </div>
  )
}
