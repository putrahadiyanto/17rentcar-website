'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { login as apiLogin } from '@/lib/auth-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const redirectPath = searchParams.get('redirect') || '/admin/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            console.log('Attempting login with:', { email });
            const response = await apiLogin({ email, password });
            console.log('Login successful!', response);

            setError('Login successful! Redirecting to dashboard...');
            setTimeout(() => {
                router.push(redirectPath);
            }, 1000);
        } catch (error: any) {
            console.error('Login error:', error);
            if (error instanceof Error && error.message === 'Login failed') {
                setError('Email atau password salah. Silakan coba lagi.');
            } else {
                setError(`Terjadi kesalahan: ${error.message || 'Unknown error'}. Silakan coba lagi.`);
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <Card className="shadow-lg">
                    <CardHeader className="pb-4 pt-6">
                        <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access the admin panel
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>                        <CardContent className="space-y-2 px-6">
                        {error && (<Alert
                            variant={error.includes('successful') ? "default" : "destructive"}
                            className={error.includes('successful') ? "bg-green-50 border-green-500 text-green-700" : ""}
                        >
                            <div className="flex items-center gap-2">
                                {error.includes('successful')
                                    ? <CheckCircle className="h-4 w-4 text-green-600" />
                                    : <AlertCircle className="h-4 w-4" />
                                }
                                <AlertDescription>{error}</AlertDescription>
                            </div>
                        </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </CardContent>
                        <CardFooter className="px-6 pt-4 pb-6">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    "w-full",
                                    isLoading && "opacity-70 cursor-not-allowed"
                                )}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
                <div className="flex justify-center mt-6">
                    <Link
                        href="/"
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
