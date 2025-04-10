import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const categories = await db.collection("gallery_categories").find({}).toArray()

    // For each category, fetch its images
    const categoriesWithImages = await Promise.all(
      categories.map(async (category) => {
        const images = await db.collection("gallery_images").find({ categoryId: category._id.toString() }).toArray()

        return {
          ...category,
          id: category._id.toString(),
          images: images.map((img) => ({
            id: img._id.toString(),
            src: `/api/files/${img.imageId}`,
            title: img.title || "",
            description: img.description || "",
          })),
        }
      }),
    )

    return NextResponse.json({
      success: true,
      data: categoriesWithImages,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch gallery categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json()

    // Validate input
    if (!name || name.trim() === "") {
      return NextResponse.json({ success: false, error: "Category name is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("fashion_institute")

    const result = await db.collection("gallery_categories").insertOne({
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId,
          name,
          description,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to create gallery category" }, { status: 500 })
  }
}
