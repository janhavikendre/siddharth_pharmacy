import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// Simple admin authentication middleware
async function isAuthenticated(request: Request) {
  // In a real application, you would check for a valid session or token
  // For this simplified version, we'll just check if the request includes an admin header
  const adminHeader = request.headers.get("x-admin-auth")
  return adminHeader === "true"
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const announcements = await db
      .collection("announcements")
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(
      {
        success: true,
        data: announcements,
      },
      { headers: { "Cache-Control": "no-store" } }
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch announcements" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    )
  }
}

export async function POST(request: Request) {
  try {
    // For admin operations, we would normally check authentication
    // Since we're using a simplified approach, we'll skip this check for now

    const { text, link, isActive = true } = await request.json()

    // Validate input
    if (!text || text.trim() === "") {
      return NextResponse.json({ success: false, error: "Announcement text is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("announcements").insertOne({
      text,
      link,
      isActive,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId,
          text,
          link,
          isActive,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to create announcement" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing announcement id" }, { status: 400 })
    }
    const client = await clientPromise
    const db = client.db("fashion_institute")
    const result = await db.collection("announcements").deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true, data: { deletedCount: result.deletedCount } })
    } else {
      return NextResponse.json({ success: false, error: "Announcement not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete announcement" }, { status: 500 })
  }
}
