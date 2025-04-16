"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CarList } from "@/components/car-list"
import { useFilter } from "@/contexts/filter-context"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SlidersHorizontal, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PageTransition from "@/components/page-transition"

export default function CarsPage() {
  const {
    filters,
    setFilters,
    resetFilters,
    filteredCars,
    sortOption,
    setSortOption,
    availableBrands,
    availableTypes,
    minPrice,
    maxPrice,
  } = useFilter()

  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Update price range when filters change
  useEffect(() => {
    setPriceRange(filters.priceRange)
  }, [filters.priceRange])

  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }

  // Apply price range filter
  const applyPriceRange = () => {
    setFilters({ priceRange })
  }

  // Handle checkbox change for types
  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFilters({ types: [...filters.types, type] })
    } else {
      setFilters({ types: filters.types.filter((t) => t !== type) })
    }
  }

  // Handle checkbox change for brands
  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setFilters({ brands: [...filters.brands, brand] })
    } else {
      setFilters({ brands: filters.brands.filter((b) => b !== brand) })
    }
  }

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value })
  }

  // Handle transmission change
  const handleTransmissionChange = (value: string) => {
    setFilters({ transmission: value === "all" ? undefined : value })
  }

  // Handle fuel type change
  const handleFuelTypeChange = (value: string) => {
    setFilters({ fuelType: value === "all" ? undefined : value })
  }

  // Handle capacity change
  const handleCapacityChange = (value: string) => {
    setFilters({ capacity: value === "all" ? undefined : Number.parseInt(value) })
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Daftar Harga Unit Mobil</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pilih dari berbagai jenis kendaraan berkualitas untuk kebutuhan perjalanan Anda
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
            <p className="text-sm text-gray-500">Menampilkan {filteredCars.length} mobil</p>
            {(filters.search ||
              filters.types.length > 0 ||
              filters.brands.length > 0 ||
              filters.transmission ||
              filters.fuelType ||
              filters.capacity ||
              filters.priceRange[0] !== minPrice ||
              filters.priceRange[1] !== maxPrice) && (
              <Button variant="outline" size="sm" onClick={resetFilters} className="flex items-center gap-1">
                <X className="h-4 w-4" />
                Reset Filter
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Label htmlFor="sort" className="text-sm whitespace-nowrap hidden md:inline">
              Urutkan:
            </Label>
            <Select
              value={sortOption}
              onValueChange={(value) => setSortOption(value as any)}
              className="w-full md:w-auto"
            >
              <SelectTrigger id="sort" className="w-full md:w-[180px]">
                <SelectValue placeholder="Urutkan berdasarkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Harga: Rendah ke Tinggi</SelectItem>
                <SelectItem value="price-desc">Harga: Tinggi ke Rendah</SelectItem>
                <SelectItem value="name-asc">Nama: A-Z</SelectItem>
                <SelectItem value="name-desc">Nama: Z-A</SelectItem>
                <SelectItem value="rating-desc">Rating Tertinggi</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden flex items-center gap-1"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filter Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Filter</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="mobile-search" className="text-sm font-medium">
                      Cari Mobil
                    </Label>
                    <Input
                      id="mobile-search"
                      placeholder="Cari berdasarkan nama..."
                      className="mt-1"
                      value={filters.search}
                      onChange={handleSearchChange}
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Tipe Kendaraan</h3>
                    <div className="space-y-2">
                      {availableTypes.map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-type-${type}`}
                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            checked={filters.types.includes(type)}
                            onChange={(e) => handleTypeChange(type, e.target.checked)}
                          />
                          <label htmlFor={`mobile-type-${type}`} className="ml-2 text-sm text-gray-700">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Merek</h3>
                    <div className="space-y-2">
                      {availableBrands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-brand-${brand}`}
                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            checked={filters.brands.includes(brand)}
                            onChange={(e) => handleBrandChange(brand, e.target.checked)}
                          />
                          <label htmlFor={`mobile-brand-${brand}`} className="ml-2 text-sm text-gray-700">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Transmisi</h3>
                    <Select value={filters.transmission || "all"} onValueChange={handleTransmissionChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih transmisi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="Automatic">Otomatis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Bahan Bakar</h3>
                    <Select value={filters.fuelType || "all"} onValueChange={handleFuelTypeChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih bahan bakar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="Bensin">Bensin</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Kapasitas</h3>
                    <Select value={filters.capacity?.toString() || "all"} onValueChange={handleCapacityChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kapasitas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="2">2+ Orang</SelectItem>
                        <SelectItem value="4">4+ Orang</SelectItem>
                        <SelectItem value="6">6+ Orang</SelectItem>
                        <SelectItem value="8">8+ Orang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4">Rentang Harga</h3>
                    <Slider
                      defaultValue={[minPrice, maxPrice]}
                      max={maxPrice}
                      min={minPrice}
                      step={50000}
                      value={priceRange}
                      onValueChange={handlePriceRangeChange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Rp {priceRange[0].toLocaleString("id-ID")}</span>
                      <span className="text-sm text-gray-500">Rp {priceRange[1].toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => {
                        applyPriceRange()
                        setShowMobileFilters(false)
                      }}
                    >
                      Terapkan Filter
                    </Button>
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
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Desktop Filter Sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-20">
              <h2 className="text-xl font-semibold mb-6">Filter</h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="search" className="text-sm font-medium">
                    Cari Mobil
                  </Label>
                  <Input
                    id="search"
                    placeholder="Cari berdasarkan nama..."
                    className="mt-1"
                    value={filters.search}
                    onChange={handleSearchChange}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Tipe Kendaraan</h3>
                  <div className="space-y-2">
                    {availableTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`type-${type}`}
                          className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                          checked={filters.types.includes(type)}
                          onChange={(e) => handleTypeChange(type, e.target.checked)}
                        />
                        <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Merek</h3>
                  <div className="space-y-2">
                    {availableBrands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`brand-${brand}`}
                          className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                          checked={filters.brands.includes(brand)}
                          onChange={(e) => handleBrandChange(brand, e.target.checked)}
                        />
                        <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Transmisi</h3>
                  <Select value={filters.transmission || "all"} onValueChange={handleTransmissionChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih transmisi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automatic">Otomatis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Bahan Bakar</h3>
                  <Select value={filters.fuelType || "all"} onValueChange={handleFuelTypeChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih bahan bakar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="Bensin">Bensin</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Kapasitas</h3>
                  <Select value={filters.capacity?.toString() || "all"} onValueChange={handleCapacityChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih kapasitas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="2">2+ Orang</SelectItem>
                      <SelectItem value="4">4+ Orang</SelectItem>
                      <SelectItem value="6">6+ Orang</SelectItem>
                      <SelectItem value="8">8+ Orang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-4">Rentang Harga</h3>
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    max={maxPrice}
                    min={minPrice}
                    step={50000}
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Rp {priceRange[0].toLocaleString("id-ID")}</span>
                    <span className="text-sm text-gray-500">Rp {priceRange[1].toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={applyPriceRange}>
                  Terapkan Filter
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="all" onClick={() => setFilters({ types: [] })}>
                  Semua
                </TabsTrigger>
                <TabsTrigger value="mpv" onClick={() => setFilters({ types: ["MPV"] })}>
                  MPV
                </TabsTrigger>
                <TabsTrigger value="suv" onClick={() => setFilters({ types: ["SUV"] })}>
                  SUV
                </TabsTrigger>
                <TabsTrigger value="minibus" onClick={() => setFilters({ types: ["Minibus"] })}>
                  Minibus
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <CarList cars={filteredCars} />
              </TabsContent>
              <TabsContent value="mpv">
                <CarList cars={filteredCars.filter((car) => car.type === "MPV")} />
              </TabsContent>
              <TabsContent value="suv">
                <CarList cars={filteredCars.filter((car) => car.type === "SUV")} />
              </TabsContent>
              <TabsContent value="minibus">
                <CarList cars={filteredCars.filter((car) => car.type === "Minibus")} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
