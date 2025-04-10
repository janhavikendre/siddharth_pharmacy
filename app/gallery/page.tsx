import { GalleryContent } from "@/components/gallery/gallery-content"

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Gallery</h1>
      <GalleryContent />
    </div>
  )
}
