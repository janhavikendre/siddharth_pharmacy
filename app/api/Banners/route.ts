import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const banners = await db
      .collection("banners")
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      {
        success: true,
        data: banners,
      },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch banners" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    )
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const link = formData.get("link") as string
    const isActive = formData.get("isActive") === "true"
    const image = formData.get("image") as File | null

    // Validate input
    if (!image || image.size === 0) {
      return NextResponse.json({ success: false, error: "Banner image is required" }, { status: 400 })
    }

    if (!title || title.trim() === "") {
      return NextResponse.json({ success: false, error: "Banner title is required" }, { status: 400 })
    }

    // Check file size (limit to 5MB)
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "Image size must be less than 5MB" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')
    const imageDataUrl = `data:${image.type};base64,${base64Image}`

    const result = await db.collection("banners").insertOne({
      title,
      description,
      link,
      imageData: imageDataUrl,
      imageName: image.name,
      imageType: image.type,
      imageSize: image.size,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId,
          title,
          description,
          link,
          imageData: imageDataUrl,
          isActive,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to create banner" }, { status: 500 })
  }
}
