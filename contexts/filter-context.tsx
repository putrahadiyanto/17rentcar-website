"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CarType } from "@/types/car"
import { carData } from "@/data/car-data"

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
  const [filters, setFiltersState] = useState<CarFilters>(initialFilters)
  const [sortOption, setSortOption] = useState<SortOption>("price-asc")
  const [filteredCars, setFilteredCars] = useState<CarType[]>(carData)

  // Calculate available filter options and price range
  const availableBrands = Array.from(new Set(carData.map((car) => car.brand)))
  const availableTypes = Array.from(new Set(carData.map((car) => car.type)))
  const minPrice = Math.min(...carData.map((car) => car.price))
  const maxPrice = Math.max(...carData.map((car) => car.price))

  // Update filters
  const setFilters = (newFilters: Partial<CarFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }))
  }

  // Reset filters
  const resetFilters = () => {
    setFiltersState(initialFilters)
  }

  // Apply filters and sorting
  useEffect(() => {
    let result = [...carData]

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
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    setFilteredCars(result)
  }, [filters, sortOption])

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
