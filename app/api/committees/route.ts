import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const committees = await db.collection("committees").find({}).toArray()

    return NextResponse.json({
      success: true,
      data: committees,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch committees" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, members } = await request.json()

    // Validate input
    if (!name || name.trim() === "") {
      return NextResponse.json({ success: false, error: "Committee name is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("committees").insertOne({
      name,
      description,
      members: members || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId,
          name,
          description,
          members,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to create committee" }, { status: 500 })
  }
}
