"use client"

import AnimatedSection from "@/components/animated-section";
import PageTransition from "@/components/page-transition";

export default function TermsPage() {
    return (
        <PageTransition>
            <AnimatedSection className="py-16 bg-white min-h-screen">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Syarat dan Ketentuan</h1>
                    <ol className="list-decimal pl-6 space-y-4 text-gray-700 text-base md:text-lg">
                        <li>
                            Penyewa wajib menunjukkan identitas diri (KTP/SIM) yang masih berlaku saat pengambilan kendaraan.
                        </li>
                        <li>
                            Usia minimal penyewa adalah 21 tahun dan memiliki SIM A yang masih berlaku.
                        </li>
                        <li>
                            Pembayaran dilakukan di muka sebelum kendaraan digunakan.
                        </li>
                        <li>
                            Dilarang menggunakan kendaraan untuk tindakan melanggar hukum.
                        </li>
                        <li>
                            Denda akan dikenakan jika terjadi keterlambatan pengembalian kendaraan.
                        </li>
                        <li>
                            Segala kerusakan atau kehilangan akibat kelalaian penyewa menjadi tanggung jawab penyewa.
                        </li>
                        <li>
                            Bahan bakar dikembalikan sesuai dengan kondisi awal saat serah terima kendaraan.
                        </li>
                        <li>
                            Tidak diperkenankan membawa kendaraan keluar kota tanpa izin dari pihak rental.
                        </li>
                        <li>
                            Dilarang memindahtangankan atau menyewakan kembali kendaraan kepada pihak lain.
                        </li>
                        <li>
                            Syarat dan ketentuan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.
                        </li>
                    </ol>
                </div>
            </AnimatedSection>
        </PageTransition>
    );
}
