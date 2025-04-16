"use client"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { tourPackages } from "@/data/tour-packages"
import Image from "next/image"
import { notFound, useParams } from "next/navigation"
import { Calendar, Clock, MapPin, Check, X } from "lucide-react"
import WhatsAppTourButton from "@/components/whatsapp-tour-button"
import { motion } from "framer-motion"
import PageTransition from "@/components/page-transition"
import { useEffect, useState } from "react"
import PageLoading from "@/components/page-loading"

export default function TourPackageDetailPage() {
  const params = useParams()
  const [tourPackage, setTourPackage] = useState<(typeof tourPackages)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setIsLoading(true)
    setTimeout(() => {
      const foundPackage = tourPackages.find((pkg) => pkg.id === params.id)
      setTourPackage(foundPackage || null)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  if (isLoading) {
    return <PageLoading />
  }

  if (!tourPackage) {
    notFound()
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image src={tourPackage.image || "/placeholder.svg"} alt={tourPackage.name} fill className="object-cover" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center mb-2">
              <Badge className="bg-yellow-500 text-white mr-2">{tourPackage.duration}</Badge>
              <Badge className="bg-gray-200 text-gray-800">Min. {tourPackage.minPeople} orang</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-4">{tourPackage.name}</h1>

            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                <span>{tourPackage.destinations.join(", ")}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gray-500" />
                <span>{tourPackage.duration}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                <span>Tersedia setiap hari</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-red-600 mb-1">
                Rp {tourPackage.price.toLocaleString("id-ID")}{" "}
                <span className="text-sm font-normal text-gray-600">/ orang</span>
              </h2>
              <p className="text-gray-600">Harga sudah termasuk transportasi, penginapan, dan pemandu wisata</p>
            </div>

            <WhatsAppTourButton tourPackage={tourPackage} />

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
              <p className="text-gray-600">{tourPackage.description}</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="itinerary">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="includes">Fasilitas</TabsTrigger>
              <TabsTrigger value="terms">Syarat & Ketentuan</TabsTrigger>
            </TabsList>
            <TabsContent value="itinerary" className="mt-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Itinerary Perjalanan</h3>
                <div className="space-y-8">
                  {tourPackage.itinerary.map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="text-lg font-medium mb-4">Hari {index + 1}</h4>
                      <div className="space-y-4">
                        {day.activities.map((activity, actIndex) => (
                          <motion.div
                            key={actIndex}
                            className="flex"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + actIndex * 0.05 }}
                          >
                            <div className="mr-4">
                              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-medium">
                                {activity.time}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium">{activity.title}</h5>
                              <p className="text-gray-600">{activity.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="includes" className="mt-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Fasilitas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Termasuk</h4>
                    <ul className="space-y-2">
                      {tourPackage.includes.map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Tidak Termasuk</h4>
                    <ul className="space-y-2">
                      {tourPackage.excludes.map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="terms" className="mt-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Syarat & Ketentuan</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Pemesanan minimal 3 hari sebelum tanggal keberangkatan</li>
                  <li>Pembayaran DP 50% untuk konfirmasi pemesanan</li>
                  <li>Pelunasan dilakukan maksimal 1 hari sebelum keberangkatan</li>
                  <li>Minimal peserta sesuai dengan ketentuan paket</li>
                  <li>Perubahan itinerary dapat terjadi menyesuaikan kondisi di lapangan</li>
                  <li>Pembatalan pemesanan kurang dari 3 hari dikenakan biaya 50% dari total paket</li>
                  <li>Pembatalan pemesanan kurang dari 24 jam dikenakan biaya 100% dari total paket</li>
                  <li>Peserta wajib mengikuti arahan pemandu wisata selama perjalanan</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  )
}
