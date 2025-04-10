"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Upload, X, FileText } from "lucide-react"

interface FileUploadProps {
  type: "image" | "pdf"
  onUploadComplete: (fileData: any) => void
  maxSizeMB?: number
  width?: number
  quality?: number
  accept?: string
  buttonText?: string
  disabled?: boolean
}

export default function FileUpload({
  type,
  onUploadComplete,
  maxSizeMB = 5,
  width = 1200,
  quality = 80,
  accept = type === "image" ? "image/*" : ".pdf",
  buttonText = type === "image" ? "Upload Image" : "Upload PDF",
  disabled = false,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [uploading, setUploading] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Check file size
      if (selectedFile.size > maxSizeBytes) {
        toast({
          title: "File too large",
          description: `File size should not exceed ${maxSizeMB}MB`,
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)

      // Create preview for images
      if (type === "image") {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        // For PDFs, just show the filename
        setPreview(null)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(10)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)
      formData.append("width", width.toString())
      formData.append("quality", quality.toString())

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      setProgress(100)
      const data = await response.json()

      toast({
        title: "Upload successful",
        description: `${type === "image" ? "Image" : "PDF"} uploaded successfully`,
      })

      onUploadComplete(data.data)

      // Reset after successful upload
      setTimeout(() => {
        setFile(null)
        setPreview(null)
        setProgress(0)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }, 1000)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred during upload",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${file ? "border-green-300 bg-green-50" : "border-rose-300 hover:bg-rose-50"}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {!file ? (
              <>
                <Upload className="w-8 h-8 mb-2 text-rose-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  {type === "image" ? "PNG, JPG or WEBP" : "PDF"} (max {maxSizeMB}MB)
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center">
                {type === "image" && preview ? (
                  <div className="relative w-16 h-16 mb-2">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt="Preview"
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                ) : (
                  <FileText className="w-8 h-8 mb-2 text-rose-500" />
                )}
                <p className="text-sm text-gray-700 truncate max-w-xs">{file.name}</p>
              </div>
            )}
          </div>
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading || disabled}
          />
        </label>
      </div>

      {file && (
        <div className="space-y-2">
          {progress > 0 && <Progress value={progress} className="h-2" />}
          <div className="flex space-x-2">
            <Button
              type="button"
              onClick={handleUpload}
              disabled={uploading || disabled}
              className="bg-rose-600 hover:bg-rose-700 flex-1"
            >
              {uploading ? "Uploading..." : buttonText}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleRemoveFile}
              disabled={uploading || disabled}
              className="px-3"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
