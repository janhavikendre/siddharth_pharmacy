"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"

export default function AboutContentPage() {
  const [institute, setInstitute] = useState("")
  const [society, setSociety] = useState("")
  const [vision, setVision] = useState("")
  const [mission, setMission] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch("/api/content/about")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setInstitute(data.data.institute || "")
            setSociety(data.data.society || "")
            setVision(data.data.vision || "")
            setMission(data.data.mission || "")
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error)
        toast({
          title: "Error",
          description: "Failed to load content. Please try again.",
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
      const response = await fetch("/api/content/about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          institute,
          society,
          vision,
          mission,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save content")
      }

      toast({
        title: "Success",
        description: "About content updated successfully",
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
          <Link href="/admin/dashboard/content">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">About Content</h1>
          <p className="text-gray-500">Manage the content for the About Us page</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Institute</CardTitle>
          <CardDescription>This content appears in the "About Institute" section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px]">
            <Textarea
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              placeholder="Enter content about the institute"
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Society</CardTitle>
          <CardDescription>This content appears in the "About Society" section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px]">
            <Textarea
              value={society}
              onChange={(e) => setSociety(e.target.value)}
              placeholder="Enter content about the society"
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vision</CardTitle>
          <CardDescription>This content appears in the "Vision & Mission" section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px]">
            <Textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Enter vision statement"
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mission</CardTitle>
          <CardDescription>This content appears in the "Vision & Mission" section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px]">
            <Textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder="Enter mission statement"
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className=" bg-blue-600:bg-blue-700" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
