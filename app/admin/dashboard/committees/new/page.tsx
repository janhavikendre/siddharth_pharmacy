"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

export default function NewCommitteePage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [members, setMembers] = useState([{ name: "", role: "", department: "", contact: "" }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const addMember = () => {
    setMembers([...members, { name: "", role: "", department: "", contact: "" }])
  }

  const removeMember = (index) => {
    const newMembers = [...members]
    newMembers.splice(index, 1)
    setMembers(newMembers)
  }

  const updateMember = (index, field, value) => {
    const newMembers = [...members]
    newMembers[index][field] = value
    setMembers(newMembers)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate
      if (!name.trim()) {
        throw new Error("Committee name is required")
      }

      // Filter out empty members
      const validMembers = members.filter((m) => m.name.trim() && m.role.trim())

      const response = await fetch("/api/committees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          members: validMembers,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create committee")
      }

      toast({
        title: "Success",
        description: "Committee created successfully",
      })

      router.push("/admin/dashboard/committees")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/admin/dashboard/committees">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Committee</h1>
          <p className="text-gray-500">Create a new committee for the institute</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Committee Details</CardTitle>
            <CardDescription>This information will be displayed on the Committees page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Committee Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Anti-Ragging Committee"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the committee's purpose and responsibilities"
                rows={4}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Committee Members</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMember}>
                  <Plus className="h-4 w-4 mr-1" /> Add Member
                </Button>
              </div>

              {members.map((member, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Member {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMember(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`member-${index}-name`}>Name</Label>
                      <Input
                        id={`member-${index}-name`}
                        value={member.name}
                        onChange={(e) => updateMember(index, "name", e.target.value)}
                        placeholder="Member name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`member-${index}-role`}>Role</Label>
                      <Input
                        id={`member-${index}-role`}
                        value={member.role}
                        onChange={(e) => updateMember(index, "role", e.target.value)}
                        placeholder="e.g., Chairperson, Secretary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`member-${index}-department`}>Department (Optional)</Label>
                      <Input
                        id={`member-${index}-department`}
                        value={member.department}
                        onChange={(e) => updateMember(index, "department", e.target.value)}
                        placeholder="Department"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`member-${index}-contact`}>Contact (Optional)</Label>
                      <Input
                        id={`member-${index}-contact`}
                        value={member.contact}
                        onChange={(e) => updateMember(index, "contact", e.target.value)}
                        placeholder="Email or phone"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/committees")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-rose-600 hover:bg-rose-700" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Committee"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
