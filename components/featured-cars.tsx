"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Car, Users, Fuel } from "lucide-react"
import { carData } from "@/data/car-data"
import { motion, AnimatePresence } from "framer-motion"

export default function FeaturedCars() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const featuredCars = carData.slice(0, 6)

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const container = containerRef.current
      const cardWidth = container.querySelector(".car-card")?.clientWidth || 0
      const gap = 32 // gap-8 = 2rem = 32px
      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      })
      setCurrentIndex(index)
    }
  }

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0)
    scrollToIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, featuredCars.length - 1)
    scrollToIndex(newIndex)
  }

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        scrollToIndex(currentIndex)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentIndex])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-8 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <AnimatePresence>
          {featuredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="car-card flex-shrink-0 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] overflow-hidden snap-start"
            >
              <motion.div
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card>
                  <div className="relative h-48">
                    <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-yellow-500 text-white">{car.type}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold">{car.name}</h3>
                        <p className="text-sm text-gray-500">{car.brand}</p>
                      </div>
                      <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} className="text-right">
                        <div className="text-lg font-bold text-red-600">Rp {car.price.toLocaleString("id-ID")}</div>
                        <p className="text-xs text-gray-500">per hari</p>
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="flex flex-col items-center text-center p-2 bg-gray-50 rounded-lg">
                        <Car className="h-4 w-4 text-gray-500 mb-1" />
                        <span className="text-xs">{car.transmission}</span>
                      </div>
                      <div className="flex flex-col items-center text-center p-2 bg-gray-50 rounded-lg">
                        <Users className="h-4 w-4 text-gray-500 mb-1" />
                        <span className="text-xs">{car.capacity} Orang</span>
                      </div>
                      <div className="flex flex-col items-center text-center p-2 bg-gray-50 rounded-lg">
                        <Fuel className="h-4 w-4 text-gray-500 mb-1" />
                        <span className="text-xs">{car.fuelType}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                      <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                        <Link href={`/cars/${car.id}`}>Lihat Detail</Link>
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 hidden md:block"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-md hover:bg-gray-100"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 hidden md:block"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-md hover:bg-gray-100"
          onClick={handleNext}
          disabled={currentIndex === featuredCars.length - 1}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </motion.div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
