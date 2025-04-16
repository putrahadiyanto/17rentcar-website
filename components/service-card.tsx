"use client"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ChevronRight, Car, Map, Plane } from "lucide-react"
import { motion } from "framer-motion"

interface ServiceCardProps {
  title: string
  description: string
  icon: "Car" | "Map" | "Plane"
  link: string
}

export default function ServiceCard({ title, description, icon, link }: ServiceCardProps) {
  const IconComponent = () => {
    switch (icon) {
      case "Car":
        return <Car className="h-10 w-10 text-red-600" />
      case "Map":
        return <Map className="h-10 w-10 text-red-600" />
      case "Plane":
        return <Plane className="h-10 w-10 text-red-600" />
      default:
        return <Car className="h-10 w-10 text-red-600" />
    }
  }

  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="overflow-hidden h-full">
        <CardContent className="p-6">
          <motion.div className="mb-4" whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
            <IconComponent />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link href={link} className="text-red-600 hover:text-red-700 font-medium flex items-center">
              Selengkapnya <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
