import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid banner ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const banner = await db.collection("banners").findOne({ _id: new ObjectId(id) })

    if (!banner) {
      return NextResponse.json({ success: false, error: "Banner not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: banner,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch banner" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid banner ID" }, { status: 400 })
    }

    const formData = await request.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const link = formData.get("link") as string
    const isActive = formData.get("isActive") === "true"
    const image = formData.get("image") as File | null
    const removeImage = formData.get("removeImage") === "true"

    if (!title || title.trim() === "") {
      return NextResponse.json({ success: false, error: "Banner title is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // Get existing banner
    const existingBanner = await db.collection("banners").findOne({ _id: new ObjectId(id) })
    if (!existingBanner) {
      return NextResponse.json({ success: false, error: "Banner not found" }, { status: 404 })
    }

    let updateData: any = {
      title,
      description,
      link,
      isActive,
      updatedAt: new Date(),
    }

    if (removeImage) {
      updateData.imageData = null
      updateData.imageName = null
      updateData.imageType = null
      updateData.imageSize = null
    } else if (image && image.size > 0) {
      // Check file size (limit to 5MB)
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json({ success: false, error: "Image size must be less than 5MB" }, { status: 400 })
      }

      // Convert new image to base64
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64Image = buffer.toString('base64')
      const imageDataUrl = `data:${image.type};base64,${base64Image}`

      updateData.imageData = imageDataUrl
      updateData.imageName = image.name
      updateData.imageType = image.type
      updateData.imageSize = image.size
    }

    const result = await db.collection("banners").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Banner not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: { _id: id, ...updateData },
    })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update banner" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid banner ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // Delete the banner from database
    const result = await db.collection("banners").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 1) {
      return NextResponse.json({ 
        success: true, 
        data: { deletedCount: result.deletedCount } 
      })
    } else {
      return NextResponse.json({ success: false, error: "Banner not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete banner" }, { status: 500 })
  }
}
