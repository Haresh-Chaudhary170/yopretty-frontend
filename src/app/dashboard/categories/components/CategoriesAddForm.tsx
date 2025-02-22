// AddCategoryForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button"; // Shadcn Button Component
import { Input } from "@/components/ui/input"; // Shadcn Input Component
import { Label } from "@/components/ui/label"; // Shadcn Label Component
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Define Zod schema for validation
const categorySchema = z.object({
  name: z
    .string()
    .nonempty("Category name is required")
    .max(100, "Category name must be at most 100 characters"),
});

// Define TypeScript type from Zod schema
type CategoryFormData = z.infer<typeof categorySchema>;

const AddCategoryForm = () => {
      const router = useRouter()
    
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      // Send POST request to the API
      console.log(data)
      const response = await axios.post("/api/categories", data);
      console.log(response);
      toast.success("Category Added Successfully!")
      router.push('/admin/categories')

      reset(); // Reset the form after successful submission
    } catch (error: unknown) {
     toast.error("Something Went Wrong! Please try again.")
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 mx-auto bg-white p-6 rounded-md shadow-md"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter category name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Add Category"}
      </Button>
    </form>
  );
};

export default AddCategoryForm;
