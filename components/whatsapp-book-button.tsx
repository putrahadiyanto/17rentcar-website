"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, differenceInDays, addDays } from "date-fns"
import { id } from "date-fns/locale"
import { CalendarIcon, MessageSquare } from "lucide-react"
import type { CarType } from "@/types/car"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface WhatsAppBookButtonProps {
  car: CarType
}

export default function WhatsAppBookButton({ car }: WhatsAppBookButtonProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleBookNow = () => {
    if (!startDate || !endDate || !name || !phone) {
      toast({
        variant: "destructive",
        title: "Validasi Gagal",
        description: "Mohon lengkapi semua data pemesanan",
      })
      return
    }

    setIsSubmitting(true)

    const formattedStartDate = format(startDate, "dd MMMM yyyy", { locale: id })
    const formattedEndDate = format(endDate, "dd MMMM yyyy", { locale: id })

    // Calculate total days
    const diffDays = differenceInDays(endDate, startDate) + 1

    // Calculate total price
    const totalPrice = car.price * diffDays

    const message = `*PEMESANAN RENTAL MOBIL 17RENTCAR*
    
*Detail Pemesan:*
Nama: ${name}
No. HP: ${phone}

*Detail Kendaraan:*
Mobil: ${car.name} (${car.brand})
Tahun: ${car.year}
Transmisi: ${car.transmission}
Kapasitas: ${car.capacity} orang
Bahan Bakar: ${car.fuelType}

*Detail Pemesanan:*
Tanggal Mulai: ${formattedStartDate}
Tanggal Selesai: ${formattedEndDate}
Durasi: ${diffDays} hari
Harga per Hari: Rp ${car.price.toLocaleString("id-ID")}
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
      setStartDate(undefined)
      setEndDate(undefined)
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
          <Label>Tanggal Mulai</Label>
          <Popover>
            <PopoverTrigger asChild>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd MMMM yyyy", { locale: id }) : <span>Pilih tanggal mulai</span>}
                </Button>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date)
                  // If end date is before start date or not set, set it to start date + 1 day
                  if (!endDate || (date && endDate < date)) {
                    setEndDate(date ? addDays(date, 1) : undefined)
                  }
                }}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Tanggal Selesai</Label>
          <Popover>
            <PopoverTrigger asChild>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd MMMM yyyy", { locale: id }) : <span>Pilih tanggal selesai</span>}
                </Button>
              </motion.div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={(date) => date < (startDate || new Date())}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {startDate && endDate && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium mb-2">Detail Pemesanan:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Durasi Sewa:</div>
            <div className="font-medium">{differenceInDays(endDate, startDate) + 1} hari</div>
            <div>Harga per Hari:</div>
            <div className="font-medium">Rp {car.price.toLocaleString("id-ID")}</div>
            <div>Total Harga:</div>
            <div className="font-medium text-red-600">
              Rp {((differenceInDays(endDate, startDate) + 1) * car.price).toLocaleString("id-ID")}
            </div>
          </div>
        </div>
      )}

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
