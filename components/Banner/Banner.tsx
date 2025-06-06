"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Banner {
  _id: string
  title: string
  description?: string
  link?: string
  imagePath: string
  isActive: boolean
}

interface BannerProps {
  banners: Banner[]
}

export default function Banner({ banners }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [banners.length])

  if (!banners || banners.length === 0) {
    return null
  }

  const activeBanners = banners.filter((banner) => banner.isActive)

  if (activeBanners.length === 0) {
    return null
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? activeBanners.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activeBanners.length)
  }

  const currentBanner = activeBanners[currentIndex]

  return (
    <div className="w-full flex justify-center py-8 bg-gray-50">
      <div className="w-[75%] max-w-6xl relative">
        <div className="relative">
          {/* Main Banner Image - Show as is */}
          <Image
            src={currentBanner.imagePath}
            alt={currentBanner.title}
            width={0}
            height={0}
            sizes="75vw"
            style={{ width: '100%', height: 'auto' }}
            priority
          />
          
          {/* Optional overlay and content only if title/description exists */}
          {(currentBanner.title || currentBanner.description) && (
            <>
              <div className="absolute inset-0 bg-black bg-opacity-30" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="max-w-2xl">
                  {currentBanner.title && (
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">
                      {currentBanner.title}
                    </h2>
                  )}
                  {currentBanner.description && (
                    <p className="text-sm md:text-lg mb-4">
                      {currentBanner.description}
                    </p>
                  )}
                  {currentBanner.link && (
                    <Button
                      asChild
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <a
                        href={currentBanner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn More
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Navigation Arrows (only show if more than 1 banner) */}
          {activeBanners.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-none z-10"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-none z-10"
                onClick={goToNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Dots Indicator (only show if more than 1 banner) */}
          {activeBanners.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {activeBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Banner Count */}
        {activeBanners.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
            {currentIndex + 1} / {activeBanners.length}
          </div>
        )}
      </div>
    </div>
  )
}
