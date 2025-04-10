import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const resources = await db.collection("library_resources").find({}).sort({ category: 1 }).toArray()

    return NextResponse.json({
      success: true,
      data: resources,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch library resources" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { category, title, items } = await request.json()

    // Validate input
    if (!category || !title || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Category, title, and at least one item are required" },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("library_resources").insertOne({
      category,
      title,
      items,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId,
          category,
          title,
          items,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to create library resource" }, { status: 500 })
  }
}
