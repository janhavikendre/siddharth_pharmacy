import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid image ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // First, get the image to find its file ID
    const image = await db.collection("gallery_images").findOne({ _id: new ObjectId(id) })

    if (!image) {
      return NextResponse.json({ success: false, error: "Image not found" }, { status: 404 })
    }

    // Delete the image record
    const result = await db.collection("gallery_images").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Failed to delete image" }, { status: 500 })
    }

    // Optionally, you could also delete the file from GridFS here
    // await db.collection("fs.files").deleteOne({ _id: new ObjectId(image.imageId) })
    // await db.collection("fs.chunks").deleteMany({ files_id: new ObjectId(image.imageId) })

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete image" }, { status: 500 })
  }
}
