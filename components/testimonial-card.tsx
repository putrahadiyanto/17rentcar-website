"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

interface TestimonialCardProps {
  name: string
  testimonial: string
  rating: number
}

export default function TestimonialCard({ name, testimonial, rating }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="overflow-hidden h-full">
        <CardContent className="p-6">
          <motion.div
            className="flex mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Star className={`h-5 w-5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            "{testimonial}"
          </motion.p>
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <span className="font-medium">{name.charAt(0)}</span>
            </div>
            <div>
              <h4 className="font-medium">{name}</h4>
              <p className="text-sm text-gray-500">Pelanggan</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
