import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

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

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "banners")
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = path.extname(image.name)
    const filename = `banner_${timestamp}${fileExtension}`
    const imagePath = `/uploads/banners/${filename}`

    // Save file
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(path.join(uploadsDir, filename), buffer)

    const result = await db.collection("banners").insertOne({
      title,
      description,
      link,
      imagePath,
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
          imagePath,
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
