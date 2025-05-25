'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ChevronLeft, Plus, Upload, X, Car, Image as ImageIcon, Loader2 } from 'lucide-react';
import { carData } from '@/data/car-data';
import Image from 'next/image';
import AdminCarService from '@/lib/admin-car-service';

// Available car features
const AVAILABLE_FEATURES = [
  'AC Double Blower',
  'Audio System',
  'Power Window',
  'Power Steering',
  'Kursi Lipat',
  'Bagasi Luas',
  'ABS',
  'Airbags',
  'Bluetooth Connectivity',
  'Parking Camera',
  'GPS Navigation',
  'Sunroof',
];

// Available transmissions
const TRANSMISSIONS = [
  'Manual',
  'Automatic',
];  // Form validation schema
const carFormSchema = z.object({
  name: z.string().min(2, { message: 'Nama harus minimal 2 karakter' }),
  brand: z.string().min(1, { message: 'Merek wajib diisi' }),
  type: z.string().min(1, { message: 'Tipe wajib diisi' }),
  price: z.coerce.number().positive({ message: 'Harga harus bernilai positif' }),
  image: z.string().min(1, { message: 'Path gambar wajib diisi' }),
  capacity: z.coerce.number().int().positive({ message: 'Kapasitas harus berupa angka positif' }),
  transmission: z.array(z.string()).min(1, { message: 'Pilih minimal satu transmisi' }),
  fuelType: z.string().min(1, { message: 'Jenis bahan bakar wajib diisi' }),
  year: z.coerce.number().int().min(2000, { message: 'Tahun harus 2000 atau lebih baru' }),
  shortDescription: z.string().min(10, { message: 'Deskripsi singkat minimal 10 karakter' }),
  description: z.string().min(20, { message: 'Deskripsi lengkap minimal 20 karakter' }),
  features: z.array(z.string()).min(1, { message: 'Pilih minimal satu fitur' }),
  isShowing: z.boolean().default(true),
  // Note: color field removed from schema
});

