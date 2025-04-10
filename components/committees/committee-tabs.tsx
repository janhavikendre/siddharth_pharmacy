"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function CommitteeTabs({ committees }: { committees: any[] }) {
  const [activeCommittee, setActiveCommittee] = useState(committees[0]?.name || "Placement Cell")

  const currentCommittee = committees.find((committee) => committee.name === activeCommittee) || committees[0]

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-rose-200 bg-rose-50 hover:bg-rose-100">
              {activeCommittee}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            {committees.map((committee) => (
              <DropdownMenuItem key={committee.name} onClick={() => setActiveCommittee(committee.name)}>
                {committee.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="border-rose-100 hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-6 text-rose-800">{currentCommittee.name}</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-rose-50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-rose-800 uppercase tracking-wider border-b">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-rose-800 uppercase tracking-wider border-b">
                    Role
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-rose-800 uppercase tracking-wider border-b">
                    Department
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-rose-800 uppercase tracking-wider border-b">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentCommittee.members && currentCommittee.members.length > 0 ? (
                  currentCommittee.members.map((member: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-rose-50/30"}>
                      <td className="py-3 px-4 whitespace-nowrap">{member.name}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{member.role}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{member.department || "-"}</td>
                      <td className="py-3 px-4 whitespace-nowrap">{member.contact || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      Committee members information coming soon...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {currentCommittee.description && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-rose-700">About this Committee</h3>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentCommittee.description }} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
