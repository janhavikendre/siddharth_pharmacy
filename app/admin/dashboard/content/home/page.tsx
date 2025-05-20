"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FileUpload from "@/components/ui/file-upload"
import { Plus, Trash2 } from "lucide-react"

export default function HomeContentPage() {
  const [slides, setSlides] = useState<any[]>([])
  const [highlights, setHighlights] = useState<any[]>([])
  const [reasons, setReasons] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchHomeContent() {
      try {
        const response = await fetch("/api/content/home")
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setSlides(data.data.slides || [])
            setHighlights(data.data.highlights || [])
            setReasons(data.data.reasons || [])
          }
        } else {
          throw new Error("Failed to fetch home content")
        }
      } catch (error) {
        console.error("Error fetching home content:", error)
        toast({
          title: "Error",
          description: "Failed to load home content. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchHomeContent()
  }, [toast])

  const handleSaveSlides = async () => {
    setIsSaving(true)

    try {
      const response = await fetch("/api/content/home/slides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slides,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save slides")
      }

      toast({
        title: "Success",
        description: "Hero slides updated successfully",
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

  const handleSaveHighlights = async () => {
    setIsSaving(true)

    try {
      const response = await fetch("/api/content/home/highlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          highlights,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save highlights")
      }

      toast({
        title: "Success",
        description: "Institute highlights updated successfully",
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

  const handleSaveReasons = async () => {
    setIsSaving(true)

    try {
      const response = await fetch("/api/content/home/reasons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reasons,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save reasons")
      }

      toast({
        title: "Success",
        description: "Why Choose Us reasons updated successfully",
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

  const handleSlideImageUpload = (fileData: any, index: number) => {
    const updatedSlides = [...slides]
    updatedSlides[index].imageId = fileData.id
    setSlides(updatedSlides)
  }

  const addSlide = () => {
    setSlides([
      ...slides,
      {
        title: "",
        description: "",
        cta: "Explore",
        link: "/",
        imageId: "",
      },
    ])
  }

  const removeSlide = (index: number) => {
    const newSlides = [...slides]
    newSlides.splice(index, 1)
    setSlides(newSlides)
  }

  const updateSlide = (index: number, field: string, value: string) => {
    const newSlides = [...slides]
    newSlides[index] = { ...newSlides[index], [field]: value }
    setSlides(newSlides)
  }

  const addHighlight = () => {
    setHighlights([
      ...highlights,
      {
        icon: "GraduationCap",
        title: "",
        description: "",
      },
    ])
  }

  const removeHighlight = (index: number) => {
    const newHighlights = [...highlights]
    newHighlights.splice(index, 1)
    setHighlights(newHighlights)
  }

  const updateHighlight = (index: number, field: string, value: string) => {
    const newHighlights = [...highlights]
    newHighlights[index] = { ...newHighlights[index], [field]: value }
    setHighlights(newHighlights)
  }

  const addReason = () => {
    setReasons([...reasons, ""])
  }

  const removeReason = (index: number) => {
    const newReasons = [...reasons]
    newReasons.splice(index, 1)
    setReasons(newReasons)
  }

  const updateReason = (index: number, value: string) => {
    const newReasons = [...reasons]
    newReasons[index] = value
    setReasons(newReasons)
  }

  const iconOptions = ["GraduationCap", "Users", "Award", "BookOpen", "Star", "Heart", "Briefcase", "Globe"]

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
        <h1 className="text-3xl font-bold tracking-tight">Home Page Content</h1>
        <p className="text-gray-500">Manage content displayed on the home page</p>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero">Hero Slides</TabsTrigger>
          <TabsTrigger value="highlights">Institute Highlights</TabsTrigger>
          <TabsTrigger value="reasons">Why Choose Us</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Hero Banner Slides</CardTitle>
                  <CardDescription>Manage slides for the hero banner carousel</CardDescription>
                </div>
                <Button type="button" variant="outline" onClick={addSlide} className="flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add Slide
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {slides.length > 0 ? (
                <>
                  {slides.map((slide, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Slide {index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSlide(index)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                          disabled={slides.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`slide-${index}-title`}>Title</Label>
                          <Input
                            id={`slide-${index}-title`}
                            value={slide.title}
                            onChange={(e) => updateSlide(index, "title", e.target.value)}
                            placeholder="Slide title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`slide-${index}-description`}>Description</Label>
                          <Textarea
                            id={`slide-${index}-description`}
                            value={slide.description}
                            onChange={(e) => updateSlide(index, "description", e.target.value)}
                            placeholder="Slide description"
                            rows={2}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`slide-${index}-cta`}>CTA Text</Label>
                          <Input
                            id={`slide-${index}-cta`}
                            value={slide.cta}
                            onChange={(e) => updateSlide(index, "cta", e.target.value)}
                            placeholder="Call to action text"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`slide-${index}-link`}>Link</Label>
                          <Input
                            id={`slide-${index}-link`}
                            value={slide.link}
                            onChange={(e) => updateSlide(index, "link", e.target.value)}
                            placeholder="Link URL"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Slide Image</Label>
                        <FileUpload
                          type="image"
                          onUploadComplete={(data) => handleSlideImageUpload(data, index)}
                          maxSizeMB={2}
                          width={1200}
                          height={600}
                          quality={80}
                          buttonText="Upload Slide Image"
                        />
                        {slide.imageId && (
                          <div className="mt-2">
                            <div className="relative h-32 w-full rounded-md overflow-hidden">
                              <img
                                src={`/api/files/${slide.imageId}`}
                                alt={`Slide ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <Button onClick={handleSaveSlides} className=" bg-blue-600:bg-blue-700" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Slides"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No slides found</p>
                  <Button onClick={addSlide} className="mt-4  bg-blue-600:bg-blue-700">
                    Add Your First Slide
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="highlights" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Institute Highlights</CardTitle>
                  <CardDescription>Manage highlights displayed on the home page</CardDescription>
                </div>
                <Button type="button" variant="outline" onClick={addHighlight} className="flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add Highlight
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {highlights.length > 0 ? (
                <>
                  {highlights.map((highlight, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Highlight {index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeHighlight(index)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                          disabled={highlights.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`highlight-${index}-icon`}>Icon</Label>
                          <select
                            id={`highlight-${index}-icon`}
                            value={highlight.icon}
                            onChange={(e) => updateHighlight(index, "icon", e.target.value)}
                            className="w-full p-2 border rounded-md"
                          >
                            {iconOptions.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`highlight-${index}-title`}>Title</Label>
                          <Input
                            id={`highlight-${index}-title`}
                            value={highlight.title}
                            onChange={(e) => updateHighlight(index, "title", e.target.value)}
                            placeholder="Highlight title"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`highlight-${index}-description`}>Description</Label>
                        <Textarea
                          id={`highlight-${index}-description`}
                          value={highlight.description}
                          onChange={(e) => updateHighlight(index, "description", e.target.value)}
                          placeholder="Highlight description"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveHighlights}
                      className=" bg-blue-600:bg-blue-700"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Highlights"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No highlights found</p>
                  <Button onClick={addHighlight} className="mt-4  bg-blue-600:bg-blue-700">
                    Add Your First Highlight
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reasons" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Why Choose Us</CardTitle>
                  <CardDescription>Manage reasons to choose the institute</CardDescription>
                </div>
                <Button type="button" variant="outline" onClick={addReason} className="flex items-center">
                  <Plus className="h-4 w-4 mr-1" /> Add Reason
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {reasons.length > 0 ? (
                <>
                  {reasons.map((reason, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={reason}
                        onChange={(e) => updateReason(index, e.target.value)}
                        placeholder={`Reason ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeReason(index)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        disabled={reasons.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <Button onClick={handleSaveReasons} className=" bg-blue-600:bg-blue-700" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Reasons"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reasons found</p>
                  <Button onClick={addReason} className="mt-4  bg-blue-600:bg-blue-700">
                    Add Your First Reason
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
