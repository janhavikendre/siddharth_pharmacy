import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText } from "lucide-react"
import { headers } from "next/headers"

interface FileMetadata {
  type: string;
  section?: string;
}

interface FileDocument {
  _id: string;
  filename?: string;
  metadata: FileMetadata;
  uploadDate?: Date;
}

interface GovtResolution {
  id: string;
  name: string;
}

interface AdmissionContent {
  section?: string;
  process?: string;
  importantDates?: string;
  eligibility?: string;
  feeStructure?: string;
  scholarship?: string;
  cancellation?: string;
  brochureId?: string;
  admissionFormId?: string;
  scholarshipFileId?: string;
  admissionInfoId?: string;
  govtResolutions?: GovtResolution[];
}

interface ApiResponse {
  success: boolean;
  data: AdmissionContent;
  error?: string;
}

interface AdmissionData {
  content: AdmissionContent;
  files: FileDocument[];
}

async function getAdmissionContent(): Promise<AdmissionData> {
  try {
    const headersList = await headers()
    const host = headersList.get('host') || 'localhost:3000'
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'

    const response = await fetch(`${protocol}://${host}/api/content/admission`, {
      next: { revalidate: 0 },
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })

    const { success, data } = await response.json() as ApiResponse
    if (!success) throw new Error('Failed to fetch admission content')

    const admissionContent = data || {}
    const specificFiles: FileDocument[] = []
    
    if (admissionContent?.brochureId) {
      specificFiles.push({
        _id: admissionContent.brochureId,
        metadata: { type: "brochure" }
      });
    }
    
    if (admissionContent?.admissionFormId) {
      specificFiles.push({
        _id: admissionContent.admissionFormId,
        metadata: { type: "admission-form" }
      });
    }
    
    if (admissionContent?.scholarshipFileId) {
      specificFiles.push({
        _id: admissionContent.scholarshipFileId,
        metadata: { type: "scholarship" }
      });
    }
    
    if (admissionContent?.admissionInfoId) {
      specificFiles.push({
        _id: admissionContent.admissionInfoId,
        metadata: { type: "admission-info" }
      });
    }
    
    const governmentResolutions = admissionContent.govtResolutions ?? [];
    for (const resolution of governmentResolutions) {
      specificFiles.push({
        _id: resolution.id,
        filename: resolution.name,
        metadata: { type: "government-resolution" }
      });
    }

    return {
      content: admissionContent,
      files: specificFiles,
    }
  } catch (error) {
    console.error("Error fetching admission content:", error)
    return {
      content: {},
      files: [],
    }
  }
}

