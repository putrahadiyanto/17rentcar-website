"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Silakan masukkan alamat email yang valid",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail("")

      toast({
        variant: "success",
        title: "Berhasil",
        description: "Terima kasih telah berlangganan newsletter kami!",
      })
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="mb-4">
              <Link href="/" className="flex items-center">
                <span className="text-xl md:text-2xl font-bold text-red-500">17</span>
                <span className="text-xl md:text-2xl font-bold text-white ml-1">Rentcar</span>
              </Link>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              Penyedia jasa rental mobil dan paket wisata terpercaya di Bandung dengan armada berkualitas dan pelayanan
              profesional.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors relative overflow-hidden group"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <span className="absolute inset-0 bg-red-600 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                <Facebook className="h-5 w-5 relative z-10" />
              </motion.a>
              <motion.a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors relative overflow-hidden group"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <span className="absolute inset-0 bg-red-600 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                <Instagram className="h-5 w-5 relative z-10" />
              </motion.a>
              <motion.a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors relative overflow-hidden group"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <span className="absolute inset-0 bg-red-600 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                <Twitter className="h-5 w-5 relative z-10" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Layanan Kami
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-red-500"></span>
            </h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  href="/cars"
                  className="text-gray-400 hover:text-white transition-colors text-sm md:text-base relative group"
                >
                  Rental Mobil
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  href="/tour-packages"
                  className="text-gray-400 hover:text-white transition-colors text-sm md:text-base relative group"
                >
                  Paket Wisata
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors text-sm md:text-base relative group"
                >
                  Antar Jemput Bandara
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors text-sm md:text-base relative group"
                >
                  Sewa Mobil Pengantin
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors text-sm md:text-base relative group"
                >
                  Sewa Bus Pariwisata
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Beranda
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Tentang Kami
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/cars" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Daftar Mobil
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link
                  href="/tour-packages"
                  className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                >
                  Paket Wisata
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                  Kontak
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <motion.li
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <MapPin className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm md:text-base">Jalan Kembar Baru No.20, Bandung, Jawa Barat</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Phone className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm md:text-base">087817090619</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Mail className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400 text-sm md:text-base break-all">seventeenrentcarbandung@gmail.com</span>
              </motion.li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Berlangganan Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <Input
                  placeholder="Email Anda"
                  className="bg-gray-800 border-gray-700 text-white rounded-r-none focus-visible:ring-red-500 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button type="submit" className="bg-red-600 hover:bg-red-700 rounded-l-none" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "Kirim"
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} 17Rentcar Bandung. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
