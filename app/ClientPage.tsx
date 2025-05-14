"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Shield, Award, Clock, ThumbsUp } from "lucide-react"
import FeaturedCars from "@/components/featured-cars"
import TestimonialCard from "@/components/testimonial-card"
import ServiceCard from "@/components/service-card"
import FadeIn from "@/components/fade-in"
import StaggerContainer from "@/components/stagger-container"
import StaggerItem from "@/components/stagger-item"
import ScrollAnimation from "@/components/scroll-animation"
import PageTransition from "@/components/page-transition"
import AnimatedSection from "@/components/animated-section"
import { motion } from "framer-motion"
import { LocalBusinessStructuredData } from "@/components/structured-data"

export default function ClientPage() {
  return (
    <PageTransition>
      <LocalBusinessStructuredData />
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full overflow-hidden">
          {/* Improved overlay with gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-10" />

          {/* Optimized image with better loading */}
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="17Rentcar Bandung - Rental Mobil dan Paket Wisata Terpercaya di Bandung"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            quality={90}
          />

          {/* Improved content container with better alignment */}
          <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-start px-4 md:px-6 lg:px-8">
            <FadeIn delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                17Rentcar Bandung
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 md:mb-8 max-w-2xl leading-relaxed">
                Layanan rental mobil dan paket wisata terpercaya untuk perjalanan Anda di Bandung dan sekitarnya
              </p>
            </FadeIn>

            <FadeIn delay={0.6} direction="up">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white min-w-[180px] font-medium shadow-lg"
                >
                  <Link href="/cars">Lihat Daftar Mobil</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20 min-w-[180px] font-medium shadow-lg"
                >
                  <Link href="/tour-packages">Paket Wisata</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Services Section */}
        <AnimatedSection className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Layanan Kami</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  17Rentcar Bandung menyediakan berbagai layanan transportasi untuk kebutuhan perjalanan Anda
                </p>
              </div>
            </ScrollAnimation>

            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StaggerItem>
                  <ServiceCard
                    title="Rental Mobil"
                    description="Berbagai pilihan kendaraan dengan kondisi prima dan harga terjangkau untuk kebutuhan perjalanan Anda"
                    icon="Car"
                    link="/cars"
                  />
                </StaggerItem>
                <StaggerItem>
                  <ServiceCard
                    title="Paket Wisata"
                    description="Nikmati perjalanan wisata dengan paket lengkap termasuk transportasi, penginapan, dan pemandu wisata"
                    icon="Map"
                    link="/tour-packages"
                  />
                </StaggerItem>
                <StaggerItem>
                  <ServiceCard
                    title="Paket Komplit"
                    description="Mobil, supir, BBM, dan tol sudah termasuk. Praktis dan hemat untuk wisata atau bisnis."
                    icon="Car"
                    link="/tour-packages?paket-komplit=true"
                  />
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </AnimatedSection>

        {/* Featured Cars Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation>
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold">Mobil Unggulan</h2>
                <Button asChild variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Link href="/cars" className="flex items-center">
                    Lihat Semua <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollAnimation>

            <FeaturedCars />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollAnimation>
                <div>
                  <h2 className="text-3xl font-bold mb-6">Mengapa Memilih Kami?</h2>
                  <StaggerContainer>
                    <div className="space-y-6">
                      <StaggerItem>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-red-100 p-2 rounded-full mr-4">
                            <Shield className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">Armada Berkualitas</h3>
                            <p className="text-gray-600">
                              Semua kendaraan kami dalam kondisi prima, terawat, dan selalu diperiksa sebelum disewakan
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-red-100 p-2 rounded-full mr-4">
                            <Award className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">Harga Terjangkau</h3>
                            <p className="text-gray-600">
                              Kami menawarkan harga yang kompetitif dengan kualitas layanan terbaik
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-red-100 p-2 rounded-full mr-4">
                            <Clock className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">Pelayanan 24 Jam</h3>
                            <p className="text-gray-600">
                              Tim kami siap melayani kebutuhan transportasi Anda kapan saja
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 bg-red-100 p-2 rounded-full mr-4">
                            <ThumbsUp className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">Driver Profesional</h3>
                            <p className="text-gray-600">
                              Driver kami berpengalaman, ramah, dan menguasai rute perjalanan di Bandung dan sekitarnya
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                    </div>
                  </StaggerContainer>
                </div>
              </ScrollAnimation>
              <FadeIn direction="right" delay={0.3}>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Layanan 17Rentcar Bandung - Armada Berkualitas dan Driver Profesional"
                    fill
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Testimoni Pelanggan</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Apa kata pelanggan tentang layanan 17Rentcar Bandung</p>
              </div>
            </ScrollAnimation>

            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StaggerItem>
                  <TestimonialCard
                    name="Budi Santoso"
                    testimonial="Pelayanan sangat memuaskan, mobil bersih dan terawat. Driver juga ramah dan mengenal rute dengan baik."
                    rating={5}
                  />
                </StaggerItem>
                <StaggerItem>
                  <TestimonialCard
                    name="Siti Rahayu"
                    testimonial="Saya sangat puas dengan paket wisata yang ditawarkan. Semua terorganisir dengan baik dan harga sangat worth it."
                    rating={5}
                  />
                </StaggerItem>
                <StaggerItem>
                  <TestimonialCard
                    name="Ahmad Hidayat"
                    testimonial="Proses pemesanan mudah dan cepat. Mobil datang tepat waktu dan dalam kondisi prima. Pasti akan menggunakan jasa ini lagi."
                    rating={4}
                  />
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <AnimatedSection className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Siap Untuk Perjalanan Anda?</h2>
              <p className="max-w-2xl mx-auto mb-8">
                Hubungi kami sekarang untuk mendapatkan penawaran terbaik untuk kebutuhan transportasi Anda
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                  <Link href="/contact">Hubungi Kami</Link>
                </Button>
              </motion.div>
            </FadeIn>
          </div>
        </AnimatedSection>
      </div>
    </PageTransition>
  )
}
