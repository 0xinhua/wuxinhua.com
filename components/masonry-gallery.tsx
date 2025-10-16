"use client"

import Image from "next/image"
import { useState } from "react"
import { ImageLightbox } from "./image-lightbox"

interface Photo {
  id: number
  src: string
  alt: string
  aspectRatio: number
  caption?: string // Added caption field
}

interface MasonryGalleryProps {
  photos: Photo[]
}

export function MasonryGallery({ photos }: MasonryGalleryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id))
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="break-inside-avoid mb-4 cursor-pointer group transition-all duration-300"
            style={{
              opacity: loadedImages.has(photo.id) ? 1 : 0.5,
            }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative overflow-hidden bg-muted">
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                width={400}
                height={400 * photo.aspectRatio}
                className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-110 rounded-[2px]"
                onLoad={() => handleImageLoad(photo.id)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <span className="block text-center text-xs text-muted-foreground mt-2">
              {photo.alt}
            </span>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <ImageLightbox
          src={selectedPhoto.src || "/placeholder.svg"}
          alt={selectedPhoto.alt}
          caption={selectedPhoto.caption}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  )
}
