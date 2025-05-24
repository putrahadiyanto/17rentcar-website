'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ChevronLeft, Plus, Upload } from 'lucide-react';
import { carData } from '@/data/car-data';

// Form validation schema
const carFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number' }),
  image: z.string().min(1, { message: 'Image path is required' }),
  capacity: z.coerce.number().int().positive({ message: 'Capacity must be a positive integer' }),
  transmission: z.string().min(1, { message: 'Transmission is required' }),
  fuelType: z.string().min(1, { message: 'Fuel type is required' }),
  year: z.coerce.number().int().min(2000, { message: 'Year must be 2000 or later' }),
  color: z.string().min(1, { message: 'Color is required' }),
  shortDescription: z.string().min(10, { message: 'Short description must be at least 10 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  whatsappLink: z.string().url({ message: 'Please enter a valid URL' }).optional(),
  isVisible: z.boolean().default(true),
});

export default function AddCarPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      name: '',
      brand: '',
      type: '',
      price: 0,
      image: '/images/cars/placeholder.png',
      capacity: 0,
      transmission: '',
      fuelType: '',
      year: new Date().getFullYear(),
      color: '',
      shortDescription: '',
      description: '',
      whatsappLink: '',
      isVisible: true,
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof carFormSchema>) => {
    setIsSubmitting(true);

    try {
      // In a real app, you would send this data to an API
      // For now, we'll just mock the addition and show a success message
      console.log('New car data:', values);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success alert and redirect back to dashboard
      alert('Car added successfully!');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to add car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-1"
          onClick={() => router.push('/admin/dashboard')}
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali ke Dasbor
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tambah Mobil Baru</h1>
          <p className="mt-1 text-gray-500">Tambahkan detail mobil baru ke database.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Mobil Baru</CardTitle>
            <CardDescription>
              Isi semua informasi yang diperlukan untuk menambahkan mobil baru.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Basic Information */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Mobil</FormLabel>
                        <FormControl>
                          <Input placeholder="Toyota Avanza" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Merek</FormLabel>
                        <FormControl>
                          <Input placeholder="Toyota" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipe</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tipe mobil" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MPV">MPV</SelectItem>
                            <SelectItem value="SUV">SUV</SelectItem>
                            <SelectItem value="Sedan">Sedan</SelectItem>
                            <SelectItem value="Hatchback">Hatchback</SelectItem>
                            <SelectItem value="Minibus">Minibus</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Harga Per Hari (Rp)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="350000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kapasitas Penumpang</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="7" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmisi</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jenis transmisi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Manual">Manual</SelectItem>
                            <SelectItem value="Automatic">Automatic</SelectItem>
                            <SelectItem value="CVT">CVT</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fuelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bahan Bakar</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jenis bahan bakar" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Bensin">Bensin</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="Listrik">Listrik</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tahun</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warna</FormLabel>
                        <FormControl>
                          <Input placeholder="Putih" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsappLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Link (Opsional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://wa.me/628123456789" {...field} />
                        </FormControl>
                        <FormDescription>
                          Link WhatsApp untuk pemesanan langsung
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Path Gambar</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input placeholder="/images/cars/avanza.png" {...field} />
                          </FormControl>
                          <Button type="button" variant="outline" size="icon" className="h-10 w-10">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                        <FormDescription>
                          Path relatif ke file gambar dalam folder public
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi Singkat</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="MPV 7 seater yang nyaman dan ekonomis untuk perjalanan keluarga"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi Lengkap</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Deskripsi detail tentang mobil"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Visibility toggle */}
                <FormField
                  control={form.control}
                  name="isVisible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Tampilkan di Beranda</FormLabel>
                        <FormDescription>
                          Aktifkan untuk menampilkan mobil ini di halaman beranda website
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      <>Menyimpan...</>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" /> Tambah Mobil
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// This page is protected by middleware. No client-side auth logic is needed.