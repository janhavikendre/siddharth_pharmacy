import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const leaders = await db.collection("leadership").find({}).sort({ role: 1 }).toArray()

    return NextResponse.json({
      success: true,
      data: leaders,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch leadership data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { leaders } = await request.json()

    if (!leaders || !Array.isArray(leaders)) {
      return NextResponse.json(
        { success: false, error: "Invalid data format. Expected an array of leaders." },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // Delete all existing leadership entries
    await db.collection("leadership").deleteMany({})

    // Insert new leadership entries
    if (leaders.length > 0) {
      const result = await db.collection("leadership").insertMany(
        leaders.map((leader) => ({
          ...leader,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      )

      return NextResponse.json({
        success: true,
        data: {
          insertedCount: result.insertedCount,
          insertedIds: result.insertedIds,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        insertedCount: 0,
      },
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to save leadership data" }, { status: 500 })
  }
}
