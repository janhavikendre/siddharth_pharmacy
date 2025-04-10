import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid announcement ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const announcement = await db.collection("announcements").findOne({ _id: new ObjectId(id) })

    if (!announcement) {
      return NextResponse.json({ success: false, error: "Announcement not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: announcement })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch announcement" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid announcement ID" }, { status: 400 })
    }

    const { text, link, isActive } = await request.json()

    // Validate input
    if (!text || text.trim() === "") {
      return NextResponse.json({ success: false, error: "Announcement text is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("announcements").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          text,
          link,
          isActive,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Announcement not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: id,
        text,
        link,
        isActive,
      },
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to update announcement" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid announcement ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("announcements").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Announcement not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Announcement deleted successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete announcement" }, { status: 500 })
  }
}
