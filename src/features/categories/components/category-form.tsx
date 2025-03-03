'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ImagePreview from './image-previewer';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export type Category = {
  id: string;
  image: string;
  name: string;
  description: string;

};
export default function CategoryForm({
  initialData,
  pageTitle
}: {
  initialData: Category | null;
  pageTitle: string;
}) {

  const { toast } = useToast()
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    image: initialData?.image
      ? z.any().optional() // Images are optional in edit mode
      : z
        .any()
        .refine((files) => files?.length > 0, 'Image is required.')
        .refine(
          (files) => files?.[0]?.size <= MAX_FILE_SIZE,
          `Max file size is 5MB.`
        )
        .refine(
          (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
          '.jpg, .jpeg, .png and .webp files are accepted.'
        ),
    name: z.string().min(2, {
      message: 'Category name must be at least 2 characters.'
    }),
    description: z.string().min(10, {
      message: 'Description must be at least 10 characters.'
    })
  });
  const defaultValues = {
    name: initialData?.name || '',
    description: initialData?.description || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    // Append regular fields
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('type', 'categories');
    // Ensure only the first file is sent (in case it's an array)
    const imageFile = values.image?.[0] || values.image; // Use the first file if it's an array, else use the single file.

    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (initialData?.id) {
      console.log(initialData?.id)
      setLoading(true);
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/update/${initialData?.id}`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',  // Ensure the request is sent as multipart
            },
          }
        );
        console.log(response.data);
        toast({
          title: 'Success',
          description: 'Category updated successfully',
        });
        router.push("/dashboard/categories");
      } catch (error) {
        console.error('Error submitting form:', error);
        toast({
          variant: 'default',
          title: 'Error',
          description: (error as { response: { data: { error: string } } }).response.data.error,
        });
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/add`,
          formData,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',  // Ensure the request is sent as multipart
            },
          }
        );
        console.log(response.data);
        toast({
          title: 'Success',
          description: 'Category added successfully',
        });
        router.push("/dashboard/categories");
      } catch (error) {
        console.error('Error submitting form:', error);
        toast({
          variant: 'default',
          title: 'Error',
          description: (error as { response: { data: { error: string } } }).response.data.error,
        });
        setLoading(false);
      }
    }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={2}
                        maxSize={2 * 1024 * 1024}
                      // disabled={loading}
                      // progresses={progresses}
                      // pass the onUpload function here for direct upload
                      // onUpload={uploadFiles}
                      // disabled={isUploading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <ImagePreview image={initialData?.image || ""} />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter service name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter service description'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={loading}>
              {
                loading ? (
                  <Loader />
                ) : (
                  <span>{pageTitle === 'Create New Category' ? 'Create' : 'Update'} Category</span>
                )
              }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
