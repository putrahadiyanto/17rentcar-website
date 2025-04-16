"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { CalendarIcon, MessageSquare } from "lucide-react"
import type { TourPackageType } from "@/types/tour-package"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface WhatsAppTourButtonProps {
  tourPackage: TourPackageType
}

export default function WhatsAppTourButton({ tourPackage }: WhatsAppTourButtonProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [people, setPeople] = useState<string>("2")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleBookNow = () => {
    if (!date || !name || !phone) {
      toast({
        variant: "destructive",
        title: "Validasi Gagal",
        description: "Mohon lengkapi semua data pemesanan",
      })
      return
    }

    setIsSubmitting(true)

    const formattedDate = format(date, "dd MMMM yyyy", { locale: id })

    // Calculate total price
    const totalPrice = tourPackage.price * Number.parseInt(people)

    const message = `*PEMESANAN PAKET WISATA 17RENTCAR*
    
*Detail Pemesan:*
Nama: ${name}
No. HP: ${phone}

*Detail Paket Wisata:*
Paket: ${tourPackage.name}
Deskripsi: ${tourPackage.shortDescription}
Durasi: ${tourPackage.duration}
Destinasi: ${tourPackage.destinations.join(", ")}

*Detail Pemesanan:*
Tanggal Keberangkatan: ${formattedDate}
Jumlah Peserta: ${people} orang
Harga per Orang: Rp ${tourPackage.price.toLocaleString("id-ID")}
Total Harga: Rp ${totalPrice.toLocaleString("id-ID")}

Mohon informasi lebih lanjut mengenai ketersediaan dan proses pemesanan. Terima kasih.`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/6287817090619?text=${encodedMessage}`

    // Simulate a delay for the animation
    setTimeout(() => {
      window.open(whatsappUrl, "_blank")
      setIsSubmitting(false)

      toast({
        variant: "success",
        title: "Berhasil",
        description: "Permintaan pemesanan Anda sedang diproses",
      })

      // Reset form
      setName("")
      setPhone("")
      setDate(undefined)
      setPeople("2")
    }, 1500)
  }

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 2px rgba(220, 38, 38, 0.2)" },
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <motion.div whileFocus="focus" variants={inputVariants}>
            <Input
              id="name"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-red-500/20"
            />
          </motion.div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon</Label>
          <motion.div whileFocus="focus" variants={inputVariants}>
            <Input
              id="phone"
              placeholder="Masukkan nomor telepon"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-red-500/20"
            />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tanggal Keberangkatan</Label>
          <Popover>
            <PopoverTrigger asChild>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd MMMM yyyy", { locale: id }) : <span>Pilih tanggal keberangkatan</span>}
                </Button>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => {
                  const today = new Date()
                  today.setDate(today.getDate() + 2) // Minimum 3 days from now
                  return date < today
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Jumlah Orang</Label>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Select value={people} onValueChange={setPeople}>
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-red-500/20">
                <SelectValue placeholder="Pilih jumlah orang" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Orang
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="pt-4"
        >
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium mb-2">Detail Pemesanan:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Paket Wisata:</div>
              <div className="font-medium">{tourPackage.name}</div>
              <div>Tanggal:</div>
              <div className="font-medium">{date ? format(date, "dd MMMM yyyy", { locale: id }) : "-"}</div>
              <div>Jumlah Peserta:</div>
              <div className="font-medium">{people} orang</div>
              <div>Harga per Orang:</div>
              <div className="font-medium">Rp {tourPackage.price.toLocaleString("id-ID")}</div>
              <div>Total Harga:</div>
              <div className="font-medium text-red-600">
                Rp {(tourPackage.price * Number.parseInt(people || "0")).toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          onClick={handleBookNow}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
              className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <MessageSquare className="mr-2 h-5 w-5" />
          )}
          {isSubmitting ? "Memproses..." : "Pesan via WhatsApp"}
        </Button>
      </motion.div>
    </div>
  )
}
