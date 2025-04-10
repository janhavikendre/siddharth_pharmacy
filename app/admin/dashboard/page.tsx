"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Image, MessageSquare, Calendar, BookOpen } from "lucide-react"

export default function AdminDashboardPage() {
  const [adminName, setAdminName] = useState("Admin")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {adminName}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">Active announcements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Faculty & Staff</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">Total members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Gallery</CardTitle>
            <Image className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-gray-500">Images uploaded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-gray-500">PDFs uploaded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Academic Calendar</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">Upcoming events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-gray-500">Active programs</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
                <p className="text-sm">Content updated: About Us page</p>
                <span className="ml-auto text-xs text-gray-500">2h ago</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
                <p className="text-sm">New announcement added</p>
                <span className="ml-auto text-xs text-gray-500">5h ago</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
                <p className="text-sm">Gallery updated: 5 new images</p>
                <span className="ml-auto text-xs text-gray-500">Yesterday</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
                <p className="text-sm">New faculty member added</p>
                <span className="ml-auto text-xs text-gray-500">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/admin/dashboard/announcements/new"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MessageSquare className="h-6 w-6 text-rose-500 mb-2" />
                <span className="text-sm text-center">Add Announcement</span>
              </a>
              <a
                href="/admin/dashboard/gallery/upload"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Image className="h-6 w-6 text-rose-500 mb-2" />
                <span className="text-sm text-center">Upload Images</span>
              </a>
              <a
                href="/admin/dashboard/academics/admissions"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FileText className="h-6 w-6 text-rose-500 mb-2" />
                <span className="text-sm text-center">Update Admissions</span>
              </a>
              <a
                href="/admin/dashboard/faculty/new"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="h-6 w-6 text-rose-500 mb-2" />
                <span className="text-sm text-center">Add Faculty</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
