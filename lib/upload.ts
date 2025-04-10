import multer from "multer"
import type { NextApiRequest, NextApiResponse } from "next"
import { GridFSBucket, ObjectId } from "mongodb"
import sharp from "sharp"
import clientPromise from "@/lib/mongodb"

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
})

// Helper to process multer with Next.js API routes
export function runMiddleware(req: NextApiRequest & { [key: string]: any }, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export async function uploadImage(buffer: Buffer, filename: string, width = 1200, quality = 80) {
  try {
    // Process image with sharp
    const processedImageBuffer = await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer()

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("fashion_institute")
    const bucket = new ObjectId()

    // Store file metadata
    const fileDoc = {
      filename,
      contentType: "image/webp",
      length: processedImageBuffer.length,
      uploadDate: new Date(),
      metadata: {
        width,
        quality,
        originalFilename: filename,
      },
    }

    // Insert file metadata
    const result = await db.collection("files").insertOne(fileDoc)

    // Store file chunks
    const chunkSize = 255 * 1024 // 255KB chunks
    const totalChunks = Math.ceil(processedImageBuffer.length / chunkSize)

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize
      const end = Math.min(start + chunkSize, processedImageBuffer.length)
      const chunk = processedImageBuffer.slice(start, end)

      await db.collection("chunks").insertOne({
        files_id: result.insertedId,
        n: i,
        data: chunk,
      })
    }

    return {
      id: result.insertedId.toString(),
      filename,
      size: processedImageBuffer.length,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    throw new Error("Failed to upload image")
  }
}

export async function uploadPDF(buffer: Buffer, filename: string) {
  try {
    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("fashion_institute")
    const bucket = new ObjectId()

    // Store file metadata
    const fileDoc = {
      filename,
      contentType: "application/pdf",
      length: buffer.length,
      uploadDate: new Date(),
      metadata: {
        originalFilename: filename,
      },
    }

    // Insert file metadata
    const result = await db.collection("files").insertOne(fileDoc)

    // Store file chunks
    const chunkSize = 255 * 1024 // 255KB chunks
    const totalChunks = Math.ceil(buffer.length / chunkSize)

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize
      const end = Math.min(start + chunkSize, buffer.length)
      const chunk = buffer.slice(start, end)

      await db.collection("chunks").insertOne({
        files_id: result.insertedId,
        n: i,
        data: chunk,
      })
    }

    return {
      id: result.insertedId.toString(),
      filename,
      size: buffer.length,
    }
  } catch (error) {
    console.error("Error uploading PDF:", error)
    throw new Error("Failed to upload PDF")
  }
}

export async function getFile(fileId: string) {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")
    
    let objectId: ObjectId
    try {
      objectId = new ObjectId(fileId)
    } catch (error) {
      throw new Error("Invalid file ID format")
    }
    
    // Get file metadata
    const file = await db.collection("files").findOne({ _id: objectId })
    if (!file) {
      throw new Error("File not found")
    }

    // Get file chunks
    const chunks = await db.collection("chunks")
      .find({ files_id: objectId })
      .sort({ n: 1 })
      .toArray()

    if (!chunks || chunks.length === 0) {
      throw new Error("File chunks not found")
    }

    // Convert BSON binary data to buffers and calculate total size
    const buffers = chunks.map(chunk => {
      // Handle both Buffer and Binary BSON types
      if (Buffer.isBuffer(chunk.data)) {
        return chunk.data
      }
      // If it's BSON Binary type
      if (chunk.data.buffer) {
        return Buffer.from(chunk.data.buffer)
      }
      // Fallback for other cases
      return Buffer.from(chunk.data)
    })

    const totalSize = buffers.reduce((acc, buf) => acc + buf.length, 0)

    // Combine chunks into a single buffer
    const fileData = Buffer.concat(buffers, totalSize)

    return {
      data: fileData,
      contentType: file.contentType || "application/octet-stream",
      filename: file.filename
    }
  } catch (error) {
    console.error("Error retrieving file:", error)
    throw error // Preserve the original error message
  }
}

// Delete file from MongoDB
export async function deleteFile(fileId: string) {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")
    const bucket = new GridFSBucket(db)

    await bucket.delete(new ObjectId(fileId))
    return true
  } catch (error) {
    console.error("Error deleting file:", error)
    throw error
  }
}

// Export multer middleware
export const multerUpload = upload
