"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function FacultyTabs({ teaching, nonTeaching }: { teaching: any[]; nonTeaching: any[] }) {
  const [activeTab, setActiveTab] = useState("teaching")

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-rose-200 bg-rose-50 hover:bg-rose-100">
              {activeTab === "teaching" ? "Teaching Staff" : "Non-Teaching Staff"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            <DropdownMenuItem onClick={() => setActiveTab("teaching")}>Teaching Staff</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("nonTeaching")}>Non-Teaching Staff</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "teaching" ? (
            teaching && teaching.length > 0 ? (
              teaching.map((member) => (
                <Card key={member._id} className="overflow-hidden hover:shadow-lg transition-shadow border-rose-100">
                  <CardContent className="p-0">
                    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-rose-50 to-white">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-rose-200">
                        <Image
                          src={
                            member.imageId ? `/api/files/${member.imageId}` : "/placeholder.svg?height=128&width=128"
                          }
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-center text-rose-800">{member.name}</h3>
                      <p className="text-rose-600 text-center">{member.designation}</p>
                      {member.department && <p className="text-gray-600 text-center">{member.department}</p>}
                      {member.qualification && (
                        <p className="text-sm text-gray-500 text-center mt-1">{member.qualification}</p>
                      )}
                    </div>

                    {(member.experience || member.specialization) && (
                      <div className="p-4 border-t border-rose-100">
                        {member.experience && (
                          <div className="mb-2">
                            <span className="font-medium text-rose-700">Experience:</span> {member.experience}
                          </div>
                        )}
                        {member.specialization && (
                          <div>
                            <span className="font-medium text-rose-700">Specialization:</span> {member.specialization}
                          </div>
                        )}
                      </div>
                    )}

                    {member.email && (
                      <div className="p-4 text-center border-t border-rose-100">
                        <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                          {member.email}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No teaching faculty members found.</p>
              </div>
            )
          ) : nonTeaching && nonTeaching.length > 0 ? (
            nonTeaching.map((member) => (
              <Card key={member._id} className="overflow-hidden hover:shadow-lg transition-shadow border-rose-100">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center p-6 bg-gradient-to-b from-rose-50 to-white">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-rose-200">
                      <Image
                        src={member.imageId ? `/api/files/${member.imageId}` : "/placeholder.svg?height=128&width=128"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center text-rose-800">{member.name}</h3>
                    <p className="text-rose-600 text-center">{member.designation}</p>
                    {member.department && <p className="text-gray-600 text-center">{member.department}</p>}
                  </div>

                  {member.email && (
                    <div className="p-4 text-center border-t border-rose-100">
                      <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                        {member.email}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No non-teaching staff members found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
