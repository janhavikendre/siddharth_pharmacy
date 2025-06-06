"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Users,
  Building,
  BookOpen,
  Settings,
  Library,
  ChevronDown,
  Home,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AdminSidebar() {
  const pathname = usePathname()
  const [openSubmenus, setOpenSubmenus] = useState({
    academics: false,
    content: false,
  })

  const toggleSubmenu = (submenu: 'academics' | 'content') => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [submenu]: !prev[submenu],
    }))
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-gray-200 h-screen" variant="sidebar" collapsible="none">
        <SidebarHeader className="border-b border-gray-200 py-3">
          <div className="flex items-center px-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full  bg-blue-600flex items-center justify-center text-white font-bold">
                F
              </div>
              <span className="font-bold text-lg">Admin Panel</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"}>
                <Link href="/admin/dashboard">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => toggleSubmenu("academics")} className="justify-between">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5" />
                  <span>Academics</span>
                </div>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", openSubmenus.academics ? "rotate-180" : "")}
                />
              </SidebarMenuButton>

              {openSubmenus.academics && (
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/admin/dashboard/academics/admissions"}>
                      <Link href="/admin/dashboard/academics/admissions">Admissions</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/admin/dashboard/academics/syllabus"}>
                      <Link href="/admin/dashboard/academics/syllabus">Syllabus</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/admin/dashboard/academics/calendar"}>
                      <Link href="/admin/dashboard/academics/calendar">Academic Calendar</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/admin/dashboard/academics/exams"}>
                      <Link href="/admin/dashboard/academics/exams">Exams</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.includes("/admin/dashboard/announcements")}>
                <Link href="/admin/dashboard/announcements">
                  <FileText className="h-5 w-5" />
                  <span>Announcements</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.includes("/admin/dashboard/Banners")}>
                <Link href="/admin/dashboard/Banners">
                  <ImageIcon className="h-5 w-5" />
                  <span>Banners</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.includes("/admin/dashboard/faculty")}>
                <Link href="/admin/dashboard/faculty">
                  <Users className="h-5 w-5" />
                  <span>Faculty</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.includes("/admin/dashboard/committees")}>
                <Link href="/admin/dashboard/committees">
                  <Users className="h-5 w-5" />
                  <span>Committees</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.includes("/admin/dashboard/facilities")}>
                <Link href="/admin/dashboard/facilities">
                  <Building className="h-5 w-5" />
                  <span>Facilities</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.includes("/admin/dashboard/gallery")}>
                <Link href="/admin/dashboard/gallery">
                  <ImageIcon className="h-5 w-5" />
                  <span>Gallery</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.includes("/admin/dashboard/library")}>
                <Link href="/admin/dashboard/library">
                  <Library className="h-5 w-5" />
                  <span>Library</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => toggleSubmenu("content")} className="justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5" />
                  <span>Content</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform", openSubmenus.content ? "rotate-180" : "")} />
              </SidebarMenuButton>

              {openSubmenus.content && (
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                   
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/admin/dashboard/content/about"}>
                      <Link href="/admin/dashboard/content/about">
                        <FileText className="h-4 w-4 mr-2" />
                        About Us
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild isActive={pathname === "/admin/dashboard/content/leadership"}>
                      <Link href="/admin/dashboard/content/leadership">
                        <User className="h-4 w-4 mr-2" />
                        Leadership
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>

          
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t border-gray-200 p-4">
          <div className="flex flex-col gap-4">
            <Button asChild variant="outline" size="sm" className="justify-start">
              <Link href="/" target="_blank">
                <Home className="h-4 w-4 mr-2" />
                View Website
              </Link>
            </Button>
            <Button asChild variant="destructive" size="sm" className="justify-start">
              <Link href="/api/auth/signout">
                <span>Sign Out</span>
              </Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

export default AdminSidebar
