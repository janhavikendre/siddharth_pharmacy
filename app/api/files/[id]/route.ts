import { NextResponse } from "next/server"
import { getFile } from "@/lib/upload"
import { ObjectId } from "mongodb"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params)

    if (!id) {
      return NextResponse.json(
        { success: false, error: "File ID is required" },
        { status: 400 }
      )
    }

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid file ID format" },
        { status: 400 }
      )
    }

    const file = await getFile(id)
    if (!file) {
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 }
      )
    }

    // Set appropriate headers
    const headers = new Headers()
    headers.set("Content-Type", file.contentType || "application/octet-stream")
    headers.set("Content-Disposition", `inline; filename="${file.filename}"`)

    // Return the file data
    return new NextResponse(file.data, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error("Error serving file:", error)
    return NextResponse.json(
      { success: false, error: "Failed to retrieve file" },
      { status: 500 }
    )
  }
}
