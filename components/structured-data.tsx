import Script from "next/script"

interface LocalBusinessStructuredDataProps {
  name?: string
  description?: string
  url?: string
  telephone?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  geo?: {
    latitude?: number
    longitude?: number
  }
  image?: string
  priceRange?: string
}

export function LocalBusinessStructuredData({
  name = "17Rentcar Bandung",
  description = "Layanan rental mobil dan paket wisata terpercaya di Bandung dengan armada berkualitas dan harga terjangkau.",
  url = "https://17rentcar-bandung.com",
  telephone = "+6287817090619",
  address = {
    streetAddress: "Jalan Kembar Baru No.20",
    addressLocality: "Bandung",
    addressRegion: "Jawa Barat",
    postalCode: "40132",
    addressCountry: "ID",
  },
  geo = {
    latitude: -6.9073553,
    longitude: 107.6082858,
  },
  image = "https://17rentcar-bandung.com/og-image.jpg",
  priceRange = "Rp350.000 - Rp1.500.000",
}: LocalBusinessStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name,
    description,
    url,
    telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    image,
    priceRange,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
  }

  return (
    <Script
      id="local-business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface CarStructuredDataProps {
  name: string
  description: string
  image: string
  brand: string
  model: string
  vehicleIdentificationNumber?: string
  fuelType: string
  numberOfDoors?: number
  seatingCapacity: number
  price: number
  priceCurrency?: string
  url: string
}

export function CarStructuredData({
  name,
  description,
  image,
  brand,
  model,
  vehicleIdentificationNumber,
  fuelType,
  numberOfDoors = 4,
  seatingCapacity,
  price,
  priceCurrency = "IDR",
  url,
}: CarStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Car",
    name,
    description,
    image,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    model,
    vehicleIdentificationNumber,
    fuelType,
    numberOfDoors,
    vehicleSeatingCapacity: seatingCapacity,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency,
      url,
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    },
  }

  return (
    <Script
      id="car-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface TourStructuredDataProps {
  name: string
  description: string
  image: string
  price: number
  priceCurrency?: string
  url: string
  duration: string
}

export function TourStructuredData({
  name,
  description,
  image,
  price,
  priceCurrency = "IDR",
  url,
  duration,
}: TourStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name,
    description,
    image,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency,
      url,
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    },
    touristType: ["Traveler", "Family", "Group"],
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "TouristAttraction",
            name: "Bandung City Tour",
          },
        },
      ],
    },
    duration,
  }

  return (
    <Script
      id="tour-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
