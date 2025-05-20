"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

export default function EditLibraryResourcePage() {
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [items, setItems] = useState([{ title: "", details: "" }])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const id = params.id as string

  const categoryOptions = [
    { value: "books", label: "Fashion Design Books" },
    { value: "journals", label: "Fashion Journals & Magazines" },
    { value: "digital", label: "Digital Resources" },
    { value: "archives", label: "Fashion Archives" },
  ]

  useEffect(() => {
    async function fetchResource() {
      try {
        const response = await fetch(`/api/library/resources/${id}`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            const resource = data.data
            setCategory(resource.category || "")
            setTitle(resource.title || "")
            setItems(resource.items && resource.items.length > 0 ? resource.items : [{ title: "", details: "" }])
          } else {
            throw new Error("Failed to fetch resource data")
          }
        } else {
          throw new Error("Failed to fetch resource data")
        }
      } catch (error) {
        console.error("Error fetching resource:", error)
        toast({
          title: "Error",
          description: "Failed to load resource data. Please try again.",
          variant: "destructive",
        })
        router.push("/admin/dashboard/library")
      } finally {
        setIsLoading(false)
      }
    }

    fetchResource()
  }, [id, router, toast])

  const addItem = () => {
    setItems([...items, { title: "", details: "" }])
  }

  const removeItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate
      if (!category || !title.trim()) {
        throw new Error("Category and title are required")
      }

      // Filter out empty items
      const validItems = items.filter((item) => item.title.trim() !== "")

      if (validItems.length === 0) {
        throw new Error("At least one resource item is required")
      }

      const response = await fetch(`/api/library/resources/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          title,
          items: validItems,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update resource")
      }

      toast({
        title: "Success",
        description: "Library resource updated successfully",
      })

      router.push("/admin/dashboard/library")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
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
      <div className="flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/admin/dashboard/library">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Library Resource</h1>
          <p className="text-gray-500">Update an existing library resource</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Resource Details</CardTitle>
            <CardDescription>This information will be displayed on the Library page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Resource Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Resource Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Fashion Design Books"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Resource Items</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-1" /> Add Item
                </Button>
              </div>

              {items.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                      disabled={items.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`item-${index}-title`}>Title</Label>
                    <Input
                      id={`item-${index}-title`}
                      value={item.title}
                      onChange={(e) => updateItem(index, "title", e.target.value)}
                      placeholder="Item title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`item-${index}-details`}>Details</Label>
                    <Input
                      id={`item-${index}-details`}
                      value={item.details}
                      onChange={(e) => updateItem(index, "details", e.target.value)}
                      placeholder="Additional details (author, year, etc.)"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/library")}>
              Cancel
            </Button>
            <Button type="submit" className=" bg-blue-600:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Resource"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
