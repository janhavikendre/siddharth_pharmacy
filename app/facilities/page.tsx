import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import clientPromise from "@/lib/mongodb"

async function getFacilities() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const facilities = await db.collection("facilities").find({}).sort({ order: 1 }).toArray()
    return facilities || []
  } catch (error) {
    console.error("Error fetching facilities:", error)
    return []
  }
}

function SectionHero({ title, bgImage }: { title: string; bgImage?: string }) {
  return (
    <div className="relative w-full h-40 md:h-56 flex items-center justify-center">
      {bgImage && (
        <Image
          src={bgImage}
          alt={title}
          fill
          className="object-cover"
          style={{ zIndex: 0 }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-green-400/80" style={{ zIndex: 1 }} />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl md:text-4xl font-bold text-white text-center drop-shadow-lg py-8">
          {title}
        </h1>
      </div>
      <svg className="absolute bottom-0 left-0 w-full" height="32" viewBox="0 0 100 10" preserveAspectRatio="none" style={{ zIndex: 2 }}>
        <polygon points="0,10 100,0 100,10" fill="white" />
      </svg>
    </div>
  )
}

export default async function FacilitiesPage() {
  const facilities = await getFacilities()

  // Use database facilities if available
  const allFacilities = facilities.length > 0 ? facilities : []

  return (
    <>
      <SectionHero title="Our Facilities" bgImage="/about.avif" />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-12 text-blue-800">Our Facilities</h1>

        {allFacilities.length > 0 ? (
          <Tabs defaultValue={allFacilities[0]?.id} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8 bg-blue-50">
              {allFacilities.map((facility) => (
                <TabsTrigger 
                  key={facility.id} 
                  value={facility.id}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  {facility.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {allFacilities.map((facility) => (
              <TabsContent key={facility.id} value={facility.id} className="mt-6">
                <Card className="border-blue-100 shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="relative h-[300px] rounded-lg overflow-hidden">
                        <Image
                          src={facility.images?.[0] || "/placeholder.svg?height=300&width=500"}
                          alt={facility.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-4 text-blue-800">{facility.name}</h2>
                        <div className="prose max-w-none text-gray-700">
                          {typeof facility.description === "string" ? (
                            <p>{facility.description}</p>
                          ) : (
                            <div dangerouslySetInnerHTML={{ __html: facility.description || "" }} />
                          )}
                        </div>

                        {facility.features && facility.features.length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2 text-blue-700">Features:</h3>
                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                              {facility.features.map((feature:any, index:any) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {facility.images && facility.images.length > 1 && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4 text-blue-700">More Images</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {facility.images.slice(1).map((image:any, index:any) => (
                            <div key={index} className="relative h-40 rounded-lg overflow-hidden border border-blue-100">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`${facility.name} image ${index + 2}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-16">
            <Card className="max-w-md mx-auto border-blue-100 shadow-lg">
              <CardContent className="p-8">
                <div className="text-blue-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">Facilities Coming Soon</h3>
                <p className="text-gray-600">We are currently adding our facilities information. Please check back soon for updates on our state-of-the-art pharmacy laboratories and learning spaces.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
