import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid calendar ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // First, get the file ID
    const calendar = await db.collection("academic_calendars").findOne({ _id: new ObjectId(id) })

    if (!calendar) {
      return NextResponse.json({ success: false, error: "Calendar not found" }, { status: 404 })
    }

    // Delete the calendar
    const result = await db.collection("academic_calendars").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Failed to delete calendar" }, { status: 500 })
    }

    // Note: We're not deleting the actual file from the files collection
    // This is intentional as the file might be referenced elsewhere

    return NextResponse.json({
      success: true,
      message: "Calendar deleted successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete calendar" }, { status: 500 })
  }
}
