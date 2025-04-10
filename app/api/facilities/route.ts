import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const facilities = await db.collection("facilities").find({}).sort({ order: 1 }).toArray()

    return NextResponse.json({
      success: true,
      data: facilities,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch facilities" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, features, images, order } = await request.json()

    // Validate input
    if (!name || name.trim() === "") {
      return NextResponse.json({ success: false, error: "Facility name is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("facilities").insertOne({
      name,
      description,
      features: features || [],
      images: images || [],
      order: order || 0,
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
          features,
          images,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to create facility" }, { status: 500 })
  }
}
