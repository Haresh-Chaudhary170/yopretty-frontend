"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React from 'react';
import { Loader } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { setServiceProviderId } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

const RegisterServiceProvider = () => {
    const router = useRouter();

    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const userId = useSelector((state: RootState) => state.auth.userId);
    const dispatch = useDispatch();


    // Form State
    const [formData, setFormData] = useState({
        bio: "",
        experience: 1,
        businessName: "",
        categoryId: ""
    });

    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/get-all`);
                setCategories(response.data);
                console.log("Fetched categories:", response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Experience Selection
    const handleExperienceSelect = (value: number) => {
        setFormData({ ...formData, experience: value });
    };

    // Handle Category Selection
    const handleCategoryChange = (value: string) => {
        setFormData({ ...formData, categoryId: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/register-provider`, {
                userId: userId,
                ...formData
            }, { withCredentials: true });

            console.log(response.data);
            toast({
                title: "Success",
                description: "Successfully Registered as a Service Provider.",
            });
            dispatch(setServiceProviderId(response.data.provider.id))
            setLoading(false);
            // nextStep();
            //redirect to login page
            router.push('/login'); // Redirect customers to login
        } catch (error) {
            console.error(error);
            toast({
                variant: "default",
                title: "Error",
                description: (error as { response: { data: { error: string } } }).response.data.error,
            });
            setError((error as { response: { data: { error: string } } }).response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl"></div>
            <div className="flex flex-col gap-6">
                <Card className="overflow-hidden">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form onSubmit={handleSubmit} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Registering as Service Provider</h1>
                                    <p className="text-muted-foreground">
                                        Provide the following details to continue
                                    </p>
                                </div>
                                <div className="grid gap-4">
                                    {/* Business Name */}
                                    <div>
                                        <Label htmlFor="businessName">Business Name</Label>
                                        <Input
                                            id="businessName"
                                            name="businessName"
                                            type="text"
                                            placeholder="Enter your business name"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Category Selection */}
                                    <div>
                                        <Label htmlFor="categoryId">Category</Label>
                                        <Select onValueChange={handleCategoryChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>


                                    {/* Experience Selection */}
                                    <div>
                                        <Label>Experience (in years)</Label>
                                        <div className="grid grid-cols-3 gap-2 mt-2">
                                            {[1, 2, 3, 4, 5, 6].map((exp) => (
                                                <Button
                                                    key={exp}
                                                    type="button"
                                                    className={`py-2 px-4 font-bold bg-white hover:bg-gray-900 hover:text-white ${formData.experience === exp ? 'bg-gray-900 text-white' : 'border border-gray-900 text-gray-900'}`}
                                                    onClick={() => handleExperienceSelect(exp)}
                                                >
                                                    {exp === 6 ? "5+" : exp}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Bio */}
                                    <div>
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            rows={4}
                                            id="bio"
                                            name="bio"
                                            placeholder="Describe yourself..."
                                            value={formData.bio}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Loader /> : "Submit"}
                                </Button>
                                {error && (
                                    <div className="text-red-500 text-center mt-2">{error}</div>
                                )}
                            </div>
                        </form>
                        <div className="relative hidden bg-muted md:block bg-white p-5">
                            <img
                                src="https://cdn.vectorstock.com/i/1000v/80/47/hair-procedure-salon-flat-colored-composition-vector-44018047.jpg"
                                alt="Image"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale p-5"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RegisterServiceProvider;
