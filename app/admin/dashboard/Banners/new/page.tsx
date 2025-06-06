"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function NewBannerPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    isActive: true,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!imageFile) {
      alert("Please select an image file")
      return
    }

    setIsUploading(true)
    
    const submitData = new FormData()
    submitData.append("title", formData.title)
    submitData.append("description", formData.description)
    submitData.append("link", formData.link)
    submitData.append("isActive", formData.isActive.toString())
    submitData.append("image", imageFile)

    try {
      const res = await fetch("/api/Banners", { method: "POST", body: submitData })
      const result = await res.json()
      
      if (result.success) {
        alert("Banner uploaded successfully!")
        router.push("/admin/dashboard/Banners")
      } else {
        alert(result.error || "Failed to upload banner")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("An error occurred while uploading.")
    } finally {
      setIsUploading(false)
    }
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
          <h1 className="text-3xl font-bold tracking-tight">Upload New Banner</h1>
          <p className="text-gray-500">Add a new banner to your website</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banner Information</CardTitle>
          <CardDescription>Fill in the details for your new banner</CardDescription>
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
                required
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
                    onClick={() => {
                      setImageFile(null)
                      setImagePreview(null)
                    }}
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
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload Banner"}
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
