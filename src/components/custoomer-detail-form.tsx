"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

import React from 'react'
import { Loader } from "lucide-react";

const RegisterCustomer = () => {

    const router = useRouter();
    const { toast } = useToast()
    const [emergencyContact, setEmergencyContact] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const userId = useSelector((state: RootState) => state.auth.userId);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Make the Axios request to your login endpoint
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/register-customer`, {
                emergencyContact,
                userId: userId,
            }, { withCredentials: true });

            console.log(response.data);
            setLoading(false);
            toast({
                title: "Success",
                description: "Login successful",
            })
            //redirect to login page
            router.push('/login'); // Redirect customers to login
                } catch (error) {
            // Handle error in case of failure
            console.error(error);
            toast({
                variant: "default",
                title: "Error",
                description: (error as { response: { data: { error: string } } }).response.data.error,
            })
            setError((error as { response: { data: { error: string } } }).response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl"></div>
            <div className="flex flex-col gap-6">
                <Card className="overflow-hidden">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form onSubmit={handleSubmit} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Registering as Customer</h1>
                                    <p className="text-balance text-muted-foreground">
                                        Provide the following details to continue
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                                    <Input
                                        id="emergencyContact"
                                        type="emergencyContact"
                                        placeholder="98*******"
                                        value={emergencyContact}
                                        onChange={(e) => setEmergencyContact(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Loader/> : "Submit"}
                                </Button>
                                {error && (
                                    <div className="text-red-500 text-center mt-2">{error}</div>
                                )}

                            </div>
                        </form>
                        <div className="relative hidden bg-muted md:block bg-white p-5">
                            <img
                                src="https://img.freepik.com/free-vector/sales-representative-abstract-concept_335657-3002.jpg"
                                alt="Image"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale p-5"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default RegisterCustomer
