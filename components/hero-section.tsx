import type React from "react"
import ResponsiveHeroImage from "@/components/responsive-hero-image"

interface HeroSectionProps {
  title: string
  subtitle: string
  imageSrc: string
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, imageSrc }) => {
  return (
    <div className="relative h-screen flex items-center justify-center text-white">
      <ResponsiveHeroImage
        src={imageSrc}
        alt={title}
        priority
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl">{subtitle}</p>
      </div>
    </div>
  )
}

export default HeroSection
