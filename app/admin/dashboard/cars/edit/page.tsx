'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { ChevronLeft, Save, Upload } from 'lucide-react';
import { carData } from '@/data/car-data';
import { CarType } from '@/types/car';

// Form validation schema
const carFormSchema = z.object({
  id: z.string(),
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

type FormValues = z.infer<typeof carFormSchema>;

export default function EditCarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams?.get('id');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      id: '',
      name: '',
      brand: '',
      type: '',
      price: 0,
      image: '',
      capacity: 0,
      transmission: '',
      fuelType: '',
      year: 2000,
      color: '',
      shortDescription: '',
      description: '',
      whatsappLink: '',
      isVisible: true,
    },
  });

  // Load car data on component mount
  useEffect(() => {
    if (!carId) {
      setError('Car ID is required');
      setIsLoading(false);
      return;
    }

    try {
      // Find the car by ID
      const car = carData.find(car => car.id === carId);

      if (!car) {
        setError('Car not found');
        setIsLoading(false);
        return;
      }

      // Set form values
      form.reset({
        id: car.id,
        name: car.name,
        brand: car.brand,
        type: car.type,
        price: car.price,
        image: car.image,
        capacity: car.capacity,
        transmission: car.transmission,
        fuelType: car.fuelType,
        year: car.year,
        color: car.color,
        shortDescription: car.shortDescription,
        description: car.description,
        whatsappLink: '', // This field doesn't exist in the original data
        isVisible: true, // This field doesn't exist in the original data
      });

      setIsLoading(false);
    } catch (err) {
      console.error('Error loading car data:', err);
      setError('Failed to load car data');
      setIsLoading(false);
    }
  }, [carId, form]);

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // In a real app, you would send this data to an API
      // For now, we'll just mock the update and show a success message
      console.log('Updated car data:', values);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success alert and redirect back to dashboard
      alert('Car updated successfully!');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Failed to update car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading car data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminHeader />
        <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <div className="mt-4">
              <Button onClick={() => router.push('/admin/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Edit Mobil</h1>
          <p className="mt-1 text-gray-500">Edit informasi mobil yang ada.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Edit Mobil</CardTitle>
            <CardDescription>
              Update informasi mobil sesuai kebutuhan.
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

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/admin/dashboard')}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Menyimpan...</>
                    ) : (
                      <>
                        <Save className="h-4 w-4" /> Simpan Perubahan
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