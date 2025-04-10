import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const faculty = await db.collection("faculty").find({}).sort({ name: 1 }).toArray()

    return NextResponse.json({
      success: true,
      data: faculty,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch faculty" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const {
      name,
      designation,
      department,
      qualification,
      experience,
      specialization,
      email,
      bio,
      imageId,
      isTeaching,
    } = await request.json()

    // Validate input
    if (!name || name.trim() === "" || !designation || designation.trim() === "") {
      return NextResponse.json({ success: false, error: "Name and designation are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("faculty").insertOne({
      name,
      designation,
      department,
      qualification,
      experience,
      specialization,
      email,
      bio,
      imageId,
      isTeaching,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId,
          name,
          designation,
          department,
          imageId,
          isTeaching,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to create faculty member" }, { status: 500 })
  }
}
