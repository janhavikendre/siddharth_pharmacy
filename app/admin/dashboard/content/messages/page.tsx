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

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch("/api/content/messages")
        if (response.ok) {
          const data = await response.json()
          setMessages(data.data || [])
        } else {
          throw new Error("Failed to fetch messages")
        }
      } catch (error) {
        console.error("Error fetching messages:", error)
        toast({
          title: "Error",
          description: "Failed to load messages. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [toast])

  const handleImageUpload = (fileData: any, index: number) => {
    const updatedMessages = [...messages]
    updatedMessages[index].imageId = fileData.id
    setMessages(updatedMessages)
  }

  const handleMessageChange = (index: number, content: string) => {
    const updatedMessages = [...messages]
    updatedMessages[index].message = content
    setMessages(updatedMessages)
  }

  const handleNameChange = (index: number, name: string) => {
    const updatedMessages = [...messages]
    updatedMessages[index].name = name
    setMessages(updatedMessages)
  }

  const handleRoleChange = (index: number, role: string) => {
    const updatedMessages = [...messages]
    updatedMessages[index].role = role
    setMessages(updatedMessages)
  }

  const addMessage = () => {
    setMessages([
      ...messages,
      {
        name: "",
        role: "",
        message: "",
        imageId: "",
      },
    ])
  }

  const removeMessage = (index: number) => {
    const newMessages = [...messages]
    newMessages.splice(index, 1)
    setMessages(newMessages)
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const response = await fetch("/api/content/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save messages")
      }

      toast({
        title: "Success",
        description: "Messages updated successfully",
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
          <h1 className="text-3xl font-bold tracking-tight">Leadership Messages</h1>
          <p className="text-gray-500">Manage messages from leadership displayed on the About page</p>
        </div>
        <Button type="button" variant="outline" onClick={addMessage} className="flex items-center">
          <Plus className="h-4 w-4 mr-1" /> Add Message
        </Button>
      </div>

      {messages.length > 0 ? (
        <div className="space-y-6">
          {messages.map((message, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Message {index + 1}</CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMessage(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`message-${index}-name`}>Name</Label>
                    <Input
                      id={`message-${index}-name`}
                      value={message.name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      placeholder="Full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`message-${index}-role`}>Role</Label>
                    <Input
                      id={`message-${index}-role`}
                      value={message.role}
                      onChange={(e) => handleRoleChange(index, e.target.value)}
                      placeholder="e.g., Chairman, Principal"
                    />
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
                  {message.imageId && (
                    <div className="mt-2">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden">
                        <img
                          src={`/api/files/${message.imageId}`}
                          alt={message.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    value={message.message}
                    onChange={(e) => handleMessageChange(index, e.target.value)}
                    placeholder="Enter message content"
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save All Messages"}
            </Button>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No messages found</p>
            <Button onClick={addMessage} className="mt-4 bg-rose-600 hover:bg-rose-700">
              Add Your First Message
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
