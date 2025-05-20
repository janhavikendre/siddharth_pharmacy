"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import FileUpload from "@/components/ui/file-upload"

export default function SyllabusPage() {
  const [syllabusFiles, setSyllabusFiles] = useState<any[]>([])
  const [newSyllabusTitle, setNewSyllabusTitle] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchSyllabus() {
      try {
        const response = await fetch("/api/academics/syllabus")
        if (response.ok) {
          const data = await response.json()
          setSyllabusFiles(data.data || [])
        } else {
          throw new Error("Failed to fetch syllabus")
        }
      } catch (error) {
        console.error("Error fetching syllabus:", error)
        toast({
          title: "Error",
          description: "Failed to load syllabus. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSyllabus()
  }, [toast])

  const handleFileUpload = async (fileData: any) => {
    if (!newSyllabusTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for the syllabus",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch("/api/academics/syllabus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newSyllabusTitle,
          fileId: fileData.id,
          program: "All Programs", // Default value, can be changed if needed
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add syllabus")
      }

      const data = await response.json()
      setSyllabusFiles([...syllabusFiles, data.data])
      setNewSyllabusTitle("")

      toast({
        title: "Success",
        description: "Syllabus added successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this syllabus?")) return

    try {
      const response = await fetch(`/api/academics/syllabus/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete syllabus")
      }

      setSyllabusFiles(syllabusFiles.filter((file) => file._id !== id))

      toast({
        title: "Success",
        description: "Syllabus deleted successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Syllabus Management</h1>
        <p className="text-gray-500">Upload and manage syllabus documents</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Syllabus</CardTitle>
          <CardDescription>Upload syllabus documents for different programs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Syllabus Title</Label>
            <Input
              id="title"
              value={newSyllabusTitle}
              onChange={(e) => setNewSyllabusTitle(e.target.value)}
              placeholder="e.g., B.A. Fashion Design Syllabus 2024-25"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Syllabus (PDF)</Label>
            <FileUpload
              type="pdf"
              onUploadComplete={handleFileUpload}
              maxSizeMB={10}
              buttonText="Upload Syllabus"
              disabled={isSaving || !newSyllabusTitle.trim()}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Syllabus Documents</CardTitle>
          <CardDescription>Manage existing syllabus documents</CardDescription>
        </CardHeader>
        <CardContent>
          {syllabusFiles.length > 0 ? (
            <div className="space-y-4">
              {syllabusFiles.map((file) => (
                <div key={file._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{file.title}</h3>
                    <p className="text-sm text-gray-500">
                      {file.program} • Added on {new Date(file.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`/api/files/${file.fileId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(file._id)}
                      className="px-3 py-1 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No syllabus documents found</p>
              <p className="text-sm text-gray-400 mt-2">Upload your first syllabus document using the form above</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
