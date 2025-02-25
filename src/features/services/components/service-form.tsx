'use client';

import { FileUploader } from '@/components/file-uploader';
import ImagePreview from '@/components/image-previewer';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

// const formSchema = z.object({
//   images: z
//     .any()
//     .refine((files) => files?.length != 1, 'Image is required.')
//     .refine(
//       (files) => files?.[0]?.size <= MAX_FILE_SIZE,
//       `Max file size is 5MB.`
//     )
//     .refine(
//       (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
//       '.jpg, .jpeg, .png and .webp files are accepted.'
//     ),
//   name: z.string().min(2, {
//     message: 'Service name must be at least 2 characters.'
//   }),
//   categoryId: z.string(),
//   price: z.string().transform((val) => parseFloat(val)).refine(val => !isNaN(val), 'Price must be a valid number.'),
//   duration: z.string().transform((val) => parseInt(val, 10)).refine(val => !isNaN(val), 'Duration must be a valid number.'),
//   description: z.string().min(10, {
//     message: 'Description must be at least 10 characters.'
//   })
// });

type Category = {
  id: string;
  name: string;
}
export type Service = {
  id: string;
  images: string[];
  name: string;
  description: string;
  created_at: string;
  price: number;
  duration: number;
  categoryId: string;
};
export default function ServiceForm({
  initialData,
  pageTitle
}: {
  initialData: Service | null;
  pageTitle: string;
}) {

  const { toast } = useToast()
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    images: initialData
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
      message: 'Service name must be at least 2 characters.'
    }),
    categoryId: z.string(),
    price: z.union([z.string(), z.number()])
      .transform((val) => typeof val === "string" ? parseFloat(val) : val)
      .refine(val => !isNaN(val), 'Price must be a valid number.'),
    duration: z.union([z.string(), z.number()])
      .transform((val) => typeof val === "string" ? parseInt(val, 10) : val)
      .refine(val => !isNaN(val), 'Duration must be a valid number.'),
    description: z.string().min(10, {
      message: 'Description must be at least 10 characters.'
    })
  });
  const defaultValues = {
    name: initialData?.name || '',
    categoryId: initialData?.categoryId || '',
    price: initialData?.price || 0,
    duration: initialData?.duration || 30,
    description: initialData?.description || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });


  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   // make axios request to api to post data
  //   console.log(values);
  //   try {
  //     // Make the Axios request to your login endpoint
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/add`, values,
  //       { withCredentials: true }
  //     );
  //     console.log(response.data);
  //     toast({
  //       title: 'Success',
  //       description: 'Service added successfully',
  //     });
  //     router.push("/dashboard/service")
  //     // handle success or error

  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     toast({
  //       variant: 'default',
  //       title: 'Error',
  //       description: (error as { response: { data: { error: string } } }).response.data.error,
  //     });

  //   }
  // }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    // Append regular fields
    formData.append('name', values.name);
    formData.append('categoryId', values.categoryId);
    formData.append('price', values.price.toString());  // Ensure it is a string
    formData.append('duration', values.duration.toString());  // Ensure it is a string
    formData.append('description', values.description);
    formData.append('type', 'services');

    // Append files (assuming images is an array of File objects)
    if (values.images && values.images.length > 0) {
      values.images.forEach((file: string | Blob) => {
        formData.append('images', file);
      });
    }

    if (initialData?.id != '') {
      setLoading(true);
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/update/${initialData?.id}`,
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
          description: 'Service updated successfully',
        });
        router.push("/dashboard/service");
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/add`,
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
          description: 'Service added successfully',
        });
        router.push("/dashboard/service");
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

  // function to ffetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/get-all`);
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleImageRemove = (imageUrl: string) => {
    // Remove the image from the local state
    // setImages((prevImages) => prevImages.filter((image) => image !== imageUrl));
    if (initialData && initialData.images) {
      initialData.images = initialData.images.filter((image) => image !== imageUrl);
    }
    toast(
      {
        title: 'Image Deleted',
        description: 'Image removed from the service',
      }
    )
  };
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
              name='images'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={4}
                        maxSize={4 * 1024 * 1024}
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
            <ImagePreview serviceId={initialData?.id || ''} images={initialData?.images || []} onImageRemove={handleImageRemove} />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter service name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='categoryId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value || ''} // Ensure the value is not undefined
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select categories' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='0.01'
                        placeholder='Enter price'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='duration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (in minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='10'
                        placeholder='Enter duration'
                        {...field}
                      />
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
                  <span>{pageTitle === 'Create Service' ? 'Create' : 'Update'} Service</span>
                )
              }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
