"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Car, Users, Fuel } from "lucide-react"
import type { CarType } from "@/types/car"
import { motion } from "framer-motion"
import { useState } from "react"
import { Pagination } from "@/components/ui/pagination"

interface CarListProps {
  cars: CarType[]
}

export function CarList({ cars }: CarListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const carsPerPage = 6

  // Calculate pagination
  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar)
  const totalPages = Math.ceil(cars.length / carsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top of car list
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div>
      {cars.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Tidak ada mobil yang ditemukan</h3>
          <p className="text-gray-600">Silakan coba filter atau pencarian lain</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {currentCars.map((car) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="h-full"
              >
                <Card className="overflow-hidden h-full flex flex-col border-transparent hover:border-red-200 transition-colors duration-300">
                  <div className="relative h-40 sm:h-48 overflow-hidden group">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-yellow-500 text-white">{car.type}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2 pt-3 px-3 sm:px-4 sm:pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold line-clamp-1">{car.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500">{car.brand}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-base sm:text-lg font-bold text-red-600">
                          Rp {car.price.toLocaleString("id-ID")}
                        </div>
                        <p className="text-xs text-gray-500">per hari</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3 px-3 sm:px-4 flex-grow">
                    <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3">
                      <div className="flex flex-col items-center text-center p-1 sm:p-2 bg-gray-50 rounded-lg">
                        <Car className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mb-1" />
                        <span className="text-xs">
                          {Array.isArray(car.transmission)
                            ? car.transmission.length === 2
                              ? "AT/MT"
                              : car.transmission[0]
                            : typeof car.transmission === 'string' && car.transmission.startsWith('[')
                              ? (JSON.parse(car.transmission).length === 2 ? "AT/MT" : JSON.parse(car.transmission)[0])
                              : car.transmission}
                        </span>
                      </div>
                      <div className="flex flex-col items-center text-center p-1 sm:p-2 bg-gray-50 rounded-lg">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mb-1" />
                        <span className="text-xs">{car.capacity} Orang</span>
                      </div>
                      <div className="flex flex-col items-center text-center p-1 sm:p-2 bg-gray-50 rounded-lg">
                        <Fuel className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mb-1" />
                        <span className="text-xs">{car.fuelType}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{car.shortDescription}</p>
                  </CardContent>
                  <CardFooter className="p-3 sm:p-4 pt-0 mt-auto">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                      <Button
                        asChild
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-sm relative overflow-hidden group"
                      >
                        <Link href={`/cars/${car.id}`}>
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 to-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                          <span className="relative z-10">Lihat Detail</span>
                        </Link>
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </>
      )}
    </div>
  )
}
