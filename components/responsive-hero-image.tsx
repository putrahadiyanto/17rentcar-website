"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ResponsiveHeroImageProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
}

export default function ResponsiveHeroImage({ src, alt, priority = true, className = "" }: ResponsiveHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    // Update viewport height on mount and resize
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight)
    }

    updateViewportHeight()
    window.addEventListener("resize", updateViewportHeight)

    return () => {
      window.removeEventListener("resize", updateViewportHeight)
    }
  }, [])

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0"
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
          onLoad={() => setIsLoaded(true)}
          style={{
            objectPosition: "center center",
          }}
        />
      </motion.div>

      {/* Loading placeholder */}
      {!isLoaded && <div className="absolute inset-0 bg-gray-900 animate-pulse" />}
    </div>
  )
}
