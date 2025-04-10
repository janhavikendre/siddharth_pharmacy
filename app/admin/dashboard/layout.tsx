"use client"

import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 pl-4 pr-8 py-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
