"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function EditBannerPage({ params }: { params: { id: string } }) {
  const [banner, setBanner] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    isActive: true,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [removeImage, setRemoveImage] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadBanner()
  }, [params.id])

  async function loadBanner() {
    try {
      const res = await fetch(`/api/Banners/${params.id}`)
      const data = await res.json()
      
      if (data.success) {
        setBanner(data.data)
        setFormData({
          title: data.data.title || "",
          description: data.data.description || "",
          link: data.data.link || "",
          isActive: data.data.isActive,
        })
        setImagePreview(data.data.imageData || null)
      } else {
        alert("Banner not found")
        router.push("/admin/dashboard/Banners")
      }
    } catch (error) {
      console.error("Error fetching banner:", error)
      alert("Error loading banner")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
      setRemoveImage(false)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setRemoveImage(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    const submitData = new FormData()
    submitData.append("title", formData.title)
    submitData.append("description", formData.description)
    submitData.append("link", formData.link)
    submitData.append("isActive", formData.isActive.toString())
    
    if (imageFile) {
      submitData.append("image", imageFile)
    }
    
    if (removeImage) {
      submitData.append("removeImage", "true")
    }

    try {
      const res = await fetch(`/api/Banners/${params.id}`, {
        method: "PUT",
        body: submitData,
      })
      
      const result = await res.json()
      
      if (result.success) {
        alert("Banner updated successfully!")
        router.push("/admin/dashboard/Banners")
      } else {
        alert(result.error || "Failed to update banner")
      }
    } catch (error) {
      console.error("Update error:", error)
      alert("An error occurred while updating.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/dashboard/Banners">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Banners
            </Link>
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Loading banner...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/dashboard/Banners">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Banners
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Banner</h1>
          <p className="text-gray-500">Update banner information and image</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>Update the banner information below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Banner Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Enter banner title..."
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter banner description..."
              />
            </div>
            
            <div>
              <Label htmlFor="link">Link (Optional)</Label>
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="image">Banner Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-2 relative inline-block">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={400}
                    height={200}
                    className="object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
              />
              <Label htmlFor="isActive">Active (Display on website)</Label>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/dashboard/Banners">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
