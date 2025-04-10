import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { tmpdir } from "os"
import { uploadImage, uploadPDF } from "@/lib/upload"

export async function POST(request: Request) {
  try {
    // Process the form data
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const type = formData.get("type") as string | null
    const width = Number.parseInt((formData.get("width") as string) || "1200")
    const quality = Number.parseInt((formData.get("quality") as string) || "80")

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    if (!type || !["image", "pdf"].includes(type)) {
      return NextResponse.json({ success: false, error: "Invalid file type" }, { status: 400 })
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File size exceeds 5MB limit" }, { status: 400 })
    }

    // Create a temporary file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const tempPath = join(tmpdir(), file.name)
    await writeFile(tempPath, buffer)

    let result

    if (type === "image") {
      // Process and upload image
      result = await uploadImage(buffer, file.name, width, quality)
    } else if (type === "pdf") {
      // Upload PDF
      result = await uploadPDF(buffer, file.name)
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, error: "Failed to upload file" }, { status: 500 })
  }
}
