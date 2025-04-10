"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import FileUpload from "@/components/ui/file-upload"
import { Checkbox } from "@/components/ui/checkbox"

export default function EditFacultyPage() {
  const [name, setName] = useState("")
  const [designation, setDesignation] = useState("")
  const [department, setDepartment] = useState("")
  const [qualification, setQualification] = useState("")
  const [experience, setExperience] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [imageId, setImageId] = useState("")
  const [isTeaching, setIsTeaching] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const id = params.id as string

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const response = await fetch(`/api/faculty/${id}`)
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            const faculty = data.data
            setName(faculty.name || "")
            setDesignation(faculty.designation || "")
            setDepartment(faculty.department || "")
            setQualification(faculty.qualification || "")
            setExperience(faculty.experience || "")
            setSpecialization(faculty.specialization || "")
            setEmail(faculty.email || "")
            setBio(faculty.bio || "")
            setImageId(faculty.imageId || "")
            setIsTeaching(faculty.isTeaching !== false) // Default to true if not specified
          } else {
            throw new Error("Failed to fetch faculty data")
          }
        } else {
          throw new Error("Failed to fetch faculty data")
        }
      } catch (error) {
        console.error("Error fetching faculty:", error)
        toast({
          title: "Error",
          description: "Failed to load faculty data. Please try again.",
          variant: "destructive",
        })
        router.push("/admin/dashboard/faculty")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFaculty()
  }, [id, router, toast])

  const handleImageUpload = (fileData) => {
    setImageId(fileData.id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate
      if (!name.trim() || !designation.trim()) {
        throw new Error("Name and designation are required")
      }

      const response = await fetch(`/api/faculty/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          designation,
          department,
          qualification,
          experience,
          specialization,
          email,
          bio,
          imageId,
          isTeaching,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update faculty member")
      }

      toast({
        title: "Success",
        description: "Faculty member updated successfully",
      })

      router.push("/admin/dashboard/faculty")
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
          <Link href="/admin/dashboard/faculty">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Faculty Member</h1>
          <p className="text-gray-500">Update faculty or staff member information</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Faculty Details</CardTitle>
            <CardDescription>This information will be displayed on the Faculty page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g., Professor, Assistant Professor"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Department"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g., Ph.D., M.Des."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g., 10+ years in fashion industry"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g., Textile Design, Pattern Making"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                />
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Checkbox id="isTeaching" checked={isTeaching} onCheckedChange={setIsTeaching} />
                <Label htmlFor="isTeaching">Teaching Staff</Label>
                <p className="text-sm text-gray-500 ml-2">(Uncheck for non-teaching staff)</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Brief biography"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Profile Image</Label>
              <FileUpload
                type="image"
                onUploadComplete={handleImageUpload}
                maxSizeMB={2}
                width={300}
                quality={80}
                buttonText="Upload Profile Image"
              />
              {imageId && (
                <div className="mt-2">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden">
                    <img src={`/api/files/${imageId}`} alt={name} className="h-full w-full object-cover" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/faculty")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-rose-600 hover:bg-rose-700" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Faculty Member"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
