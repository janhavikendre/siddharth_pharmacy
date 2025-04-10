import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid faculty ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const faculty = await db.collection("faculty").findOne({ _id: new ObjectId(id) })

    if (!faculty) {
      return NextResponse.json({ success: false, error: "Faculty member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: faculty })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch faculty member" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid faculty ID" }, { status: 400 })
    }

    const {
      name,
      designation,
      department,
      qualification,
      experience,
      specialization,
      email,
      bio,
      imageId,
      isTeaching,
    } = await request.json()

    // Validate input
    if (!name || name.trim() === "" || !designation || designation.trim() === "") {
      return NextResponse.json({ success: false, error: "Name and designation are required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("faculty").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          designation,
          department,
          qualification,
          experience,
          specialization,
          email,
          bio,
          imageId,
          isTeaching,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Faculty member not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: id,
        name,
        designation,
        department,
        imageId,
        isTeaching,
      },
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to update faculty member" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid faculty ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("faculty").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Faculty member not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Faculty member deleted successfully",
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete faculty member" }, { status: 500 })
  }
}
