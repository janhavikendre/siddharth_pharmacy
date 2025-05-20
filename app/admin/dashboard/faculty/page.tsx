"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const response = await fetch("/api/faculty")
        if (response.ok) {
          const data = await response.json()
          setFaculty(data.data || [])
        } else {
          throw new Error("Failed to fetch faculty")
        }
      } catch (error) {
        console.error("Error fetching faculty:", error)
        toast({
          title: "Error",
          description: "Failed to load faculty data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchFaculty()
  }, [toast])

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this faculty member?")) return

    try {
      const response = await fetch(`/api/faculty/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete faculty member")
      }

      setFaculty(faculty.filter((member) => member._id !== id))

      toast({
        title: "Success",
        description: "Faculty member deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
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
          <h1 className="text-3xl font-bold tracking-tight">Faculty & Staff</h1>
          <p className="text-gray-500">Manage faculty and staff members</p>
        </div>
        <Button asChild className=" bg-blue-600:bg-blue-700">
          <Link href="/admin/dashboard/faculty/new">
            <Plus className="h-4 w-4 mr-2" /> Add Faculty
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Faculty & Staff</CardTitle>
          <CardDescription>Faculty and staff information is displayed on the Academics page</CardDescription>
        </CardHeader>
        <CardContent>
          {faculty.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {faculty.map((member) => (
                <div key={member._id} className="flex p-4 border rounded-lg">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <Image
                      src={member.imageId ? `/api/files/${member.imageId}` : "/placeholder.svg?height=64&width=64"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-blue-600">{member.designation}</p>
                    <p className="text-xs text-gray-500">{member.department}</p>
                    <div className="flex mt-2 space-x-2">
                      <Button variant="outline" size="icon" asChild className="h-7 w-7">
                        <Link href={`/admin/dashboard/faculty/${member._id}`}>
                          <Edit className="h-3 w-3" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => handleDelete(member._id)}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No faculty or staff members found</p>
              <Button asChild className="mt-4  bg-blue-600:bg-blue-700">
                <Link href="/admin/dashboard/faculty/new">Add your first faculty member</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
