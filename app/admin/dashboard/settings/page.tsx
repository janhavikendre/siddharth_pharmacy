"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const [adminPassword, setAdminPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [contactEmail, setContactEmail] = useState("523nationalinstitute@gmail.com")
  const [contactPhone1, setContactPhone1] = useState("9974469124")
  const [contactPhone2, setContactPhone2] = useState("8411888688")
  const [workingHours, setWorkingHours] = useState("Mon-Sat: 9:00 AM - 5:00 PM")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Validate
      if (adminPassword !== "admin123") {
        throw new Error("Current password is incorrect")
      }

      if (newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters")
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      // In a real application, you would make an API call to update the password
      // For this simplified version, we'll just show a success message

      toast({
        title: "Success",
        description: "Password updated successfully. Please log in again with your new password.",
      })

      // Clear form
      setAdminPassword("")
      setNewPassword("")
      setConfirmPassword("")

      // Log out the user
      localStorage.removeItem("adminAuthenticated")
      router.push("/admin/login")
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

  const handleSaveContactInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Validate
      if (!contactEmail || !contactPhone1) {
        throw new Error("Email and primary phone are required")
      }

      // In a real application, you would make an API call to update the contact info
      // For this simplified version, we'll just show a success message

      toast({
        title: "Success",
        description: "Contact information updated successfully.",
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500">Manage your account and website settings</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="contact">Contact Information</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your admin password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <Button type="submit" className="bg-rose-600 hover:bg-rose-700 w-full" disabled={isSaving}>
                  {isSaving ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update contact information displayed on the website</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveContactInfo} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Contact email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone1">Primary Phone</Label>
                  <Input
                    id="contact-phone1"
                    value={contactPhone1}
                    onChange={(e) => setContactPhone1(e.target.value)}
                    placeholder="Primary phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone2">Secondary Phone (Optional)</Label>
                  <Input
                    id="contact-phone2"
                    value={contactPhone2}
                    onChange={(e) => setContactPhone2(e.target.value)}
                    placeholder="Secondary phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="working-hours">Working Hours</Label>
                  <Input
                    id="working-hours"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    placeholder="e.g., Mon-Sat: 9:00 AM - 5:00 PM"
                  />
                </div>

                <Button type="submit" className="bg-rose-600 hover:bg-rose-700" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Contact Information"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
