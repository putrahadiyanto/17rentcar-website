import type { TourPackageType } from "@/types/tour-package"

export const tourPackages: TourPackageType[] = [
  {
    id: "bandung-city-tour",
    name: "Bandung City Tour",
    shortDescription: "Jelajahi tempat-tempat ikonik di Kota Bandung",
    description:
      "Nikmati perjalanan satu hari penuh menjelajahi tempat-tempat ikonik di Kota Bandung. Mulai dari Gedung Sate, Alun-alun Bandung, hingga Jalan Braga yang bersejarah. Paket ini juga termasuk kunjungan ke pusat perbelanjaan factory outlet terkenal di Bandung.",
    image: "/placeholder.svg?height=400&width=600",
    price: 350000,
    duration: "1 Hari",
    minPeople: 2,
    destinations: ["Gedung Sate", "Alun-alun Bandung", "Jalan Braga", "Factory Outlet"],
    itinerary: [
      {
        activities: [
          {
            time: "08",
            title: "Penjemputan di Hotel",
            description: "Driver akan menjemput Anda di hotel tempat Anda menginap",
          },
          {
            time: "09",
            title: "Gedung Sate",
            description: "Mengunjungi ikon kota Bandung yang terkenal dengan arsitektur kolonial Belanda",
          },
          {
            time: "11",
            title: "Alun-alun Bandung",
            description: "Menikmati suasana pusat kota Bandung dan Masjid Raya Bandung",
          },
          {
            time: "12",
            title: "Makan Siang",
            description: "Menikmati kuliner khas Bandung di restoran lokal",
          },
          {
            time: "14",
            title: "Jalan Braga",
            description: "Menelusuri jalan bersejarah dengan bangunan-bangunan kolonial",
          },
          {
            time: "16",
            title: "Factory Outlet",
            description: "Berbelanja di pusat factory outlet terkenal di Bandung",
          },
          {
            time: "18",
            title: "Kembali ke Hotel",
            description: "Driver akan mengantar Anda kembali ke hotel",
          },
        ],
      },
    ],
    includes: [
      "Transportasi AC",
      "Driver berpengalaman",
      "Tiket masuk objek wisata",
      "Makan siang",
      "Air mineral",
      "Asuransi perjalanan",
    ],
    excludes: ["Pengeluaran pribadi", "Makan malam", "Oleh-oleh dan belanja"],
  },
  {
    id: "lembang-adventure",
    name: "Lembang Adventure",
    shortDescription: "Petualangan seru di kawasan Lembang yang sejuk",
    description:
      "Nikmati petualangan seru di kawasan Lembang yang sejuk dengan mengunjungi berbagai tempat wisata populer seperti Farm House, Floating Market, dan Tangkuban Perahu. Paket ini menawarkan pengalaman wisata alam dan budaya yang lengkap di kawasan Bandung Utara.",
    image: "/placeholder.svg?height=400&width=600",
    price: 450000,
    duration: "1 Hari",
    minPeople: 2,
    destinations: ["Farm House", "Floating Market", "Tangkuban Perahu", "Ciater Hot Spring"],
    itinerary: [
      {
        activities: [
          {
            time: "07",
            title: "Penjemputan di Hotel",
            description: "Driver akan menjemput Anda di hotel tempat Anda menginap",
          },
          {
            time: "08",
            title: "Farm House Lembang",
            description: "Mengunjungi tempat wisata dengan konsep peternakan Eropa",
          },
          {
            time: "10",
            title: "Floating Market Lembang",
            description: "Menikmati suasana pasar terapung dan berbagai kuliner khas",
          },
          {
            time: "12",
            title: "Makan Siang",
            description: "Menikmati kuliner khas Sunda di restoran lokal",
          },
          {
            time: "14",
            title: "Tangkuban Perahu",
            description: "Mengunjungi gunung berapi yang terkenal dengan kawahnya",
          },
          {
            time: "16",
            title: "Ciater Hot Spring",
            description: "Berendam di pemandian air panas alami",
          },
          {
            time: "18",
            title: "Kembali ke Hotel",
            description: "Driver akan mengantar Anda kembali ke hotel",
          },
        ],
      },
    ],
    includes: [
      "Transportasi AC",
      "Driver berpengalaman",
      "Tiket masuk objek wisata",
      "Makan siang",
      "Air mineral",
      "Asuransi perjalanan",
    ],
    excludes: ["Pengeluaran pribadi", "Makan malam", "Oleh-oleh dan belanja"],
  },
  {
    id: "ciwidey-tour",
    name: "Ciwidey Tour",
    shortDescription: "Eksplorasi keindahan alam Ciwidey yang menakjubkan",
    description:
      "Eksplorasi keindahan alam Ciwidey yang menakjubkan dengan mengunjungi Kawah Putih, Situ Patenggang, dan Kebun Strawberry. Paket ini menawarkan pengalaman wisata alam yang lengkap di kawasan Bandung Selatan dengan pemandangan yang memukau.",
    image: "/placeholder.svg?height=400&width=600",
    price: 500000,
    duration: "1 Hari",
    minPeople: 2,
    destinations: ["Kawah Putih", "Situ Patenggang", "Kebun Strawberry", "Ranca Upas"],
    itinerary: [
      {
        activities: [
          {
            time: "07",
            title: "Penjemputan di Hotel",
            description: "Driver akan menjemput Anda di hotel tempat Anda menginap",
          },
          {
            time: "09",
            title: "Kawah Putih",
            description: "Mengunjungi kawah vulkanik dengan air berwarna putih kehijauan",
          },
          {
            time: "11",
            title: "Situ Patenggang",
            description: "Menikmati keindahan danau di ketinggian dengan legenda romantisnya",
          },
          {
            time: "13",
            title: "Makan Siang",
            description: "Menikmati kuliner khas Sunda di restoran lokal",
          },
          {
            time: "14",
            title: "Kebun Strawberry",
            description: "Memetik strawberry langsung dari kebunnya",
          },
          {
            time: "16",
            title: "Ranca Upas",
            description: "Mengunjungi kawasan konservasi rusa dan camping ground",
          },
          {
            time: "18",
            title: "Kembali ke Hotel",
            description: "Driver akan mengantar Anda kembali ke hotel",
          },
        ],
      },
    ],
    includes: [
      "Transportasi AC",
      "Driver berpengalaman",
      "Tiket masuk objek wisata",
      "Makan siang",
      "Air mineral",
      "Asuransi perjalanan",
    ],
    excludes: ["Pengeluaran pribadi", "Makan malam", "Oleh-oleh dan belanja", "Biaya memetik strawberry"],
  },
  {
    id: "bandung-jakarta-tour",
    name: "Bandung Jakarta Tour",
    shortDescription: "Jelajahi dua kota besar dalam satu paket wisata",
    description:
      "Jelajahi dua kota besar Indonesia, Bandung dan Jakarta, dalam satu paket wisata. Nikmati wisata di tempat-tempat ikonik di kedua kota dengan akomodasi dan transportasi yang nyaman. Paket ini cocok untuk Anda yang ingin mengeksplorasi dua kota besar dalam satu perjalanan.",
    image: "/placeholder.svg?height=400&width=600",
    price: 1500000,
    duration: "3 Hari 2 Malam",
    minPeople: 4,
    destinations: ["Bandung", "Jakarta", "Puncak"],
    itinerary: [
      {
        activities: [
          {
            time: "08",
            title: "Penjemputan di Bandung",
            description: "Driver akan menjemput Anda di meeting point di Bandung",
          },
          {
            time: "09",
            title: "Gedung Sate & Alun-alun Bandung",
            description: "Mengunjungi ikon kota Bandung",
          },
          {
            time: "12",
            title: "Makan Siang",
            description: "Menikmati kuliner khas Bandung",
          },
          {
            time: "14",
            title: "Factory Outlet",
            description: "Berbelanja di pusat factory outlet terkenal",
          },
          {
            time: "16",
            title: "Cihampelas Walk",
            description: "Mengunjungi pusat perbelanjaan modern di Bandung",
          },
          {
            time: "18",
            title: "Check-in Hotel",
            description: "Beristirahat di hotel di Bandung",
          },
        ],
      },
      {
        activities: [
          {
            time: "07",
            title: "Sarapan di Hotel",
            description: "Menikmati sarapan di hotel",
          },
          {
            time: "08",
            title: "Perjalanan ke Puncak",
            description: "Perjalanan menuju kawasan Puncak, Bogor",
          },
          {
            time: "10",
            title: "Kebun Teh Puncak",
            description: "Menikmati pemandangan kebun teh yang hijau",
          },
          {
            time: "12",
            title: "Makan Siang",
            description: "Menikmati kuliner di Puncak",
          },
          {
            time: "14",
            title: "Taman Safari Indonesia",
            description: "Mengunjungi taman safari terbesar di Indonesia",
          },
          {
            time: "17",
            title: "Perjalanan ke Jakarta",
            description: "Melanjutkan perjalanan ke Jakarta",
          },
          {
            time: "19",
            title: "Check-in Hotel",
            description: "Beristirahat di hotel di Jakarta",
          },
        ],
      },
      {
        activities: [
          {
            time: "07",
            title: "Sarapan di Hotel",
            description: "Menikmati sarapan di hotel",
          },
          {
            time: "08",
            title: "Monas",
            description: "Mengunjungi Monumen Nasional, ikon kota Jakarta",
          },
          {
            time: "10",
            title: "Museum Nasional",
            description: "Mengunjungi museum terbesar di Indonesia",
          },
          {
            time: "12",
            title: "Makan Siang",
            description: "Menikmati kuliner khas Jakarta",
          },
          {
            time: "14",
            title: "Ancol Dreamland",
            description: "Berwisata di taman rekreasi tepi pantai",
          },
          {
            time: "17",
            title: "Kembali ke Meeting Point",
            description: "Driver akan mengantar Anda kembali ke meeting point",
          },
        ],
      },
    ],
    includes: [
      "Transportasi AC selama tour",
      "Driver berpengalaman",
      "Hotel 2 malam (1 malam di Bandung, 1 malam di Jakarta)",
      "Sarapan di hotel",
      "Tiket masuk objek wisata",
      "Makan siang 3x",
      "Air mineral",
      "Asuransi perjalanan",
    ],
    excludes: ["Tiket pesawat/kereta", "Makan malam", "Pengeluaran pribadi", "Oleh-oleh dan belanja"],
  },
  {
    id: "west-java-tour",
    name: "West Java Tour",
    shortDescription: "Eksplorasi keindahan Jawa Barat dalam 4 hari",
    description:
      "Eksplorasi keindahan Jawa Barat dalam 4 hari perjalanan yang menakjubkan. Kunjungi berbagai destinasi wisata populer di Jawa Barat seperti Bandung, Bogor, Sukabumi, dan Garut. Paket ini menawarkan pengalaman wisata alam, budaya, dan kuliner yang lengkap di Jawa Barat.",
    image: "/placeholder.svg?height=400&width=600",
    price: 2500000,
    duration: "4 Hari 3 Malam",
    minPeople: 4,
    destinations: ["Bandung", "Bogor", "Sukabumi", "Garut"],
    itinerary: [
      {
        activities: [
          {
            time: "08",
            title: "Penjemputan di Bandung",
            description: "Driver akan menjemput Anda di meeting point di Bandung",
          },
          {
            time: "09",
            title: "Lembang Tour",
            description: "Mengunjungi Farm House dan Floating Market Lembang",
          },
          {
            time: "12",
            title: "Makan Siang",
            description: "Menikmati kuliner khas Sunda",
          },
          {
            time: "14",
            title: "Tangkuban Perahu",
            description: "Mengunjungi gunung berapi yang terkenal",
          },
          {
            time: "17",
            title: "Check-in Hotel",
            description: "Beristirahat di hotel di Bandung",
          },
        ],
      },
      {
        activities: [
          {
            time: "07",
            title: "Sarapan di Hotel",
            description: "Menikmati sarapan di hotel",
          },
          {
            time: "08",
            title: "Perjalanan ke Bogor",
            description: "Perjalanan menuju kota Bogor",
          },
          {
            time: "10",
            title: "Kebun Raya Bogor",
            description: "Mengunjungi kebun botani tertua di Indonesia",
          },
          {
            time: "12",
            title: "Makan Siang",
            description: "Menikmati kuliner khas Bogor",
          },
          {
            time: "14",
            title: "Taman Safari Indonesia",
            description: "Mengunjungi taman safari terbesar di Indonesia",
          },
          {
            time: "17",
            title: "Check-in Hotel",
            description: "Beristirahat di hotel di Bogor",
          },
        ],
      },
      {
        activities: [
          {
            time: "07",
            title: "Sarapan di Hotel",
            description: "Menikmati sarapan di hotel",
          },
          {
            time: "08",
            title: "Perjalanan ke Sukabumi",
            description: "Perjalanan menuju Sukabumi",
          },
          {
            time: "10",
            title: "Pantai Pelabuhan Ratu",
            description: "Menikmati keindahan pantai di Sukabumi",
          },
          {
            time: "12",
            title: "Makan Siang",
            description: "Menikmati seafood segar",
          },
          {
            time: "14",
            title: "Geopark Ciletuh",
            description: "Mengunjungi geopark dengan pemandangan menakjubkan",
          },
          {
            time: "17",
            title: "Check-in Hotel",
            description: "Beristirahat di hotel di Sukabumi",
          },
        ],
      },
      {
        activities: [
          {
            time: "07",
            title: "Sarapan di Hotel",
            description: "Menikmati sarapan di hotel",
          },
          {
            time: "08",
            title: "Perjalanan ke Garut",
            description: "Perjalanan menuju Garut",
          },
          {
            time: "10",
            title: "Cipanas Garut",
            description: "Berendam di pemandian air panas alami",
          },
          {
            time: "12",
            title: "Makan Siang",
            description: "Menikmati kuliner khas Garut",
          },
          {
            time: "14",
            title: "Perjalanan Kembali ke Bandung",
            description: "Kembali ke kota Bandung",
          },
          {
            time: "17",
            title: "Kembali ke Meeting Point",
            description: "Driver akan mengantar Anda kembali ke meeting point",
          },
        ],
      },
    ],
    includes: [
      "Transportasi AC selama tour",
      "Driver berpengalaman",
      "Hotel 3 malam",
      "Sarapan di hotel",
      "Tiket masuk objek wisata",
      "Makan siang 4x",
      "Air mineral",
      "Asuransi perjalanan",
    ],
    excludes: ["Tiket pesawat/kereta", "Makan malam", "Pengeluaran pribadi", "Oleh-oleh dan belanja"],
  },
]
