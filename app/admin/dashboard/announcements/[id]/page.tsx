"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditAnnouncementPage() {
  const [text, setText] = useState("")
  const [link, setLink] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const id = params.id as string

  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        const response = await fetch(`/api/announcements/${id}`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setText(data.data.text || "")
            setLink(data.data.link || "")
            setIsActive(data.data.isActive !== false) // Default to true if not specified
          } else {
            throw new Error("Failed to fetch announcement data")
          }
        } else {
          throw new Error("Failed to fetch announcement data")
        }
      } catch (error) {
        console.error("Error fetching announcement:", error)
        toast({
          title: "Error",
          description: "Failed to load announcement data. Please try again.",
          variant: "destructive",
        })
        router.push("/admin/dashboard/announcements")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnnouncement()
  }, [id, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate
      if (!text.trim()) {
        throw new Error("Announcement text is required")
      }

      const response = await fetch(`/api/announcements/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          link: link || undefined,
          isActive,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update announcement")
      }

      toast({
        title: "Success",
        description: "Announcement updated successfully",
      })

      router.push("/admin/dashboard/announcements")
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
          <Link href="/admin/dashboard/announcements">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Announcement</h1>
          <p className="text-gray-500">Update an existing announcement</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Announcement Details</CardTitle>
            <CardDescription>This announcement will be displayed in the marquee on the home page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Announcement Text</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter announcement text"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Link (Optional)</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://example.com"
                type="url"
              />
              <p className="text-xs text-gray-500">
                If provided, the announcement will be clickable and redirect to this URL
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/announcements")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-rose-600 hover:bg-rose-700" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Announcement"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
