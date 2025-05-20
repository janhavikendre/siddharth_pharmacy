"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus } from "lucide-react"
import FileUpload from "@/components/ui/file-upload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchLeaders() {
      try {
        const response = await fetch("/api/content/leadership")
        if (response.ok) {
          const data = await response.json()
          setLeaders(data.data || [])
        } else {
          throw new Error("Failed to fetch leadership data")
        }
      } catch (error) {
        console.error("Error fetching leadership data:", error)
        toast({
          title: "Error",
          description: "Failed to load leadership data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaders()
  }, [toast])

  const handleImageUpload = (fileData: any, index: number) => {
    const updatedLeaders = [...leaders]
    updatedLeaders[index].imageId = fileData.id
    setLeaders(updatedLeaders)
  }

  const handleMessageChange = (index: number, content: string) => {
    const updatedLeaders = [...leaders]
    updatedLeaders[index].message = content
    setLeaders(updatedLeaders)
  }

  const handleNameChange = (index: number, name: string) => {
    const updatedLeaders = [...leaders]
    updatedLeaders[index].name = name
    setLeaders(updatedLeaders)
  }

  const handleRoleChange = (index: number, role: string) => {
    const updatedLeaders = [...leaders]
    updatedLeaders[index].role = role
    setLeaders(updatedLeaders)
  }

  const handlePositionChange = (index: number, position: string) => {
    const updatedLeaders = [...leaders]
    updatedLeaders[index].position = position
    setLeaders(updatedLeaders)
  }

  const addLeader = () => {
    setLeaders([
      ...leaders,
      {
        name: "",
        role: "",
        position: "leadership",
        message: "",
        imageId: "",
      },
    ])
  }

  const removeLeader = (index: number) => {
    const newLeaders = [...leaders]
    newLeaders.splice(index, 1)
    setLeaders(newLeaders)
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const response = await fetch("/api/content/leadership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leaders,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save leadership data")
      }

      toast({
        title: "Success",
        description: "Leadership data updated successfully",
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
          <h1 className="text-3xl font-bold tracking-tight">Leadership Management</h1>
          <p className="text-gray-500">Manage leadership profiles and messages displayed on the website</p>
        </div>
        <Button type="button" variant="outline" onClick={addLeader} className="flex items-center">
          <Plus className="h-4 w-4 mr-1" /> Add Leader
        </Button>
      </div>

      {leaders.length > 0 ? (
        <div className="space-y-6">
          {leaders.map((leader, index) => (
            <Card key={index} className="border-rose-100 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{leader.name || `Leader ${index + 1}`}</CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLeader(index)}
                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`leader-${index}-name`}>Name</Label>
                    <Input
                      id={`leader-${index}-name`}
                      value={leader.name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      placeholder="Full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`leader-${index}-role`}>Role</Label>
                    <Select value={leader.role} onValueChange={(value) => handleRoleChange(index, value)}>
                      <SelectTrigger id={`leader-${index}-role`}>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Chairman">Chairman</SelectItem>
                        <SelectItem value="Secretary">Secretary</SelectItem>
                        <SelectItem value="Principal">Principal</SelectItem>
                        <SelectItem value="Director">Director</SelectItem>
                        <SelectItem value="Vice Principal">Vice Principal</SelectItem>
                        <SelectItem value="Dean">Dean</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`leader-${index}-position`}>Position Type</Label>
                    <Select value={leader.position} onValueChange={(value) => handlePositionChange(index, value)}>
                      <SelectTrigger id={`leader-${index}-position`}>
                        <SelectValue placeholder="Select position type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="board">Board Member</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Profile Image</Label>
                  <FileUpload
                    type="image"
                    onUploadComplete={(data) => handleImageUpload(data, index)}
                    maxSizeMB={1}
                    width={300}
                    height={300}
                    quality={80}
                    buttonText="Upload Profile Image"
                  />
                  {leader.imageId && (
                    <div className="mt-2">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden">
                        <img
                          src={`/api/files/${leader.imageId}`}
                          alt={leader.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    value={leader.message}
                    onChange={(e) => handleMessageChange(index, e.target.value)}
                    placeholder="Enter message content"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end">
            <Button onClick={handleSave} className=" bg-blue-600:bg-blue-700" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save All Leaders"}
            </Button>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No leadership profiles found</p>
            <Button onClick={addLeader} className="mt-4  bg-blue-600:bg-blue-700">
              Add Your First Leader
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
