import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const examInfo = await db.collection("content").findOne({ section: "exams" })
    const schedules = await db.collection("exam_schedules").find({}).sort({ createdAt: -1 }).toArray()
    const results = await db.collection("exam_results").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      data: {
        examInfo: examInfo?.examInfo || "",
        schedules,
        results,
      },
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch exam data" }, { status: 500 })
  }
}
