"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

interface ApiErrorProps {
    message?: string
    onRetry?: () => void
}

export default function ApiError({ message = "Gagal memuat data", onRetry }: ApiErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ups! Terjadi Kesalahan</h2>
            <p className="text-gray-600 mb-6 max-w-md">{message}</p>
            <div className="flex flex-col sm:flex-row gap-3">
                {onRetry && (
                    <Button onClick={onRetry} variant="outline">
                        Coba Lagi
                    </Button>
                )}
                <Button asChild className="bg-red-600 hover:bg-red-700">
                    <Link href="/">Kembali ke Beranda</Link>
                </Button>
            </div>
        </div>
    )
}
