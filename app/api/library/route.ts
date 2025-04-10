import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const content = await db.collection("content").findOne({ section: "library" })
    const resources = await db.collection("library_resources").find({}).sort({ category: 1 }).toArray()

    return NextResponse.json({
      success: true,
      data: {
        content: content || {},
        resources: resources || [],
      },
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch library content" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { about, hours } = await request.json()

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // Update or insert content
    const result = await db.collection("content").updateOne(
      { section: "library" },
      {
        $set: {
          about,
          hours,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )

    return NextResponse.json({
      success: true,
      message: "Library content updated successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to update library content" }, { status: 500 })
  }
}
