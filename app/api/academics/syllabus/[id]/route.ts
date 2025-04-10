import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid result ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // First, get the file ID
    const result = await db.collection("exam_results").findOne({ _id: new ObjectId(id) })

    if (!result) {
      return NextResponse.json({ success: false, error: "Result not found" }, { status: 404 })
    }

    // Delete the result
    const deleteResult = await db.collection("exam_results").deleteOne({
      _id: new ObjectId(id),
    })

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Failed to delete result" }, { status: 500 })
    }

    // Note: We're not deleting the actual file from the files collection
    // This is intentional as the file might be referenced elsewhere
    // In a real application, you might want to implement reference counting

    return NextResponse.json({
      success: true,
      message: "Result deleted successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete result" }, { status: 500 })
  }
}
