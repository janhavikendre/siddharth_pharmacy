import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const syllabus = await db.collection("syllabus").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      data: syllabus,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch syllabus" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, fileId, program } = await request.json()

    // Validate input
    if (!title || !fileId) {
      return NextResponse.json({ success: false, error: "Title and file ID are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("syllabus").insertOne({
      title,
      fileId,
      program: program || "All Programs",
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId,
          title,
          fileId,
          program: program || "All Programs",
          createdAt: new Date(),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to add syllabus" }, { status: 500 })
  }
}