export default function AddCarPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);
  const [featureInput, setFeatureInput] = useState('');
  const [customFeatures, setCustomFeatures] = useState<string[]>([]);

  // Combine preset features with custom ones
  const allFeatures = [...AVAILABLE_FEATURES, ...customFeatures.filter((f: string) => !AVAILABLE_FEATURES.includes(f))];

  // Initialize the form with empty values as placeholders
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      name: '',
      brand: '',
      type: '',
      price: undefined,
      image: '',
      capacity: undefined,
      transmission: [],
      fuelType: '',
      year: undefined,
      shortDescription: '',
      description: '',
      features: [],
      isShowing: true
    },
  });

  // Add custom feature
  const addCustomFeature = () => {
    if (featureInput && !allFeatures.includes(featureInput)) {
      setCustomFeatures([...customFeatures, featureInput]);
      setFeatureInput('');
    }
  };
  // Watch for file selection and update preview
  React.useEffect(() => {
    if (selectedImageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(selectedImageFile);
    } else {
      setPreviewImage(null);
    }
  }, [selectedImageFile]);  // No longer need handleFileUpload since we only upload on form submission// Handle form submission
  const onSubmit = async (values: z.infer<typeof carFormSchema>) => {
    setIsSubmitting(true);

    try {
      // Upload the image only on form submission
      let imagePath = null;

      if (selectedImageFile) {
        // Set uploading state to show feedback to user
        setIsUploading(true);
        console.log('Uploading image to images/cars directory on form submit...');

        // Upload the image now when form is submitted
        imagePath = await AdminCarService.uploadImage(selectedImageFile);

        if (!imagePath) {
          setIsUploading(false);
          throw new Error('Failed to upload image to images/cars directory');
        }

        console.log('Image successfully uploaded to: ' + imagePath);

        // Store the uploaded path
        setUploadedImagePath(imagePath);
        setIsUploading(false);
      } else {
        throw new Error('Mohon pilih gambar mobil');
      }

      // Update the form values with the actual image path
      const carData = {
        ...values,
        image: imagePath
      };

      console.log('Sending car data to API:', carData);

      // Send car data to the API using AdminCarService
      const result = await AdminCarService.createCar(carData);

      if (result) {
        // Show success alert and redirect back to dashboard
        alert('Mobil berhasil ditambahkan!');
        router.push('/admin/dashboard');
      } else {
        throw new Error('Gagal menambahkan data mobil');
      }
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Gagal menambahkan mobil: ' + (error instanceof Error ? error.message : 'Silakan coba lagi.'));
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
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
        <div className="flex justify-center">

          {/* Form Card */}
          <Card className="">
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
                    />                  {/* Transmission Multiple Selection */}
                    <FormField
                      control={form.control}
                      name="transmission"
                      render={() => (
                        <FormItem>
                          <FormLabel>Transmisi</FormLabel>
                          <FormDescription>
                            Pilih semua jenis transmisi yang tersedia
                          </FormDescription>
                          <div className="space-y-2">
                            {TRANSMISSIONS.map((item) => {
                              const tooltips = {
                                'Manual': 'Transmisi manual konvensional dengan perpindahan gigi oleh pengemudi',
                                'Automatic': 'Transmisi otomatis dengan perpindahan gigi secara otomatis',
                                'CVT': 'Continuously Variable Transmission, transmisi tanpa perpindahan gigi tetap',
                                'DCT': 'Dual Clutch Transmission, transmisi otomatis dengan perpindahan gigi cepat'
                              };

                              return (
                                <FormField
                                  key={item}
                                  control={form.control}
                                  name="transmission"
                                  render={({ field }) => {
                                    return (
                                      <TooltipProvider key={item}>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <FormItem
                                              className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(item)}
                                                  onCheckedChange={(checked) => {
                                                    return checked
                                                      ? field.onChange([...field.value || [], item])
                                                      : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== item
                                                        )
                                                      );
                                                  }}
                                                />
                                              </FormControl>
                                              <FormLabel className="font-normal cursor-pointer">
                                                {item}
                                              </FormLabel>
                                            </FormItem>
                                          </TooltipTrigger>
                                          <TooltipContent side="right">
                                            {tooltips[item as keyof typeof tooltips]}
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    );
                                  }}
                                />
                              );
                            })}
                          </div>
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
                    /><FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Gambar Mobil</FormLabel>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">                              <FormControl>
                              <div className="flex flex-col gap-2">                                <Input
                                type="file"
                                accept="image/*"
                                disabled={isUploading}
                                onChange={e => {
                                  const file = e.target.files?.[0] || null;
                                  setSelectedImageFile(file);
                                  if (file) {
                                    // Just set a temporary value and show preview, but don't upload yet
                                    field.onChange(file.name);
                                  } else {
                                    field.onChange('');
                                    setUploadedImagePath(null);
                                  }
                                }}
                              />                                {isUploading && (
                                <div className="flex items-center text-sm text-blue-600">
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                  <span>Mengunggah gambar ke /images/cars...</span>
                                </div>
                              )}
                                {selectedImageFile && !isUploading && (
                                  <div className="text-sm text-gray-600">
                                    Gambar akan diunggah saat form dikirim
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            </div>
                            {previewImage && (
                              <div className="relative h-32 rounded-md overflow-hidden border">
                                <div className="absolute top-1 right-1 z-10">
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    size="icon"
                                    className="h-6 w-6 rounded-full bg-gray-800/50 backdrop-blur-sm border-0" onClick={() => {
                                      setPreviewImage(null);
                                      setSelectedImageFile(null);
                                      setUploadedImagePath(null);
                                      field.onChange('');
                                    }}
                                  >
                                    <X className="h-3 w-3 text-white" />
                                  </Button>
                                </div>
                                <Image
                                  src={previewImage}
                                  alt="Preview"
                                  className="object-contain h-full w-full"
                                  width={150}
                                  height={100}
                                />
                              </div>
                            )}
                          </div>
                          <FormDescription>
                            Upload gambar mobil (format: jpg, png, dll)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Features Section */}
                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fitur Mobil</FormLabel>
                        <FormDescription>
                          Pilih fitur-fitur yang tersedia dalam mobil
                        </FormDescription>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                          {AVAILABLE_FEATURES.map((feature) => (
                            <FormField
                              key={feature}
                              control={form.control}
                              name="features"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={feature}
                                    className="flex items-center space-x-2 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(feature)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value || [], feature])
                                            : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== feature
                                              )
                                            );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm cursor-pointer">
                                      {feature}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>

                        {/* Add custom feature */}
                        <div className="flex items-center gap-2 mt-4">
                          <Input
                            placeholder="Tambah fitur kustom..."
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            className="flex-1"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addCustomFeature();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addCustomFeature}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Tambah
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                  </div>                {/* Visibility toggle */}
                  <FormField
                    control={form.control}
                    name="isShowing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
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
                  />                <div className="sticky bottom-0 pt-6 pb-2 bg-white border-t mt-8">
                    <div className="flex justify-between items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/admin/dashboard')}
                        disabled={isSubmitting}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Kembali
                      </Button>
                      <div className="flex items-center gap-2">                        <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 min-w-[120px]"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {isUploading ? 'Mengunggah gambar ke images/cars...' : 'Menyimpan data mobil...'}
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4" /> Tambah Mobil & Unggah Gambar
                          </>
                        )}
                      </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

// This page is protected by middleware. No client-side auth logic is needed.