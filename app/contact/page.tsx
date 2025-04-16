"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send, Loader2, Check } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import PageTransition from "@/components/page-transition"

type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FormErrors = {
  [key in keyof FormData]?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi"
      isValid = false
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi"
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
      isValid = false
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon wajib diisi"
      isValid = false
    } else if (!/^[0-9]{10,13}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Nomor telepon tidak valid"
      isValid = false
    }

    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = "Subjek wajib diisi"
      isValid = false
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = "Pesan wajib diisi"
      isValid = false
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Pesan minimal 10 karakter"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validasi Gagal",
        description: "Mohon periksa kembali form Anda",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Format message for WhatsApp
    const whatsappMessage = `*PESAN DARI WEBSITE*
  
*Detail Pengirim:*
Nama: ${formData.name}
Email: ${formData.email}
No. HP: ${formData.phone}

*Pesan:*
Subjek: ${formData.subject}
${formData.message}

_Pesan ini dikirim melalui form kontak website 17Rentcar._`

    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/6287817090619?text=${encodedMessage}`

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih! Kami akan segera menghubungi Anda",
        variant: "success",
      })

      // Open WhatsApp with formatted message
      window.open(whatsappUrl, "_blank")

      // Reset form after success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">Hubungi Kami</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau ingin memesan layanan kami
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Kirim Pesan</h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Masukkan email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Masukkan nomor telepon"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subjek <span className="text-red-500">*</span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Masukkan subjek pesan"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Masukkan pesan Anda"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : isSuccess ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Check className="mr-2 h-4 w-4" />
                      </motion.div>
                      Terkirim!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Kirim Pesan
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Informasi Kontak</h2>
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-red-100 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                        <MapPin className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold mb-1">Alamat</h3>
                        <p className="text-gray-600 text-sm md:text-base">
                          Jalan Kembar Baru No.20, Bandung, Jawa Barat
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-red-100 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                        <Phone className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold mb-1">Telepon</h3>
                        <p className="text-gray-600 text-sm md:text-base">087817090619</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-red-100 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                        <Mail className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold mb-1">Email</h3>
                        <p className="text-gray-600 text-sm md:text-base break-all">
                          seventeenrentcarbandung@gmail.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-red-100 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                        <Clock className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold mb-1">Jam Operasional</h3>
                        <p className="text-gray-600 text-sm md:text-base">Senin - Minggu: 08.00 - 20.00 WIB</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="mt-6 md:mt-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Lokasi Kami</h2>
              <div className="h-[250px] md:h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7976517983897!2d107.6082858!3d-6.9073553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c5e8866e5%3A0x37be7ac9d575f8ec!2sJl.%20Kembar%20Baru%2C%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1648226305921!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Seventeen Rentcar"
                  aria-label="Peta lokasi Seventeen Rentcar"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
