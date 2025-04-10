import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const messages = await db.collection("messages").find({}).toArray()

    return NextResponse.json({
      success: true,
      data: messages,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // Delete all existing messages
    await db.collection("messages").deleteMany({})

    // Insert new messages
    if (messages && messages.length > 0) {
      await db.collection("messages").insertMany(
        messages.map((message: any) => ({
          ...message,
          updatedAt: new Date(),
        })),
      )
    }

    return NextResponse.json({
      success: true,
      message: "Messages updated successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to update messages" }, { status: 500 })
  }
}
