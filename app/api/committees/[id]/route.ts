import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid committee ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const committee = await db.collection("committees").findOne({ _id: new ObjectId(id) })

    if (!committee) {
      return NextResponse.json({ success: false, error: "Committee not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: committee })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch committee" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid committee ID" }, { status: 400 })
    }

    const { name, description, members } = await request.json()

    // Validate input
    if (!name || name.trim() === "") {
      return NextResponse.json({ success: false, error: "Committee name is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("committees").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          description,
          members,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Committee not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: id,
        name,
        description,
        members,
      },
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to update committee" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid committee ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("committees").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Committee not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Committee deleted successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete committee" }, { status: 500 })
  }
}
