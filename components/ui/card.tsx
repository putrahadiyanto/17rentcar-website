"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

const cardVariants = cva(
  "relative flex w-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border bg-card text-card-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  children?: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div ref={ref} className={cn(cardVariants({ ...props }), className)} {...props}>
        {children}
      </div>
    </motion.div>
  )
})
Card.displayName = "Card"

export const CardHeader = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <header className="p-4 border-b border-border" {...props}>
    {children}
  </header>
)

export const CardTitle = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className="text-lg font-bold mb-1" {...props}>
    {children}
  </h3>
)

export const CardDescription = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className="text-sm text-muted-foreground" {...props}>
    {children}
  </p>
)

export const CardContent = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="p-4" {...props}>
    {children}
  </div>
)

export const CardFooter = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <footer className="p-4 border-t border-border" {...props}>
    {children}
  </footer>
)

export { Card, type CardProps }
