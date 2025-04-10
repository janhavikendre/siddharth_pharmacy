import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const schedules = await db.collection("exam_schedules").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      data: schedules,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch exam schedules" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, fileId } = await request.json()

    // Validate input
    if (!title || !fileId) {
      return NextResponse.json({ success: false, error: "Title and file ID are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("exam_schedules").insertOne({
      title,
      fileId,
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId,
          title,
          fileId,
          createdAt: new Date(),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to add exam schedule" }, { status: 500 })
  }
}
