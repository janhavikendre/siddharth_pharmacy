"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FileUpload from "@/components/ui/file-upload"
import dynamic from "next/dynamic"

export default function FacilityDetailPage({ params }: { params: { id: string } }) {
  const [facility, setFacility] = useState<any>({
    name: "",
    shortDescription: "",
    description: "",
    imageId: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchFacility() {
      try {
        const response = await fetch(`/api/facilities/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setFacility(data.data)
          } else {
            throw new Error("Facility not found")
          }
        } else {
          throw new Error("Failed to fetch facility")
        }
      } catch (error) {
        console.error("Error fetching facility:", error)
        toast({
          title: "Error",
          description: "Failed to load facility. Please try again.",
          variant: "destructive",
        })
        router.push("/admin/dashboard/facilities")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchFacility()
    }
  }, [params.id, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFacility((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleDescriptionChange = (value: string) => {
    setFacility((prev: any) => ({ ...prev, description: value }))
  }

  const handleImageUpload = (fileData: any) => {
    setFacility((prev: any) => ({ ...prev, imageId: fileData.id }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const response = await fetch(`/api/facilities/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facility),
      })

      if (!response.ok) {
        throw new Error("Failed to update facility")
      }

      toast({
        title: "Success",
        description: "Facility updated successfully",
      })

      router.push("/admin/dashboard/facilities")
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
        <h1 className="text-3xl font-bold tracking-tight">Edit Facility</h1>
        <p className="text-gray-500">Update facility information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facility Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Facility Name</Label>
            <Input
              id="name"
              name="name"
              value={facility.name}
              onChange={handleInputChange}
              placeholder="Enter facility name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              name="shortDescription"
              value={facility.shortDescription}
              onChange={handleInputChange}
              placeholder="Enter a brief description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Facility Image</Label>
            <FileUpload
              type="image"
              onUploadComplete={handleImageUpload}
              maxSizeMB={2}
              width={800}
              quality={80}
              buttonText="Upload Facility Image"
            />
            {facility.imageId && (
              <div className="mt-2">
                <div className="relative h-40 w-full rounded-md overflow-hidden">
                  <img
                    src={`/api/files/${facility.imageId}`}
                    alt={facility.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Detailed Description</Label>
            <Textarea
              id="description"
              name="description"
              value={facility.description}
              onChange={handleInputChange}
              placeholder="Enter detailed description"
              rows={6}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => router.push("/admin/dashboard/facilities")}>
              Cancel
            </Button>
            <Button onClick={handleSave} className=" bg-blue-600:bg-blue-700" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
