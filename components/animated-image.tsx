"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

interface AnimatedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      className={`relative overflow-hidden ${fill ? "h-full w-full" : ""} ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.95,
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-full w-full"
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          className={`object-cover transition-all duration-700 ${isLoaded ? "blur-0" : "blur-sm"}`}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
        />
      </motion.div>
    </motion.div>
  )
}
