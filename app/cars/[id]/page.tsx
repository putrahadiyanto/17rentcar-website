"use client"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { carData } from "@/data/car-data"
import Image from "next/image"
import { notFound, useParams } from "next/navigation"
import { Check, Star } from "lucide-react"
import WhatsAppBookButton from "@/components/whatsapp-book-button"
import { motion } from "framer-motion"
import PageTransition from "@/components/page-transition"
import { useEffect, useState } from "react"
import AnimatedSection from "@/components/animated-section"
import PageLoading from "@/components/page-loading"
import { CarStructuredData } from "@/components/structured-data"
import Head from "next/head"

export default function CarDetailPage() {
  const params = useParams()
  const [car, setCar] = useState<(typeof carData)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setIsLoading(true)
    setTimeout(() => {
      const foundCar = carData.find((car) => car.id === params.id)
      setCar(foundCar || null)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  if (isLoading) {
    return <PageLoading />
  }

  if (!car) {
    notFound()
  }

  return (
    <PageTransition>
      <Head>
        <title>{`${car.name} - Rental Mobil Bandung | 17Rentcar`}</title>
        <meta
          name="description"
          content={`Sewa ${car.name} di Bandung dengan harga terjangkau. ${car.shortDescription}. Tersedia dengan sopir dan BBM.`}
        />
        <meta
          name="keywords"
          content={`sewa ${car.name.toLowerCase()}, rental ${car.name.toLowerCase()}, ${car.brand.toLowerCase()}, rental mobil bandung, sewa mobil bandung, 17rentcar`}
        />
      </Head>

      {car && (
        <CarStructuredData
          name={car.name}
          description={car.description}
          image={car.image}
          brand={car.brand}
          model={car.name}
          fuelType={car.fuelType}
          seatingCapacity={car.capacity}
          price={car.price}
          url={`https://17rentcar-bandung.com/cars/${car.id}`}
        />
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-lg"
          >
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }} className="h-full w-full">
              <Image
                src={car.image || "/placeholder.svg"}
                alt={`Rental Mobil ${car.name} di Bandung - 17Rentcar`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < car.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-white text-sm">{car.reviewCount} ulasan</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <div className="flex items-center mb-2">
              <Badge className="bg-yellow-500 text-white mr-2">{car.type}</Badge>
              <Badge className="bg-gray-200 text-gray-800">{car.brand}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{car.name}</h1>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-red-600 mb-1">
                Rp {car.price.toLocaleString("id-ID")} <span className="text-sm font-normal text-gray-600">/ hari</span>
              </h2>
              <p className="text-gray-600">Harga sudah termasuk driver dan BBM (dalam kota)</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-1 h-6 bg-red-600 rounded-full mr-2"></span>
                Fitur Utama
              </h3>
              <div className="grid grid-cols-2 gap-y-3">
                {car.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                      <Check className="h-4 w-4 text-red-600" />
                    </div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <WhatsAppBookButton car={car} />

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <span className="w-1 h-6 bg-red-600 rounded-full mr-2"></span>
                Deskripsi
              </h3>
              <p className="text-gray-600">{car.description}</p>
            </div>
          </motion.div>
        </div>

        <AnimatedSection className="mt-16" delay={0.3}>
          <Tabs defaultValue="specs">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="specs">Spesifikasi</TabsTrigger>
              <TabsTrigger value="terms">Syarat & Ketentuan</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="mt-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-1 h-6 bg-red-600 rounded-full mr-2"></span>
                  Spesifikasi Kendaraan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Merek</span>
                      <span className="font-medium">{car.brand}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Model</span>
                      <span className="font-medium">{car.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Tahun</span>
                      <span className="font-medium">{car.year}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Transmisi</span>
                      <span className="font-medium">{car.transmission}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Kapasitas</span>
                      <span className="font-medium">{car.capacity} orang</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Bahan Bakar</span>
                      <span className="font-medium">{car.fuelType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Warna</span>
                      <span className="font-medium">{car.color}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">AC</span>
                      <span className="font-medium">Ya</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="terms" className="mt-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-1 h-6 bg-red-600 rounded-full mr-2"></span>
                  Syarat & Ketentuan
                </h3>
                <ul className="list-none pl-0 space-y-3 text-gray-600">
                  {[
                    "Pemesanan minimal 1 hari sebelum tanggal penggunaan",
                    "Pembayaran DP 30% untuk konfirmasi pemesanan",
                    "Pelunasan dilakukan saat pengambilan kendaraan",
                    "Wajib menyerahkan KTP dan SIM yang masih berlaku",
                    "Overtime dikenakan biaya tambahan sebesar 10% dari harga sewa per jam",
                    "Biaya tol, parkir, dan penginapan driver ditanggung penyewa",
                    "Pembatalan pemesanan kurang dari 24 jam dikenakan biaya 50% dari total sewa",
                    "Kerusakan akibat kelalaian penyewa menjadi tanggung jawab penyewa",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-red-600" />
                      </div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-1 h-6 bg-red-600 rounded-full mr-2"></span>
                  Ulasan Pelanggan
                </h3>
                <div className="space-y-6">
                  {car.reviews.map((review, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all hover:shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3 text-red-600 font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 pl-13">{review.comment}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
