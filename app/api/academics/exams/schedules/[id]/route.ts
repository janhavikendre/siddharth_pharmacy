import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid schedule ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // First, get the file ID
    const schedule = await db.collection("exam_schedules").findOne({ _id: new ObjectId(id) })

    if (!schedule) {
      return NextResponse.json({ success: false, error: "Schedule not found" }, { status: 404 })
    }

    // Delete the schedule
    const result = await db.collection("exam_schedules").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Failed to delete schedule" }, { status: 500 })
    }

    // Note: We're not deleting the actual file from the files collection
    // This is intentional as the file might be referenced elsewhere
    // In a real application, you might want to implement reference counting

    return NextResponse.json({
      success: true,
      message: "Schedule deleted successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete schedule" }, { status: 500 })
  }
}
