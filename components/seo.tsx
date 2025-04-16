"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  image?: string
  type?: "website" | "article"
  date?: string
  modified?: string
}

export default function SEO({
  title = "17Rentcar Bandung - Rental Mobil & Paket Wisata Terpercaya",
  description = "Layanan rental mobil dan paket wisata terpercaya di Bandung dengan armada berkualitas dan harga terjangkau.",
  canonical,
  image = "/og-image.jpg",
  type = "website",
  date,
  modified,
}: SEOProps) {
  const router = useRouter()
  const url = `https://17rentcar-bandung.com${canonical || router.asPath}`
  const fullTitle = `${title} | 17Rentcar Bandung`

  return (
    <Head>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`https://17rentcar-bandung.com${image}`} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="17Rentcar Bandung" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://17rentcar-bandung.com${image}`} />

      {/* Article specific (if applicable) */}
      {type === "article" && date && <meta property="article:published_time" content={date} />}
      {type === "article" && modified && <meta property="article:modified_time" content={modified} />}
    </Head>
  )
}
