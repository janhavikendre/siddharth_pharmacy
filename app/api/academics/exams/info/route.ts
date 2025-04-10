import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { examInfo } = await request.json()

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // Update or insert content
    const result = await db.collection("content").updateOne(
      { section: "exams" },
      {
        $set: {
          examInfo,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )

    return NextResponse.json({
      success: true,
      message: "Exam information updated successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to update exam information" }, { status: 500 })
  }
}
