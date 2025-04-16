"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tourPackages } from "@/data/tour-packages"
import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Users, Search, Filter, X } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import PageTransition from "@/components/page-transition"

export default function TourPackagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [durationFilter, setDurationFilter] = useState("all")
  const [priceSort, setPriceSort] = useState("asc")
  const [filteredPackages, setFilteredPackages] = useState(tourPackages)
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const packagesPerPage = 6

  // Apply filters and sorting
  useEffect(() => {
    let result = [...tourPackages]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(query) ||
          pkg.shortDescription.toLowerCase().includes(query) ||
          pkg.destinations.some((dest) => dest.toLowerCase().includes(query)),
      )
    }

    // Apply duration filter
    if (durationFilter !== "all") {
      result = result.filter((pkg) => {
        if (durationFilter === "1day") return pkg.duration.includes("1 Hari")
        if (durationFilter === "2-3days") return pkg.duration.includes("2") || pkg.duration.includes("3")
        if (durationFilter === "4+days") {
          const days = Number.parseInt(pkg.duration.split(" ")[0])
          return days >= 4
        }
        return true
      })
    }

    // Apply sorting
    if (priceSort === "asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (priceSort === "desc") {
      result.sort((a, b) => b.price - a.price)
    }

    setFilteredPackages(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, durationFilter, priceSort])

  // Calculate pagination
  const indexOfLastPackage = currentPage * packagesPerPage
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage
  const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage)
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    // Scroll to top of package list
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setDurationFilter("all")
    setPriceSort("asc")
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">Paket Wisata</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Nikmati perjalanan wisata dengan paket lengkap termasuk transportasi, penginapan, dan pemandu wisata
          </p>
        </div>

        <div className="flex justify-between items-center mb-4 md:hidden">
          <div className="relative flex-grow mr-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari paket wisata..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex-shrink-0"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filter & Urutan</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="mobile-search" className="mb-2 block">
                    Cari Paket Wisata
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="mobile-search"
                      placeholder="Nama, destinasi, atau deskripsi..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mobile-duration" className="mb-2 block">
                    Durasi
                  </Label>
                  <Select value={durationFilter} onValueChange={setDurationFilter}>
                    <SelectTrigger id="mobile-duration">
                      <SelectValue placeholder="Pilih durasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Durasi</SelectItem>
                      <SelectItem value="1day">1 Hari</SelectItem>
                      <SelectItem value="2-3days">2-3 Hari</SelectItem>
                      <SelectItem value="4+days">4+ Hari</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mobile-sort" className="mb-2 block">
                    Urutkan Berdasarkan
                  </Label>
                  <Select value={priceSort} onValueChange={setPriceSort}>
                    <SelectTrigger id="mobile-sort">
                      <SelectValue placeholder="Urutkan berdasarkan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asc">Harga: Rendah ke Tinggi</SelectItem>
                      <SelectItem value="desc">Harga: Tinggi ke Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    Terapkan
                  </Button>
                  {(searchQuery || durationFilter !== "all" || priceSort !== "asc") && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        resetFilters()
                        setShowMobileFilters(false)
                      }}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border mb-6 md:mb-8 hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search" className="mb-2 block">
                Cari Paket Wisata
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Nama, destinasi, atau deskripsi..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="duration" className="mb-2 block">
                Durasi
              </Label>
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Pilih durasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Durasi</SelectItem>
                  <SelectItem value="1day">1 Hari</SelectItem>
                  <SelectItem value="2-3days">2-3 Hari</SelectItem>
                  <SelectItem value="4+days">4+ Hari</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sort" className="mb-2 block">
                Urutkan Berdasarkan
              </Label>
              <Select value={priceSort} onValueChange={setPriceSort}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Urutkan berdasarkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Harga: Rendah ke Tinggi</SelectItem>
                  <SelectItem value="desc">Harga: Tinggi ke Rendah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">Menampilkan {filteredPackages.length} paket wisata</p>
            {(searchQuery || durationFilter !== "all" || priceSort !== "asc") && (
              <Button variant="outline" size="sm" onClick={resetFilters} className="flex items-center gap-1">
                <X className="h-4 w-4" />
                Reset Filter
              </Button>
            )}
          </div>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">Tidak ada paket wisata yang ditemukan</h3>
            <p className="text-gray-600 mb-4">Silakan coba filter atau pencarian lain</p>
            <Button onClick={resetFilters} className="bg-red-600 hover:bg-red-700 text-white">
              Reset Filter
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {currentPackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="h-full"
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative h-40 sm:h-48">
                      <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover" />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-yellow-500 text-white">{pkg.duration}</Badge>
                      </div>
                    </div>
                    <CardHeader className="p-3 sm:p-4 pb-0">
                      <CardTitle className="text-base sm:text-lg line-clamp-1">{pkg.name}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm line-clamp-2">
                        {pkg.shortDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-2 flex-grow">
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-xs sm:text-sm">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-500 flex-shrink-0" />
                          <span className="line-clamp-1">{pkg.destinations.join(", ")}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-500 flex-shrink-0" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-gray-500 flex-shrink-0" />
                          <span>Min. {pkg.minPeople} orang</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <h3 className="text-lg sm:text-xl font-bold text-red-600">
                          Rp {pkg.price.toLocaleString("id-ID")}{" "}
                          <span className="text-xs sm:text-sm font-normal text-gray-600">/ orang</span>
                        </h3>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 sm:p-4 pt-0 mt-auto">
                      <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white text-sm">
                        <Link href={`/tour-packages/${pkg.id}`}>Lihat Detail</Link>
                      </Button>
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
    </PageTransition>
  )
}
