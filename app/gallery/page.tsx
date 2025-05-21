import Image from "next/image"
import { GalleryContent } from "@/components/gallery/gallery-content"

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

export default function GalleryPage({ searchParams }: { searchParams: { category?: string } }) {
  return (
    <>
      <SectionHero title="Gallery" bgImage="/about.avif" />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-12">Gallery</h1>
        <GalleryContent selectedCategory={searchParams.category} />
      </div>
    </>
  )
}
