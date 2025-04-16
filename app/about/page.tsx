import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Check, Users, Award, ThumbsUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Tentang Kami</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Seventeen Rentcar Bandung adalah penyedia jasa transportasi wisata terpercaya di Bandung
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=600"
            alt="Seventeen Rentcar Bandung"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Sejarah Kami</h2>
          <p className="text-gray-600 mb-4">
            Seventeen Rentcar Bandung didirikan dengan visi untuk menyediakan layanan transportasi wisata yang aman,
            nyaman, dan terjangkau bagi wisatawan yang berkunjung ke Bandung dan sekitarnya.
          </p>
          <p className="text-gray-600 mb-4">
            Berawal dari armada kecil, kini kami telah berkembang menjadi salah satu penyedia jasa rental mobil dan
            paket wisata terpercaya di Bandung dengan berbagai pilihan kendaraan dan layanan yang dapat disesuaikan
            dengan kebutuhan pelanggan.
          </p>
          <p className="text-gray-600 mb-6">
            Komitmen kami adalah memberikan pengalaman perjalanan yang berkesan dengan pelayanan prima dan armada
            berkualitas, didukung oleh tim profesional yang berpengalaman dalam industri pariwisata.
          </p>
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="/contact">Hubungi Kami</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">1000+</h3>
          <p className="text-gray-600">Pelanggan Puas</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">5+</h3>
          <p className="text-gray-600">Tahun Pengalaman</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">20+</h3>
          <p className="text-gray-600">Armada Kendaraan</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">100%</h3>
          <p className="text-gray-600">Kepuasan Pelanggan</p>
        </div>
      </div>

      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Visi & Misi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Komitmen kami untuk memberikan layanan terbaik</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-4">Visi</h3>
            <p className="text-gray-600">
              Menjadi penyedia jasa transportasi wisata terdepan di Bandung yang dikenal dengan kualitas layanan prima,
              armada terbaik, dan kepuasan pelanggan yang tinggi.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold mb-4">Misi</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Menyediakan armada kendaraan berkualitas dengan kondisi prima</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Memberikan pelayanan profesional dengan driver berpengalaman</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Menawarkan harga yang kompetitif dan transparan</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Mengutamakan keselamatan dan kenyamanan pelanggan</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>Terus berinovasi dalam layanan untuk memenuhi kebutuhan pelanggan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Tim Kami</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Didukung oleh tim profesional yang berpengalaman</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
          <div className="relative h-64">
            <Image src="/placeholder.svg?height=400&width=300" alt="Ridno Prayogo" fill className="object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-1">Ridno Prayogo</h3>
            <p className="text-gray-600 mb-4">Marketing Manager</p>
            <p className="text-gray-600">
              Bertanggung jawab atas strategi pemasaran dan pengembangan bisnis Seventeen Rentcar Bandung.
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
          <div className="relative h-64">
            <Image src="/placeholder.svg?height=400&width=300" alt="Team Member" fill className="object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-1">Budi Santoso</h3>
            <p className="text-gray-600 mb-4">Operational Manager</p>
            <p className="text-gray-600">Mengawasi operasional harian dan memastikan kualitas layanan tetap terjaga.</p>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
          <div className="relative h-64">
            <Image src="/placeholder.svg?height=400&width=300" alt="Team Member" fill className="object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-1">Siti Rahayu</h3>
            <p className="text-gray-600 mb-4">Customer Service</p>
            <p className="text-gray-600">Menangani reservasi dan memastikan kepuasan pelanggan dalam setiap layanan.</p>
          </div>
        </div>
      </div>

      <div className="bg-red-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Siap Untuk Perjalanan Anda?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Hubungi kami sekarang untuk mendapatkan penawaran terbaik untuk kebutuhan transportasi Anda
        </p>
        <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100">
          <Link href="/contact">Hubungi Kami</Link>
        </Button>
      </div>
    </div>
  )
}
