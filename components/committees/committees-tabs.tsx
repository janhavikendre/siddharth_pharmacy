"use client"

interface CommitteesTabsProps {
  committees: {
    [key: string]: {
      title: string
      content: string
    }
  }
  section: string // e.g., "antiragging", "womencell", etc.
}

export function CommitteesTabs({ committees, section }: CommitteesTabsProps) {
  const committee = committees[section]
  if (!committee) {
    return (
      <div className="text-center text-gray-500 py-10">
        Committee information not found.
      </div>
    )
  }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">{committee.title}</h2>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: committee.content || "Content coming soon..." }}
      />
    </div>
  )
}
