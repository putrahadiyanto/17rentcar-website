"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CarType } from "@/types/car"
import { fetchCars } from "@/lib/api-services"

type CarFilters = {
  search: string
  types: string[]
  brands: string[]
  priceRange: [number, number]
  transmission?: string
  capacity?: number
  fuelType?: string
}

type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc" | "rating-desc"

type FilterContextType = {
  filters: CarFilters
  setFilters: (filters: Partial<CarFilters>) => void
  resetFilters: () => void
  filteredCars: CarType[]
  sortOption: SortOption
  setSortOption: (option: SortOption) => void
  availableBrands: string[]
  availableTypes: string[]
  minPrice: number
  maxPrice: number
  loading: boolean
  error: string | null
  retry: () => void
}

const initialFilters: CarFilters = {
  search: "",
  types: [],
  brands: [],
  priceRange: [200000, 2000000],
  transmission: undefined,
  capacity: undefined,
  fuelType: undefined,
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<CarType[]>([])
  const [filters, setFiltersState] = useState<CarFilters>(initialFilters)
  const [sortOption, setSortOption] = useState<SortOption>("price-asc")
  const [filteredCars, setFilteredCars] = useState<CarType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Function to fetch cars data
  const fetchCarsData = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchCars()
      if (data.length === 0) {
        setError("Tidak ada data mobil yang ditemukan. Silakan coba lagi nanti.")
      } else {
        setCars(data)
        setFilteredCars(data)
      }
    } catch (err) {
      console.error("Failed to fetch cars:", err)
      setError("Gagal memuat data dari server. Silakan periksa koneksi Anda dan coba lagi.")

      // Import mock data as fallback when in development mode
      if (process.env.NODE_ENV === 'development') {
        try {
          const { carData } = await import('@/data/car-data')
          console.log('Using fallback mock data')
          setCars(carData)
          setFilteredCars(carData)
          setError(null)
        } catch (mockErr) {
          console.error("Failed to load fallback data:", mockErr)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  // Function to retry loading data
  const retry = () => {
    fetchCarsData()
  }

  // Fetch cars from API on component mount
  useEffect(() => {
    fetchCarsData()
  }, [])

  // Calculate available filter options and price range
  const availableBrands = Array.from(new Set(cars.map((car) => car.brand)))
  const availableTypes = Array.from(new Set(cars.map((car) => car.type)))
  const minPrice = cars.length > 0 ? Math.min(...cars.map((car) => car.price)) : 200000
  const maxPrice = cars.length > 0 ? Math.max(...cars.map((car) => car.price)) : 2000000

  // Update filters when price range changes based on available cars
  useEffect(() => {
    if (cars.length > 0) {
      const min = Math.min(...cars.map((car) => car.price))
      const max = Math.max(...cars.map((car) => car.price))

      // Only update if different from current price range
      if (min !== filters.priceRange[0] || max !== filters.priceRange[1]) {
        setFiltersState((prev) => ({
          ...prev,
          priceRange: [min, max],
        }))
      }
    }
  }, [cars])

  // Update filters
  const setFilters = (newFilters: Partial<CarFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }))
  }

  // Reset filters
  const resetFilters = () => {
    setFiltersState({
      ...initialFilters,
      priceRange: [minPrice, maxPrice],
    })
  }

  // Apply filters and sorting
  useEffect(() => {
    if (cars.length === 0) return

    let result = [...cars]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(searchLower) ||
          car.brand.toLowerCase().includes(searchLower) ||
          car.type.toLowerCase().includes(searchLower),
      )
    }

    // Apply type filter
    if (filters.types.length > 0) {
      result = result.filter((car) => filters.types.includes(car.type))
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter((car) => filters.brands.includes(car.brand))
    }

    // Apply price range filter
    result = result.filter((car) => car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1])

    // Apply transmission filter
    if (filters.transmission) {
      result = result.filter((car) => car.transmission === filters.transmission)
    }

    // Apply capacity filter
    if (filters.capacity) {
      result = result.filter((car) => car.capacity >= filters.capacity!)
    }

    // Apply fuel type filter
    if (filters.fuelType) {
      result = result.filter((car) => car.fuelType === filters.fuelType)
    }

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "rating-desc":
        // Add rating if your API supports it
        break
    }

    setFilteredCars(result)
  }, [filters, sortOption, cars])

  return (
    <FilterContext.Provider
      value={{
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
        loading,
        error,
        retry,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider")
  }
  return context
}
