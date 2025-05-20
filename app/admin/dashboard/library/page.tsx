"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit } from "lucide-react"

export default function LibraryPage() {
  const [about, setAbout] = useState("")
  const [hours, setHours] = useState("")
  const [resources, setResources] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchLibraryContent() {
      try {
        const response = await fetch("/api/library")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setAbout(data.data.content?.about || "")
            setHours(data.data.content?.hours || "")
            setResources(data.data.resources || [])
          }
        } else {
          throw new Error("Failed to fetch library content")
        }
      } catch (error) {
        console.error("Error fetching library content:", error)
        toast({
          title: "Error",
          description: "Failed to load library content. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLibraryContent()
  }, [toast])

  const handleSaveContent = async () => {
    setIsSaving(true)

    try {
      const response = await fetch("/api/library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          about,
          hours,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save library content")
      }

      toast({
        title: "Success",
        description: "Library content updated successfully",
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

  const handleDeleteResource = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return

    try {
      const response = await fetch(`/api/library/resources/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete resource")
      }

      setResources(resources.filter((resource) => resource._id !== id))

      toast({
        title: "Success",
        description: "Resource deleted successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    }
  }

  // Helper function to get category label
  const getCategoryLabel = (categoryValue: string) => {
    switch (categoryValue) {
      case "books":
        return "Fashion Design Books"
      case "journals":
        return "Fashion Journals & Magazines"
      case "digital":
        return "Digital Resources"
      case "archives":
        return "Fashion Archives"
      default:
        return categoryValue
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Management</h1>
          <p className="text-gray-500">Manage library content and resources</p>
        </div>
        <Button asChild className=" bg-blue-600:bg-blue-700">
          <Link href="/admin/dashboard/library/resources/new">
            <Plus className="h-4 w-4 mr-2" /> Add Resource
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Library Content</TabsTrigger>
          <TabsTrigger value="resources">Library Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About Library</CardTitle>
              <CardDescription>Provide information about the library</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="min-h-[300px]">
                <Textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Enter information about the library"
                  className="min-h-[300px]"
                  rows={10}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Library Hours</CardTitle>
              <CardDescription>Set library working hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="min-h-[200px]">
                <Textarea
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="Enter library hours information"
                  className="min-h-[200px]"
                  rows={6}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveContent} className=" bg-blue-600:bg-blue-700" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Content"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Resources</CardTitle>
              <CardDescription>Manage existing library resources</CardDescription>
            </CardHeader>
            <CardContent>
              {resources.length > 0 ? (
                <div className="space-y-6">
                  {resources.map((resource) => (
                    <div key={resource._id} className="border rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between bg-gray-50 p-4 border-b">
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-gray-500">Category: {getCategoryLabel(resource.category)}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild className="h-8 w-8 p-0">
                            <Link href={`/admin/dashboard/library/resources/${resource._id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteResource(resource._id)}
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-medium mb-2">Items:</h4>
                        <ul className="space-y-2">
                          {resource.items &&
                            resource.items.map((item: any, index: number) => (
                              <li key={index} className="text-sm">
                                <span className="font-medium">{item.title}</span>
                                {item.details && <span className="text-gray-500"> - {item.details}</span>}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No resources found</p>
                  <Button asChild className="mt-4  bg-blue-600:bg-blue-700">
                    <Link href="/admin/dashboard/library/resources/new">Add Your First Resource</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
