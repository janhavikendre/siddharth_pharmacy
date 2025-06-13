"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Upload, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Client-only delete button component
function DeleteButton({ id, onDelete }: { id: string; onDelete: () => void }) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this banner?")) return
    
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/Banners/${id}`, { method: "DELETE" })
      const result = await res.json()
      if (result.success) {
        onDelete()
      } else {
        alert(result.error || "Failed to delete")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("An error occurred during deletion.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="h-4 w-4" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  )
}

export default function BannersPage() {
  const [banners, setBanners] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("list")
  const [isLoading, setIsLoading] = useState(true)
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

  async function loadBanners() {
    setIsLoading(true)
    try {
      const res = await fetch("/api/Banners", { cache: "no-store" })
      const data = await res.json()
      setBanners(data.data ?? [])
    } catch (error) {
      console.error("Error fetching banners:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBanners()
  }, [])

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
        resetForm()
        loadBanners()
        alert("Banner uploaded successfully!")
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

  const resetForm = () => {
    setActiveTab("list")
    setFormData({ title: "", description: "", link: "", isActive: true })
    setImageFile(null)
    setImagePreview(null)
  }

  const handleBannerDeleted = () => {
    loadBanners()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banner Management</h1>
          <p className="text-gray-500">Manage banners displayed on the website</p>
        </div>
        <Button 
          onClick={() => setActiveTab("upload")} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" /> Upload Banner
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">All Banners ({banners.length})</TabsTrigger>
          <TabsTrigger value="upload">Upload New Banner</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Banners</CardTitle>
              <CardDescription>
                Manage all banners displayed on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading banners...</p>
                </div>
              ) : banners.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {banners.map((banner) => (
                    <div key={banner._id} className="border rounded-lg overflow-hidden shadow-sm">
                      {banner.imageData && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={banner.imageData}
                            alt={banner.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-lg">{banner.title}</h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              banner.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {banner.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        
                        {banner.description && (
                          <p className="text-sm text-gray-600 mb-2">{banner.description}</p>
                        )}
                        
                        {banner.link && (
                          <a
                            href={banner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline block mb-3"
                          >
                            View Link →
                          </a>
                        )}
                        
                        <div className="text-xs text-gray-500 mb-3">
                          Created: {new Date(banner.createdAt).toLocaleDateString()}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/dashboard/Banners/${banner._id}`}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <DeleteButton id={banner._id} onDelete={handleBannerDeleted} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No banners found</p>
                  <Button 
                    onClick={() => setActiveTab("upload")} 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Upload your first banner
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Banner</CardTitle>
              <CardDescription>
                Add a new banner to your website
              </CardDescription>
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
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
