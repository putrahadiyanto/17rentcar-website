import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ScrollToTop from "@/components/scroll-to-top"
import { FilterProvider } from "@/contexts/filter-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "17Rentcar Bandung - Rental Mobil & Paket Wisata Terpercaya",
  description:
    "Layanan rental mobil dan paket wisata terpercaya di Bandung dengan armada berkualitas dan harga terjangkau. Tersedia berbagai pilihan mobil dan paket wisata untuk kebutuhan perjalanan Anda.",
  keywords:
    "rental mobil bandung, sewa mobil bandung, paket wisata bandung, tour bandung, seventeen rentcar, 17rentcar, rental mobil murah, sewa mobil murah",
  authors: [{ name: "17Rentcar Bandung" }],
  creator: "17Rentcar Bandung",
  publisher: "17Rentcar Bandung",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://17rentcar-bandung.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "17Rentcar Bandung - Rental Mobil & Paket Wisata Terpercaya",
    description:
      "Layanan rental mobil dan paket wisata terpercaya di Bandung dengan armada berkualitas dan harga terjangkau.",
    url: "https://17rentcar-bandung.com",
    siteName: "17Rentcar Bandung",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "17Rentcar Bandung",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "17Rentcar Bandung - Rental Mobil & Paket Wisata Terpercaya",
    description:
      "Layanan rental mobil dan paket wisata terpercaya di Bandung dengan armada berkualitas dan harga terjangkau.",
    images: ["/og-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "verification_token",
  },
  category: "transportation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <FilterProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
              <ScrollToTop />
            </div>
          </FilterProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'