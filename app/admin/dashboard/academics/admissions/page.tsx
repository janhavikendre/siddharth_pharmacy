"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import FileUpload from "@/components/ui/file-upload"
import { Textarea } from "@/components/ui/textarea"

export default function AdmissionsPage() {
  const [process, setProcess] = useState("")
  const [importantDates, setImportantDates] = useState("")
  const [eligibility, setEligibility] = useState("")
  const [feeStructure, setFeeStructure] = useState("")
  const [scholarship, setScholarship] = useState("")
  const [cancellation, setCancellation] = useState("")
  const [brochureId, setBrochureId] = useState("")
  const [admissionFormId, setAdmissionFormId] = useState("")
  const [scholarshipFileId, setScholarshipFileId] = useState("")
  const [admissionInfoId, setAdmissionInfoId] = useState("")
  const [govtResolutions, setGovtResolutions] = useState<any[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch("/api/content/admission")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setProcess(data.data.process || "")
            setImportantDates(data.data.importantDates || "")
            setEligibility(data.data.eligibility || "")
            setFeeStructure(data.data.feeStructure || "")
            setScholarship(data.data.scholarship || "")
            setCancellation(data.data.cancellation || "")
            setBrochureId(data.data.brochureId || "")
            setAdmissionFormId(data.data.admissionFormId || "")
            setScholarshipFileId(data.data.scholarshipFileId || "")
            setAdmissionInfoId(data.data.admissionInfoId || "")
            setGovtResolutions(data.data.govtResolutions || [])
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error)
        toast({
          title: "Error",
          description: "Failed to load admission content. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [toast])

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const response = await fetch("/api/content/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          process,
          importantDates,
          eligibility,
          feeStructure,
          scholarship,
          cancellation,
          brochureId,
          admissionFormId,
          scholarshipFileId,
          admissionInfoId,
          govtResolutions,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save content")
      }

      toast({
        title: "Success",
        description: "Admission content updated successfully",
      })

      router.refresh()
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

  const handleFileUpload = (fileData: any, type: string) => {
    switch (type) {
      case "brochure":
        setBrochureId(fileData.id)
        break
      case "admissionForm":
        setAdmissionFormId(fileData.id)
        break
      case "scholarship":
        setScholarshipFileId(fileData.id)
        break
      case "admissionInfo":
        setAdmissionInfoId(fileData.id)
        break
      case "govtResolution":
        setGovtResolutions([...govtResolutions, { id: fileData.id, name: fileData.filename }])
        break
    }
  }

  const removeGovtResolution = (index: number) => {
    const newResolutions = [...govtResolutions]
    newResolutions.splice(index, 1)
    setGovtResolutions(newResolutions)
  }

  // Define editor modules outside of the render function
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
        <h1 className="text-3xl font-bold tracking-tight">Admission Management</h1>
        <p className="text-gray-500">Manage admission related content and documents</p>
      </div>

      <Tabs defaultValue="process" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="dates">Important Dates</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          <TabsTrigger value="fees">Fee Structure</TabsTrigger>
          <TabsTrigger value="scholarship">Scholarship</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="process" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Admission Process</CardTitle>
              <CardDescription>Describe the admission process for prospective students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px]">
                <div id="process-editor">
                  <Textarea
                    value={process}
                    onChange={(e) => setProcess(e.target.value)}
                    className="h-[300px] mb-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Important Dates</CardTitle>
              <CardDescription>Set important dates for the admission process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px]">
                <div id="dates-editor">
                  <Textarea
                    value={importantDates}
                    onChange={(e) => setImportantDates(e.target.value)}
                    className="h-[300px] mb-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eligibility" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
              <CardDescription>Define eligibility criteria for different programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px]">
                <div id="eligibility-editor">
                  <Textarea
                    value={eligibility}
                    onChange={(e) => setEligibility(e.target.value)}
                    className="h-[300px] mb-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
              <CardDescription>Define fee structure for different programs and categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px]">
                <div id="fees-editor">
                  <Textarea
                    value={feeStructure}
                    onChange={(e) => setFeeStructure(e.target.value)}
                    className="h-[300px] mb-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scholarship" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scholarship Details</CardTitle>
              <CardDescription>Provide information about available scholarships</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="min-h-[200px]">
                <div id="scholarship-editor">
                  <Textarea
                    value={scholarship}
                    onChange={(e) => setScholarship(e.target.value)}
                    className="h-[200px] mb-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cancellation Rules</Label>
                <div id="cancellation-editor">
                  <Textarea
                    value={cancellation}
                    onChange={(e) => setCancellation(e.target.value)}
                    className="h-[200px] mb-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Admission Documents</CardTitle>
              <CardDescription>Upload and manage admission related documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Admission Brochure</Label>
                  <FileUpload
                    type="pdf"
                    onUploadComplete={(data) => handleFileUpload(data, "brochure")}
                    maxSizeMB={5}
                    buttonText="Upload Brochure"
                  />
                  {brochureId && (
                    <div className="mt-2">
                      <a
                        href={`/api/files/${brochureId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Uploaded Brochure
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Admission Form</Label>
                  <FileUpload
                    type="pdf"
                    onUploadComplete={(data) => handleFileUpload(data, "admissionForm")}
                    maxSizeMB={5}
                    buttonText="Upload Admission Form"
                  />
                  {admissionFormId && (
                    <div className="mt-2">
                      <a
                        href={`/api/files/${admissionFormId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Uploaded Admission Form
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Scholarship Details Document</Label>
                  <FileUpload
                    type="pdf"
                    onUploadComplete={(data) => handleFileUpload(data, "scholarship")}
                    maxSizeMB={5}
                    buttonText="Upload Scholarship Document"
                  />
                  {scholarshipFileId && (
                    <div className="mt-2">
                      <a
                        href={`/api/files/${scholarshipFileId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Uploaded Scholarship Document
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Admission Information</Label>
                  <FileUpload
                    type="pdf"
                    onUploadComplete={(data) => handleFileUpload(data, "admissionInfo")}
                    maxSizeMB={5}
                    buttonText="Upload Admission Info"
                  />
                  {admissionInfoId && (
                    <div className="mt-2">
                      <a
                        href={`/api/files/${admissionInfoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Uploaded Admission Info
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Government Resolutions</Label>
                  <div>
                    <FileUpload
                      type="pdf"
                      onUploadComplete={(data) => handleFileUpload(data, "govtResolution")}
                      maxSizeMB={5}
                      buttonText="Upload Government Resolution"
                    />
                  </div>
                </div>

                {govtResolutions.length > 0 ? (
                  <div className="space-y-2">
                    {govtResolutions.map((resolution, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex-1">
                          <p className="font-medium">{resolution.name}</p>
                        </div>
                        <div className="flex space-x-2">
                          <a
                            href={`/api/files/${resolution.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View
                          </a>
                          <button
                            type="button"
                            onClick={() => removeGovtResolution(index)}
                            className="text-sm text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No government resolutions uploaded yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  )
}
