"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface AboutTabsProps {
  about: {
    institute: string
    society?: string
    vision?: string
    mission?: string
  }
  directors?: any[]
  leadership?: any[]
  section: "institute" | "society" | "vision" | "directors" | "leadership"
}

export function AboutTabs({ about, directors, leadership, section }: AboutTabsProps) {
  if (section === "institute") {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Siddharth Institute of Pharmacy</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: about.institute || "Content coming soon..." }}
            />
          </div>
        </div>
      </div>
    )
  }
  if (section === "society") {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-800">About Our Society</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: about.society || "Content coming soon..." }}
            />
          </div>
        </div>
      </div>
    )
  }
  if (section === "vision") {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border-rose-100">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Our Vision</h3>
            <p className="text-gray-700">
              {about.vision ||
                "To be a premier institute for fashion design education, fostering creativity, innovation, and excellence in the fashion industry."}
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow border-rose-100">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Our Mission</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {about.mission ? (
                <div dangerouslySetInnerHTML={{ __html: about.mission }} />
              ) : (
                <>
                  <li>Provide quality education in fashion design with industry-relevant curriculum</li>
                  <li>Foster creativity and innovation through hands-on practical training</li>
                  <li>Develop professional skills and ethical values in students</li>
                  <li>Establish strong industry connections for better placement opportunities</li>
                  <li>Promote research and development in the field of fashion design</li>
                </>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    )
  }
  if (section === "directors") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {directors && directors.length > 0 ? (
          directors.map((director) => (
            <Card key={director._id} className="overflow-hidden hover:shadow-lg transition-shadow border-rose-100">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-rose-200">
                    <Image
                      src={
                        director.imageId
                          ? `/api/files/${director.imageId}`
                          : "/placeholder.svg?height=128&width=128"
                      }
                      alt={director.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-blue-800">{director.name}</h3>
                  <p className="text-blue-600">{director.role}</p>
                  {director.qualification && <p className="text-sm text-gray-500 mt-1">{director.qualification}</p>}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No directors found.</p>
        )}
      </div>
    )
  }
  if (section === "leadership") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Messages from Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadership && leadership.length > 0 ? (
            leadership.map((leader) => (
              <Card key={leader._id} className="overflow-hidden hover:shadow-lg transition-shadow border-blue-100">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center p-6 bg-gradient-to-b from-blue-50 to-white">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-200">
                      <Image
                        src={leader.imageId ? `/api/files/${leader.imageId}` : "/placeholder-user.jpg"}
                        alt={leader.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-blue-800">{leader.role}'s Message</h3>
                    <p className="text-sm text-gray-500">{leader.name}</p>
                  </div>
                  <div
                    className="prose max-w-none text-sm p-6"
                    dangerouslySetInnerHTML={{ __html: leader.message || "Message coming soon..." }}
                  />
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-gray-500">Message coming soon...</div>
          )}
        </div>
      </div>
    )
  }
  return null
}
