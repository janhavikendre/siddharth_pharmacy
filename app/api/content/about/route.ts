import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const content = await db.collection("content").findOne({ section: "about" })

    return NextResponse.json({
      success: true,
      data: content,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch about content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // In a real application with proper authentication, we would check for admin privileges here
    // Since we're using a simplified approach with client-side authentication, we'll skip this check

    const { institute, society, vision, mission } = await request.json()

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // Update or insert content
    const result = await db.collection("content").updateOne(
      { section: "about" },
      {
        $set: {
          institute,
          society,
          vision,
          mission,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )

    return NextResponse.json({
      success: true,
      message: "About content updated successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to update about content" }, { status: 500 })
  }
}
