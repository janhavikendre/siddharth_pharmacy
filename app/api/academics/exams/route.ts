import { NextRequest, NextResponse } from "next/server"
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

export async function POST(request: NextRequest) {
  const { pathname } = request.nextUrl
  const client = await clientPromise
  const db = client.db("fashion_institute")
  const body = await request.json()

  if (pathname.endsWith("/schedules")) {
    const schedule = await db.collection("exam_schedules").insertOne({
      title: body.title,
      fileId: body.fileId,
      createdAt: new Date(),
    })
    return NextResponse.json({ 
      success: true, 
      data: { _id: schedule.insertedId, title: body.title, fileId: body.fileId, createdAt: new Date() } 
    })
  } else if (pathname.endsWith("/info")) {
    await db.collection("content").updateOne(
      { section: "exams" },
      { $set: { examInfo: body.examInfo } },
      { upsert: true }
    )
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false, error: "Unsupported endpoint" }, { status: 404 })
}
