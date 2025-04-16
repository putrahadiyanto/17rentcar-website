import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "17Rentcar Bandung - Rental Mobil & Paket Wisata Terpercaya",
  description:
    "Layanan rental mobil dan paket wisata terpercaya di Bandung dengan armada berkualitas dan harga terjangkau. Tersedia berbagai pilihan mobil dan paket wisata untuk kebutuhan perjalanan Anda.",
  keywords:
    "rental mobil bandung, sewa mobil bandung, paket wisata bandung, tour bandung, seventeen rentcar, 17rentcar, rental mobil murah, sewa mobil murah",
}

export default function Home() {
  return <ClientPage />
}
