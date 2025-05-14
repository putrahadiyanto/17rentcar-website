"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Rental Mobil", href: "/cars" },
  { name: "Paket Wisata", href: "/tour-packages" },
  { name: "Tentang Kami", href: "/about" },
  { name: "Syarat & Ketentuan", href: "/terms" },
  // { name: "Kontak", href: "/contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Determine if we're on the homepage and not scrolled
  const isHomeNotScrolled = pathname === "/" && !isScrolled

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        // Make sure this doesn't conflict with child animations
        delayChildren: 0.2,
        staggerChildren: 0.1,
      }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white shadow-sm" : isHomeNotScrolled ? "bg-black/40 backdrop-blur-sm" : "bg-white",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <motion.span
                className="text-xl md:text-2xl font-bold text-red-600"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                17
              </motion.span>
              <motion.span
                className={cn("text-xl md:text-2xl font-bold ml-1", isHomeNotScrolled ? "text-white" : "text-gray-900")}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Rentcar
              </motion.span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  pathname === link.href
                    ? "text-red-600"
                    : isHomeNotScrolled
                      ? "text-white hover:text-white/80"
                      : "text-gray-700",
                )}
              >
                {link.name}
                {/* Hover indicator - only shows when not active */}
                {pathname !== link.href && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600/70 transition-all duration-300 group-hover:w-full" />
                )}
                {/* Active indicator - animated with framer-motion */}
                {pathname === link.href && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
                // Prevent animation conflicts by not animating when disabled
                when: "afterChildren",
              }}
            >
              <Button
                asChild
                className={cn(
                  isHomeNotScrolled
                    ? "bg-white text-red-600 hover:bg-white/90"
                    : "bg-red-600 hover:bg-red-700 text-white",
                )}
              >
                <Link href="/contact" className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Hubungi Kami
                </Link>
              </Button>
            </motion.div>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu" className={isHomeNotScrolled ? "text-white" : ""}>
                <motion.div whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Menu className="h-6 w-6" />
                </motion.div>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[350px] p-0"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                    <span className="text-xl font-bold text-red-600">17</span>
                    <span className="text-xl font-bold ml-1">Rentcar</span>
                  </Link>
                  <Button variant="ghost" size="icon" aria-label="Close" onClick={() => setIsOpen(false)}>
                    <motion.div whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                      <X className="h-6 w-6" />
                    </motion.div>
                  </Button>
                </div>
                <div className="flex-1 overflow-auto py-4">
                  <nav className="flex flex-col px-4">
                    <AnimatePresence mode="wait">
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 250,
                            damping: 25,
                          }}
                        >
                          <Link
                            href={link.href}
                            className={cn(
                              "text-base font-medium transition-colors py-3 block border-b border-gray-100 relative",
                              pathname === link.href ? "text-red-600" : "text-gray-700 hover:text-red-600",
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {link.name}
                            {pathname === link.href && (
                              <motion.span
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-red-600 rounded-r-full"
                                layoutId="mobile-indicator"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                              />
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </nav>
                </div>
                <div className="p-4 border-t mt-auto">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Link
                        href="tel:087817090619"
                        className="flex items-center justify-center"
                        onClick={() => setIsOpen(false)}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Hubungi Kami
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
