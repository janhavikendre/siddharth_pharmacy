import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import clientPromise from "@/lib/mongodb"

async function getAnnouncements() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const announcements = await db.collection("announcements").find({}).sort({ createdAt: -1 }).toArray()

    return JSON.parse(JSON.stringify(announcements))
  } catch (error) {
    console.error("Error fetching announcements:", error)
    return []
  }
}

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-gray-500">Manage announcements displayed on the website</p>
        </div>
        <Button asChild className="bg-rose-600 hover:bg-rose-700">
          <Link href="/admin/dashboard/announcements/new">
            <Plus className="h-4 w-4 mr-2" /> Add Announcement
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
          <CardDescription>Announcements are displayed in the marquee on the home page</CardDescription>
        </CardHeader>
        <CardContent>
          {announcements && announcements.length > 0 ? (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center">
                      <span className="font-medium">{announcement.text}</span>
                      <span
                        className={`ml-3 px-2 py-1 text-xs rounded-full ${
                          announcement.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {announcement.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    {announcement.link && (
                      <a
                        href={announcement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {announcement.link}
                      </a>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      Created: {new Date(announcement.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" asChild className="h-8 w-8">
                      <Link href={`/admin/dashboard/announcements/${announcement._id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
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
              <p className="text-gray-500">No announcements found</p>
              <Button asChild className="mt-4 bg-rose-600 hover:bg-rose-700">
                <Link href="/admin/dashboard/announcements/new">Create your first announcement</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
