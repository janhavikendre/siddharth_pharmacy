"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Book, FileText, Download } from "lucide-react"

interface ResourceItem {
  title: string
  [key: string]: any
}

interface ResourceCategory {
  category: string
  title: string
  items: ResourceItem[]
}

interface LibraryTabsProps {
  resources: {
    books: ResourceCategory[]
    journals: ResourceCategory[]
    digital: ResourceCategory[]
    archives: ResourceCategory[]
  }
  category: "books" | "journals" | "digital" | "archives"
}

export function LibraryTabs({ resources, category }: LibraryTabsProps) {
  // Default resources if none are found in the database
  const defaultResources = {
    books: [
      {
        category: "books",
        title: "Fashion Design Books",
        items: [
          { title: "The Fashion Designer's Handbook", author: "Marjorie Galen", year: "2020" },
          { title: "Pattern Making for Fashion Design", author: "Helen Joseph-Armstrong", year: "2019" },
          { title: "Fashion: The Definitive History of Costume and Style", author: "DK Publishing", year: "2018" },
          { title: "The Fashion Book", author: "Phaidon Editors", year: "2020" },
          { title: "Draping for Apparel Design", author: "Helen Joseph-Armstrong", year: "2019" },
        ],
      },
    ],
    journals: [
      {
        category: "journals",
        title: "Fashion Journals & Magazines",
        items: [
          { title: "Vogue", publisher: "Condé Nast", frequency: "Monthly" },
          { title: "Harper's Bazaar", publisher: "Hearst Communications", frequency: "Monthly" },
          { title: "Elle", publisher: "Lagardère Group", frequency: "Monthly" },
          { title: "International Journal of Fashion Design", publisher: "Taylor & Francis", frequency: "Quarterly" },
          { title: "Fashion Theory", publisher: "Bloomsbury Publishing", frequency: "Quarterly" },
        ],
      },
    ],
    digital: [
      {
        category: "digital",
        title: "Digital Resources",
        items: [
          { title: "WGSN Trend Forecasting", type: "Database", access: "Subscription" },
          { title: "Bloomsbury Fashion Central", type: "E-books & Articles", access: "Subscription" },
          { title: "Vogue Archive", type: "Digital Archive", access: "Subscription" },
          { title: "Business of Fashion", type: "Industry News", access: "Free/Premium" },
          { title: "Fashion Design Software Tutorials", type: "Video Tutorials", access: "Free" },
        ],
      },
    ],
    archives: [
      {
        category: "archives",
        title: "Fashion Archives",
        items: [
          { title: "Historical Pattern Collection", period: "1950s-2000s", items: "500+" },
          { title: "Textile Samples", types: "Natural & Synthetic", items: "1000+" },
          { title: "Fashion Illustration Archive", period: "1920s-Present", items: "300+" },
          { title: "Fashion Show Recordings", period: "1990s-Present", items: "100+" },
          { title: "Designer Portfolios", type: "Alumni Work", items: "200+" },
        ],
      },
    ],
  }

  const currentResources =
    resources[category]?.length > 0
      ? resources[category]
      : defaultResources[category]

  return (
    <div className="space-y-8">
      {currentResources.map((resource: ResourceCategory) => (
        <Card key={resource.title} className="border-rose-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-800">{resource.title}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-blue-50">
                    {resource.category === "books" && (
                      <>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Title
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Author
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Year
                        </th>
                      </>
                    )}
                    {resource.category === "journals" && (
                      <>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Title
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Publisher
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Frequency
                        </th>
                      </>
                    )}
                    {resource.category === "digital" && (
                      <>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Title
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Type
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Access
                        </th>
                      </>
                    )}
                    {resource.category === "archives" && (
                      <>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Title
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Period/Type
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider border-b">
                          Items
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {resource.items &&
                    resource.items.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-blue-50/30"}>
                        <td className="py-3 px-4 whitespace-nowrap">{item.title}</td>
                        {resource.category === "books" && (
                          <>
                            <td className="py-3 px-4 whitespace-nowrap">{item.author}</td>
                            <td className="py-3 px-4 whitespace-nowrap">{item.year}</td>
                          </>
                        )}
                        {resource.category === "journals" && (
                          <>
                            <td className="py-3 px-4 whitespace-nowrap">{item.publisher}</td>
                            <td className="py-3 px-4 whitespace-nowrap">{item.frequency}</td>
                          </>
                        )}
                        {resource.category === "digital" && (
                          <>
                            <td className="py-3 px-4 whitespace-nowrap">{item.type}</td>
                            <td className="py-3 px-4 whitespace-nowrap">{item.access}</td>
                          </>
                        )}
                        {resource.category === "archives" && (
                          <>
                            <td className="py-3 px-4 whitespace-nowrap">{item.period || item.types}</td>
                            <td className="py-3 px-4 whitespace-nowrap">{item.items}</td>
                          </>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Library Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-rose-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-blue-100 p-3 rounded-full mb-4">
                <Book className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2 text-blue-800">Reference Services</h3>
              <p className="text-gray-700">
                Our librarians provide assistance with research, citation, and finding relevant resources for your
                projects and assignments.
              </p>
            </CardContent>
          </Card>
          <Card className="border-rose-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-blue-100 p-3 rounded-full mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2 text-blue-800">Printing & Scanning</h3>
              <p className="text-gray-700">
                Print, scan, and photocopy services are available in the library for academic and project-related
                materials.
              </p>
            </CardContent>
          </Card>
          <Card className="border-rose-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-blue-100 p-3 rounded-full mb-4">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2 text-blue-800">Digital Resource Access</h3>
              <p className="text-gray-700">
                Access to online databases, e-journals, and digital archives is available both on-campus and remotely
                for registered students.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
