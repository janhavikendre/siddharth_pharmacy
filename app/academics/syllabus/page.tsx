import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import clientPromise from "@/lib/mongodb"

async function getSyllabus() {
  try {
    const client = await clientPromise
    const db = client.db("fashion_institute")

    const syllabus = await db.collection("syllabus").find({}).sort({ createdAt: -1 }).toArray()
    return JSON.parse(JSON.stringify(syllabus))
  } catch (error) {
    console.error("Error fetching syllabus:", error)
    return []
  }
}

export default async function SyllabusPage() {
  const syllabusFiles = await getSyllabus()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Syllabus</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-rose-800">Program Syllabus</h2>
          <p className="text-gray-700 mb-6">
            Find detailed syllabus for all programs offered at the National Institute of Fashion Designing. These
            documents outline the course structure, subjects, credit distribution, and learning outcomes for each
            program.
          </p>
          <p className="text-gray-700">
            The syllabus is designed in consultation with industry experts and academic professionals to ensure that our
            curriculum remains current and aligned with industry requirements and best practices in fashion education.
          </p>
        </div>

        <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
          <img
            src="/image2.png"
            alt="Syllabus"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {syllabusFiles && syllabusFiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {syllabusFiles.map((file:any) => (
            <Card key={file._id} className="hover:shadow-lg transition-shadow border-rose-100">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <FileText className="h-12 w-12 text-rose-600 mb-4" />
                <h3 className="font-semibold mb-2 text-rose-800">{file.title}</h3>
                {file.program && <p className="text-sm text-gray-500 mb-4">{file.program}</p>}
                <p className="text-sm text-gray-500 mb-6">Added on {new Date(file.createdAt).toLocaleDateString()}</p>
                <Button asChild className="mt-auto bg-rose-600 hover:bg-rose-700">
                  <a href={`/api/files/${file.fileId}`} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" /> Download Syllabus
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No Syllabus Available</h3>
          <p className="text-gray-500">The syllabus documents will be uploaded soon. Please check back later.</p>
        </div>
      )}

      <div className="mt-12 bg-rose-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-rose-800">Need Help?</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about the syllabus or need additional information about our academic programs,
          please contact the Academic Office.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <span className="font-medium">Email:</span> academic@nifd.edu
          </div>
          <div>
            <span className="font-medium">Phone:</span> +91 9974469124
          </div>
        </div>
      </div>
    </div>
  )
}
