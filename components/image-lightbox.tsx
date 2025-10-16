"use client"

import Image from "next/image"
import { useEffect } from "react"
import { X } from "lucide-react"

interface ImageLightboxProps {
  src: string
  alt: string
  caption?: string
  onClose: () => void
}

export function ImageLightbox({ src, alt, caption, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={1920}
            height={1080}
            className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
            priority
          />
        </div>

        {caption && (
          <div className="mt-4 text-center">
            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl">{caption}</p>
          </div>
        )}
      </div>
    </div>
  )
}
