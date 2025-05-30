'use client';

import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { carData } from '@/data/car-data';
import { tourPackages } from '@/data/tour-packages';
import {
    Car,
    Edit,
    MapPin,
    MoreVertical,
    Plus,
    Trash2
} from 'lucide-react';
import { useRouter } from "next/navigation";
import axios from 'axios';

export default function AdminDashboard() {
    const router = useRouter();
    const [cars, setCars] = useState(() => [...carData]);
    const [visibleCars, setVisibleCars] = useState<{ [key: string]: boolean }>(() => {
        // Inisialisasi semua mobil sebagai terlihat secara default
        const initialState: { [key: string]: boolean } = {};
        carData.forEach(car => {
            initialState[car.id] = true;
        });
        return initialState;
    });    // We'll rely solely on the global AuthProvider for authentication

    const toggleCarVisibility = (carId: string) => {
        setVisibleCars(prev => ({
            ...prev,
            [carId]: !prev[carId]
        }));

        // In a real application, this would be saved to a database
        console.log(`Visibilitas mobil ${carId} diubah menjadi: ${!visibleCars[carId]}`);

        // Show feedback to the user
        const status = !visibleCars[carId] ? 'ditampilkan' : 'disembunyikan';
        alert(`Mobil akan ${status} di beranda`);
    };

    const handleDeleteCar = (carId: string) => {
        if (confirm('Yakin ingin menghapus mobil ini? Tindakan ini tidak dapat dibatalkan.')) {
            // Remove from local state (mock deletion)
            setCars(prevCars => prevCars.filter(car => car.id !== carId));

            // Remove from visibility state
            setVisibleCars((prev) => {
                const newState = { ...prev };
                delete newState[carId];
                return newState;
            });

            // In a real app, this would call an API to delete the car
            alert('Mobil berhasil dihapus');
        }
    };    // Authentication is now handled by the AuthProvider in layout.tsx

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dasbor</h1>
                    <p className="mt-1 text-gray-500">Selamat datang di dasbor admin 17RentCar.</p>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                        <TabsTrigger value="cars">Mobil</TabsTrigger>
                        <TabsTrigger value="tours">Paket Wisata</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                            <Card className="h-full">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                                    <div>
                                        <CardTitle className="text-sm font-medium">Sewa Mobil</CardTitle>
                                        <CardDescription>Total mobil tersedia</CardDescription>
                                    </div>                                    <Car className="h-5 w-5 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{cars.length}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        +2 ditambahkan bulan ini
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="h-full">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                                    <div>
                                        <CardTitle className="text-sm font-medium">Paket Wisata</CardTitle>
                                        <CardDescription>Total paket tersedia</CardDescription>
                                    </div>
                                    <MapPin className="h-5 w-5 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{tourPackages.length}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        +1 ditambahkan bulan ini
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Popularitas Mobil</CardTitle>
                                    <CardDescription>Mobil paling banyak dilihat di platform</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Model Mobil</TableHead>
                                                <TableHead>Tipe</TableHead>
                                                <TableHead>Jumlah Dilihat</TableHead>
                                                <TableHead>Tren</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[{
                                                model: "Toyota Avanza",
                                                type: "MPV",
                                                views: "1.245",
                                                trend: "Naik"
                                            }, {
                                                model: "Honda Brio",
                                                type: "Hatchback",
                                                views: "1.120",
                                                trend: "Naik"
                                            }, {
                                                model: "Toyota Innova",
                                                type: "MPV",
                                                views: "987",
                                                trend: "Naik"
                                            }, {
                                                model: "Honda HR-V",
                                                type: "SUV",
                                                views: "842",
                                                trend: "Turun"
                                            }, {
                                                model: "Daihatsu Xenia",
                                                type: "MPV",
                                                views: "765",
                                                trend: "Stabil"
                                            }].map((car, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{car.model}</TableCell>
                                                    <TableCell>{car.type}</TableCell>
                                                    <TableCell>{car.views}</TableCell>
                                                    <TableCell>
                                                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${car.trend === "Naik"
                                                            ? "bg-green-100 text-green-800"
                                                            : car.trend === "Turun"
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-gray-100 text-gray-800"
                                                            }`}>
                                                            {car.trend}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                        </div>
                    </TabsContent>
                    <TabsContent value="cars">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Inventaris Mobil</h2>
                            <Button size="sm" className="flex items-center gap-1" onClick={() => router.push("/admin/dashboard/cars/add")}>
                                <Plus className="h-4 w-4" /> Tambah Mobil Baru
                            </Button>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Tipe</TableHead>
                                        <TableHead>Kapasitas</TableHead>
                                        <TableHead className="hidden md:table-cell">Transmisi</TableHead>
                                        <TableHead className="text-right">Harga/Hari</TableHead>
                                        <TableHead>Tampilkan di Beranda</TableHead>
                                        <TableHead className="w-[100px]">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>                                <TableBody>
                                    {cars.slice(0, 5).map((car) => (
                                        <TableRow key={car.id}>
                                            <TableCell className="font-medium">{car.name}</TableCell>
                                            <TableCell>{car.type}</TableCell>
                                            <TableCell>{car.capacity} Orang</TableCell>
                                            <TableCell className="hidden md:table-cell">{car.transmission}</TableCell>
                                            <TableCell className="text-right">Rp {car.price.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={visibleCars[car.id] || false}
                                                            onChange={() => toggleCarVisibility(car.id)}
                                                        />
                                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => router.push(`/admin/dashboard/cars/edit?id=${car.id}`)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={() => handleDeleteCar(car.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {cars.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                                Tidak ada data mobil yang tersedia.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>                        <div className="flex justify-center mt-4">
                            <Button variant="outline" onClick={() => {
                                // In a real app, this would navigate to a dedicated page showing all cars
                                // For now we'll just alert since we're using mock data
                                alert('Halaman ini akan menampilkan semua daftar mobil. Fitur ini masih dalam pengembangan.');
                            }}>
                                Lihat Semua Mobil ({cars.length})
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="tours">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Paket Wisata</h2>
                            <Button size="sm" className="flex items-center gap-1">
                                <Plus className="h-4 w-4" /> Tambah Paket
                            </Button>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Paket</TableHead>
                                        <TableHead className="hidden md:table-cell">Durasi</TableHead>
                                        <TableHead>Destinasi</TableHead>
                                        <TableHead className="text-right">Harga</TableHead>
                                        <TableHead className="w-[100px]">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tourPackages.slice(0, 4).map((tour) => (
                                        <TableRow key={tour.id}>
                                            <TableCell className="font-medium">{tour.name}</TableCell>
                                            <TableCell className="hidden md:table-cell">{tour.duration}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                                    <span className="truncate max-w-[150px]">
                                                        {tour.destinations.slice(0, 2).join(", ")}
                                                        {tour.destinations.length > 2 && "..."}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">Rp {tour.price.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Button variant="outline">Lihat Semua paket</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
