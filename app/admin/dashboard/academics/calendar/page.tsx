"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import FileUpload from "@/components/ui/file-upload"

export default function AcademicCalendarPage() {
  const [calendarFiles, setCalendarFiles] = useState<any[]>([])
  const [newCalendarTitle, setNewCalendarTitle] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchCalendars() {
      try {
        const response = await fetch("/api/academics/calendar")
        if (response.ok) {
          const data = await response.json()
          setCalendarFiles(data.data || [])
        } else {
          throw new Error("Failed to fetch academic calendars")
        }
      } catch (error) {
        console.error("Error fetching calendars:", error)
        toast({
          title: "Error",
          description: "Failed to load academic calendars. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCalendars()
  }, [toast])

  const handleFileUpload = async (fileData: any) => {
    if (!newCalendarTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for the academic calendar",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch("/api/academics/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newCalendarTitle,
          fileId: fileData.id,
          academicYear: new Date().getFullYear() + "-" + (new Date().getFullYear() + 1), // Default value
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add academic calendar")
      }

      const data = await response.json()
      setCalendarFiles([...calendarFiles, data.data])
      setNewCalendarTitle("")

      toast({
        title: "Success",
        description: "Academic calendar added successfully",
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
    if (!confirm("Are you sure you want to delete this academic calendar?")) return

    try {
      const response = await fetch(`/api/academics/calendar/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete academic calendar")
      }

      setCalendarFiles(calendarFiles.filter((file) => file._id !== id))

      toast({
        title: "Success",
        description: "Academic calendar deleted successfully",
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
        <h1 className="text-3xl font-bold tracking-tight">Academic Calendar</h1>
        <p className="text-gray-500">Upload and manage academic calendars</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Academic Calendar</CardTitle>
          <CardDescription>Upload academic calendar for the current or upcoming academic year</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Calendar Title</Label>
            <Input
              id="title"
              value={newCalendarTitle}
              onChange={(e) => setNewCalendarTitle(e.target.value)}
              placeholder="e.g., Academic Calendar 2024-25"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Calendar (PDF)</Label>
            <FileUpload
              type="pdf"
              onUploadComplete={handleFileUpload}
              maxSizeMB={5}
              buttonText="Upload Calendar"
              disabled={isSaving || !newCalendarTitle.trim()}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Academic Calendars</CardTitle>
          <CardDescription>Manage existing academic calendars</CardDescription>
        </CardHeader>
        <CardContent>
          {calendarFiles.length > 0 ? (
            <div className="space-y-4">
              {calendarFiles.map((file) => (
                <div key={file._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{file.title}</h3>
                    <p className="text-sm text-gray-500">
                      {file.academicYear} • Added on {new Date(file.createdAt).toLocaleDateString()}
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
              <p className="text-gray-500">No academic calendars found</p>
              <p className="text-sm text-gray-400 mt-2">Upload your first academic calendar using the form above</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
