"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import FileUpload from "@/components/ui/file-upload"
import { Textarea } from "@/components/ui/textarea"

export default function ExamsPage() {
  const [examSchedules, setExamSchedules] = useState<any[]>([])
  const [results, setResults] = useState<any[]>([])
  const [examInfo, setExamInfo] = useState("")
  const [newScheduleTitle, setNewScheduleTitle] = useState("")
  const [newResultTitle, setNewResultTitle] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchExamData() {
      try {
        const response = await fetch("/api/academics/exams")
        if (response.ok) {
          const data = await response.json()
          setExamSchedules(data.data.schedules || [])
          setResults(data.data.results || [])
          setExamInfo(data.data.examInfo || "")
        } else {
          throw new Error("Failed to fetch exam data")
        }
      } catch (error) {
        console.error("Error fetching exam data:", error)
        toast({
          title: "Error",
          description: "Failed to load exam data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchExamData()
  }, [toast])

  const handleSaveExamInfo = async () => {
    setIsSaving(true)

    try {
      const response = await fetch("/api/academics/exams/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examInfo,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save exam information")
      }

      toast({
        title: "Success",
        description: "Exam information updated successfully",
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

  const handleScheduleUpload = async (fileData: any) => {
    if (!newScheduleTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for the exam schedule",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch("/api/academics/exams/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newScheduleTitle,
          fileId: fileData.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add exam schedule")
      }

      const data = await response.json()
      setExamSchedules([...examSchedules, data.data])
      setNewScheduleTitle("")

      toast({
        title: "Success",
        description: "Exam schedule added successfully",
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

  const handleResultUpload = async (fileData: any) => {
    if (!newResultTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for the result",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch("/api/academics/exams/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newResultTitle,
          fileId: fileData.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add result")
      }

      const data = await response.json()
      setResults([...results, data.data])
      setNewResultTitle("")

      toast({
        title: "Success",
        description: "Result added successfully",
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

  const handleDeleteSchedule = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam schedule?")) return

    try {
      const response = await fetch(`/api/academics/exams/schedules/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete exam schedule")
      }

      setExamSchedules(examSchedules.filter((schedule) => schedule._id !== id))

      toast({
        title: "Success",
        description: "Exam schedule deleted successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    }
  }

  const handleDeleteResult = async (id: string) => {
    if (!confirm("Are you sure you want to delete this result?")) return

    try {
      const response = await fetch(`/api/academics/exams/results/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete result")
      }

      setResults(results.filter((result) => result._id !== id))

      toast({
        title: "Success",
        description: "Result deleted successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
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
        <h1 className="text-3xl font-bold tracking-tight">Exams & Results</h1>
        <p className="text-gray-500">Manage exam schedules and results</p>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Exam Information</TabsTrigger>
          <TabsTrigger value="schedules">Exam Schedules</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Exam Information</CardTitle>
              <CardDescription>Provide general information about examinations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="min-h-[300px]">
                <div id="exam-info-editor">
                  <Textarea value={examInfo} onChange={(e) => setExamInfo(e.target.value)} className="h-[300px] mb-12" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveExamInfo} className="bg-rose-600 hover:bg-rose-700" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Information"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Exam Schedule</CardTitle>
              <CardDescription>Upload exam schedules for different programs and semesters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scheduleTitle">Schedule Title</Label>
                <Input
                  id="scheduleTitle"
                  value={newScheduleTitle}
                  onChange={(e) => setNewScheduleTitle(e.target.value)}
                  placeholder="e.g., B.A. Fashion Design Semester 4 Exam Schedule"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Schedule (PDF)</Label>
                <FileUpload
                  type="pdf"
                  onUploadComplete={handleScheduleUpload}
                  maxSizeMB={5}
                  buttonText="Upload Schedule"
                  disabled={isSaving || !newScheduleTitle.trim()}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>All Exam Schedules</CardTitle>
              <CardDescription>Manage existing exam schedules</CardDescription>
            </CardHeader>
            <CardContent>
              {examSchedules.length > 0 ? (
                <div className="space-y-4">
                  {examSchedules.map((schedule) => (
                    <div key={schedule._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{schedule.title}</h3>
                        <p className="text-sm text-gray-500">
                          Added on {new Date(schedule.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={`/api/files/${schedule.fileId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                          View
                        </a>
                        <button
                          onClick={() => handleDeleteSchedule(schedule._id)}
                          className="px-3 py-1 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No exam schedules found</p>
                  <p className="text-sm text-gray-400 mt-2">Upload your first exam schedule using the form above</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Result</CardTitle>
              <CardDescription>Upload exam results for different programs and semesters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resultTitle">Result Title</Label>
                <Input
                  id="resultTitle"
                  value={newResultTitle}
                  onChange={(e) => setNewResultTitle(e.target.value)}
                  placeholder="e.g., B.A. Fashion Design Semester 4 Results"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Result (PDF)</Label>
                <FileUpload
                  type="pdf"
                  onUploadComplete={handleResultUpload}
                  maxSizeMB={5}
                  buttonText="Upload Result"
                  disabled={isSaving || !newResultTitle.trim()}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>All Results</CardTitle>
              <CardDescription>Manage existing results</CardDescription>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((result) => (
                    <div key={result._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{result.title}</h3>
                        <p className="text-sm text-gray-500">
                          Added on {new Date(result.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={`/api/files/${result.fileId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                          View
                        </a>
                        <button
                          onClick={() => handleDeleteResult(result._id)}
                          className="px-3 py-1 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No results found</p>
                  <p className="text-sm text-gray-400 mt-2">Upload your first result using the form above</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
