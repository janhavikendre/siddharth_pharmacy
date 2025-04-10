import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')

    if (!categoryId) {
      return NextResponse.json({ success: false, error: "Category ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")
    
    const images = await db.collection("gallery_images")
      .find({ categoryId })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      data: images,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch images" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { categoryId, imageId, title, description } = await request.json()

    // Validate input
    if (!categoryId || !imageId) {
      return NextResponse.json({ success: false, error: "Category ID and Image ID are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("gallery_images").insertOne({
      categoryId,
      imageId,
      title: title || "",
      description: description || "",
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId,
          categoryId,
          imageId,
          title,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to add image to gallery" }, { status: 500 })
  }
}
