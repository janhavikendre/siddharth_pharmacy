import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const content = await db.collection("content").findOne({ section: "admission" })

    return NextResponse.json({
      success: true,
      data: content,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch admission content" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const {
      process,
      importantDates,
      eligibility,
      feeStructure,
      scholarship,
      cancellation,
      brochureId,
      admissionFormId,
      scholarshipFileId,
      admissionInfoId,
      govtResolutions,
    } = await request.json()

    const client = await clientPromise
    const db = client.db("fashion_institute")

    // Update or insert content
    const result = await db.collection("content").updateOne(
      { section: "admission" },
      {
        $set: {
          process,
          importantDates,
          eligibility,
          feeStructure,
          scholarship,
          cancellation,
          brochureId,
          admissionFormId,
          scholarshipFileId,
          admissionInfoId,
          govtResolutions,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )

    return NextResponse.json({
      success: true,
      message: "Admission content updated successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to update admission content" }, { status: 500 })
  }
}