export default async function AdmissionPage() {
  const { content, files } = await getAdmissionContent()

  const brochureFile = files.find((f: FileDocument) => f.metadata.type === "brochure")
  const admissionFormFile = files.find((f: FileDocument) => f.metadata.type === "admission-form")
  const scholarshipFile = files.find((f: FileDocument) => f.metadata.type === "scholarship")
  const admissionInfoFile = files.find((f: FileDocument) => f.metadata.type === "admission-info")

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Admission Information</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Admission Process 2024-25</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content.process || "Admission process information coming soon..." }}
            />

            <div className="flex flex-wrap gap-4 mt-6">
              {brochureFile && (
                <Button asChild variant="outline" className="flex items-center">
                  <a href={`/api/files/${brochureFile._id}`} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Brochure
                  </a>
                </Button>
              )}

              {admissionFormFile && (
                <Button asChild className="bg-rose-600 hover:bg-rose-700 flex items-center">
                  <a href={`/api/files/${admissionFormFile._id}`} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Download Application Form
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Important Dates</h2>
            <ul className="space-y-3">
              {content.importantDates ? (
                <div dangerouslySetInnerHTML={{ __html: content.importantDates }} />
              ) : (
                <>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Application Start</span>
                    <span className="font-medium">June 1, 2024</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Application Deadline</span>
                    <span className="font-medium">July 15, 2024</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Entrance Exam</span>
                    <span className="font-medium">July 25, 2024</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Result Declaration</span>
                    <span className="font-medium">August 5, 2024</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Counseling Begins</span>
                    <span className="font-medium">August 10, 2024</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Classes Begin</span>
                    <span className="font-medium">August 25, 2024</span>
                  </li>
                </>
              )}
            </ul>

            <div className="mt-6 pt-4 border-t">
              <h3 className="font-semibold mb-2">Contact for Admission</h3>
              <p className="text-gray-700 mb-1">Phone: +91 9974469124, +91 8411888688</p>
              <p className="text-gray-700">Email: 523nationalinstitute@gmail.com</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="eligibility" className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="eligibility">Eligibility Criteria</TabsTrigger>
          <TabsTrigger value="fee-structure">Fee Structure</TabsTrigger>
          <TabsTrigger value="scholarship">Scholarship</TabsTrigger>
          <TabsTrigger value="cancellation">Cancellation Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="eligibility" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Eligibility Criteria</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
               
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {content.eligibility ? (
                      <tr>
                        <td colSpan={3} className="py-4 px-6">
                          <div dangerouslySetInnerHTML={{ __html: content.eligibility }} />
                        </td>
                      </tr>
                    ) : (
                      <>
                        <tr>
                          <td className="py-3 px-4 whitespace-nowrap">B.A. Fashion Design</td>
                          <td className="py-3 px-4">10+2 or equivalent from any recognized board</td>
                          <td className="py-3 px-4">Entrance exam and portfolio review</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 whitespace-nowrap">B.Design</td>
                          <td className="py-3 px-4">
                            10+2 or equivalent from any recognized board with minimum 50% marks
                          </td>
                          <td className="py-3 px-4">Entrance exam, portfolio review, and personal interview</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fee-structure" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Fee Structure</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                   
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {content.feeStructure ? (
                      <tr>
                        <td colSpan={5} className="py-4 px-6">
                          <div dangerouslySetInnerHTML={{ __html: content.feeStructure }} />
                        </td>
                      </tr>
                    ) : (
                      <>
                        <tr>
                          <td className="py-3 px-4" rowSpan={3}>
                            B.A. Fashion Design
                          </td>
                          <td className="py-3 px-4">General</td>
                          <td className="py-3 px-4">₹50,000</td>
                          <td className="py-3 px-4">₹10,000</td>
                          <td className="py-3 px-4">₹60,000</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">OBC</td>
                          <td className="py-3 px-4">₹45,000</td>
                          <td className="py-3 px-4">₹10,000</td>
                          <td className="py-3 px-4">₹55,000</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">SC/ST</td>
                          <td className="py-3 px-4">₹40,000</td>
                          <td className="py-3 px-4">₹10,000</td>
                          <td className="py-3 px-4">₹50,000</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4" rowSpan={3}>
                            B.Design
                          </td>
                          <td className="py-3 px-4">General</td>
                          <td className="py-3 px-4">₹60,000</td>
                          <td className="py-3 px-4">₹12,000</td>
                          <td className="py-3 px-4">₹72,000</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">OBC</td>
                          <td className="py-3 px-4">₹55,000</td>
                          <td className="py-3 px-4">₹12,000</td>
                          <td className="py-3 px-4">₹67,000</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">SC/ST</td>
                          <td className="py-3 px-4">₹50,000</td>
                          <td className="py-3 px-4">₹12,000</td>
                          <td className="py-3 px-4">₹62,000</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                * Other charges include examination fee, library fee, development fee, etc.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scholarship" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Scholarship Details</h2>

              <div
                className="prose max-w-none mb-6"
                dangerouslySetInnerHTML={{
                  __html:
                    content.scholarship ||
                    "The National Institute of Fashion Designing offers various scholarships to meritorious students and those from economically weaker sections. These scholarships are designed to support talented students in pursuing their education without financial constraints.",
                }}
              />

              {scholarshipFile && (
                <Button asChild className="bg-rose-600 hover:bg-rose-700">
                  <a href={`/api/files/${scholarshipFile._id}`} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Scholarship Details
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancellation" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Rules for Cancellation</h2>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    content.cancellation ||
                    `
                <p>The following rules apply for cancellation of admission and refund of fees:</p>
                <ol>
                  <li>Cancellation before the commencement of classes: 90% of the tuition fee will be refunded.</li>
                  <li>Cancellation within 15 days of the commencement of classes: 80% of the tuition fee will be refunded.</li>
                  <li>Cancellation after 15 days but within 30 days of the commencement of classes: 50% of the tuition fee will be refunded.</li>
                  <li>Cancellation after 30 days of the commencement of classes: No refund will be provided.</li>
                </ol>
                <p>Note: Registration fee and other charges are non-refundable under any circumstances.</p>
                <p>For cancellation, students must submit a written application to the admission office along with the original fee receipt.</p>
              `,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <section>
        <h2 className="text-2xl font-bold mb-6">Government Resolutions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.filter((f) => f.metadata.type === "government-resolution").length > 0 ? (
            files
              .filter((f) => f.metadata.type === "government-resolution")
              .map((file) => (
                <Card key={file._id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <FileText className="h-12 w-12 text-rose-600 mb-4" />
                    <h3 className="font-semibold mb-2">{file.filename}</h3>
                    <p className="text-sm text-gray-500 mb-4">{new Date(file.uploadDate).toLocaleDateString()}</p>
                    <Button asChild variant="outline" className="mt-auto">
                      <a href={`/api/files/${file._id}`} target="_blank" rel="noopener noreferrer">
                        View Document
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Government resolution documents will be uploaded soon.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
