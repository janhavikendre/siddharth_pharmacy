"use client"

import { Card, CardContent } from "@/components/ui/card"

interface CommitteeTabsProps {
  committees: any[]
  section: string
}

export function CommitteeTabs({ committees, section }: CommitteeTabsProps) {
  // Normalize section for matching (case-insensitive, ignore spaces/dashes)
  const normalize = (str: string) =>
    str.toLowerCase().replace(/[\s\-]/g, "")

  const selectedCommittee =
    committees.find(
      (c) => normalize(c.name) === normalize(section)
    ) || committees[0]

  return (
    <div className="space-y-6">
      <Card className="border-rose-100 hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">{selectedCommittee.name}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-blue-50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                    Role
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                    Department
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedCommittee.members && selectedCommittee.members.length > 0 ? (
                  selectedCommittee.members.map((member: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-blue-50/30"}>
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
          {selectedCommittee.description && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-700">About this Committee</h3>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedCommittee.description }} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
