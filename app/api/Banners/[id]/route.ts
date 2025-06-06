import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { writeFile, mkdir, unlink } from "fs/promises"
import path from "path"

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

    // Get existing banner to check current image
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
      updateData.imagePath = null
      // Delete old image file if it exists
      if (existingBanner.imagePath) {
        try {
          const oldFilePath = path.join(process.cwd(), "public", existingBanner.imagePath)
          await unlink(oldFilePath)
        } catch (error) {
          console.log("Could not delete old image file:", error)
        }
      }
    } else if (image && image.size > 0) {
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
      updateData.imagePath = `/uploads/banners/${filename}`

      // Save new file
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(path.join(uploadsDir, filename), buffer)

      // Delete old image file if it exists
      if (existingBanner.imagePath) {
        try {
          const oldFilePath = path.join(process.cwd(), "public", existingBanner.imagePath)
          await unlink(oldFilePath)
        } catch (error) {
          console.log("Could not delete old image file:", error)
        }
      }
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

    // Get banner to delete associated image file
    const banner = await db.collection("banners").findOne({ _id: new ObjectId(id) })
    
    if (!banner) {
      return NextResponse.json({ success: false, error: "Banner not found" }, { status: 404 })
    }

    // Delete the banner from database
    const result = await db.collection("banners").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 1) {
      // Delete associated image file if it exists
      if (banner.imagePath) {
        try {
          const filePath = path.join(process.cwd(), "public", banner.imagePath)
          await unlink(filePath)
        } catch (error) {
          console.log("Could not delete image file:", error)
        }
      }

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
