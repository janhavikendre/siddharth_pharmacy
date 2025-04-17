import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  const client = await clientPromise
  const db = client.db("fashion_institute")
  const body = await request.json()

  const result = await db.collection("exam_results").insertOne({
    title: body.title,
    fileId: body.fileId,
    createdAt: new Date(),
  })

  return NextResponse.json({ 
    success: true, 
    data: { _id: result.insertedId, title: body.title, fileId: body.fileId, createdAt: new Date() } 
  })
}
