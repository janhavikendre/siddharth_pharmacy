"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CommitteesPage() {
  const [committees, setCommittees] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchCommittees() {
      try {
        const response = await fetch("/api/committees")
        if (response.ok) {
          const data = await response.json()
          setCommittees(data.data || [])
        } else {
          throw new Error("Failed to fetch committees")
        }
      } catch (error) {
        console.error("Error fetching committees:", error)
        toast({
          title: "Error",
          description: "Failed to load committees. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCommittees()
  }, [toast])

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this committee?")) return

    try {
      const response = await fetch(`/api/committees/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete committee")
      }

      setCommittees(committees.filter((committee) => committee._id !== id))

      toast({
        title: "Success",
        description: "Committee deleted successfully",
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
          <h1 className="text-3xl font-bold tracking-tight">Committees</h1>
          <p className="text-gray-500">Manage institute committees and their members</p>
        </div>
        <Button asChild className=" bg-blue-600:bg-blue-700">
          <Link href="/admin/dashboard/committees/new">
            <Plus className="h-4 w-4 mr-2" /> Add Committee
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Committees</CardTitle>
          <CardDescription>Committees are displayed on the Committees page</CardDescription>
        </CardHeader>
        <CardContent>
          {committees.length > 0 ? (
            <div className="space-y-4">
              {committees.map((committee) => (
                <div key={committee._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center">
                      <span className="font-medium">{committee.name}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{committee.members?.length || 0} members</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" asChild className="h-8 w-8">
                      <Link href={`/admin/dashboard/committees/${committee._id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(committee._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No committees found</p>
              <Button asChild className="mt-4  bg-blue-600:bg-blue-700">
                <Link href="/admin/dashboard/committees/new">Create your first committee</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
