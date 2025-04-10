import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid resource ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const resource = await db.collection("library_resources").findOne({ _id: new ObjectId(id) })

    if (!resource) {
      return NextResponse.json({ success: false, error: "Resource not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: resource })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch resource" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid resource ID" }, { status: 400 })
    }

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

    const result = await db.collection("library_resources").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          category,
          title,
          items,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Resource not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: id,
        category,
        title,
        items,
      },
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to update resource" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid resource ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("library_resources").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Resource not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Resource deleted successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete resource" }, { status: 500 })
  }
}
