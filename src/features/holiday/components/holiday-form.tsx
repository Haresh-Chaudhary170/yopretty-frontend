'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from "@/lib/utils";
import { Textarea } from '@/components/ui/textarea';



export type Holiday = {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;

};
const FormSchema = z.object({
  startDate: z.date({
    required_error: "A start date and time is required.",
  }),
  endDate: z.date({
    required_error: "An end date and time is required.",
  }),
  reason: z.string().min(1, "Reason is required."),
});

export default function HolidayForm({
  initialData,
  pageTitle
}: {
  initialData: Holiday | null;
  pageTitle: string;
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const payload = {
        startDate: data.startDate.toISOString() || initialData?.startDate, // Convert to ISO string
        endDate: data.endDate.toISOString() || initialData?.endDate, // Convert to ISO string
        reason: data.reason || initialData?.reason,
      };
      console.log(payload)

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar/add-date-exclusion`,
        payload,
        {
          withCredentials: true,
        }
      );
      if (response.status==200) {
        toast.success("Date exclusion added successfully!");
        router.push("/dashboard/calendar/off-day")
        setLoading(false)
        
      }
    } catch (error) {
      toast.error("Failed to add date exclusion.");
      console.error(error);
      setLoading(false);
    }
  }

  function handleDateTimeSelect(
    field: "startDate" | "endDate",
    date: Date | undefined
  ) {
    if (date) {
      form.setValue(field, date);
    }
  }

  function handleTimeChange(
    field: "startDate" | "endDate",
    type: "hour" | "minute" | "ampm",
    value: string
  ) {
    const currentDate = form.getValues(field) || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    form.setValue(field, newDate);
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

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Start Date and Time */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date & Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/dd/yyyy hh:mm aa")
                            ) : (
                              <span>Pick a date and time</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="sm:flex">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => handleDateTimeSelect("startDate", date)}
                            initialFocus
                          />
                          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                            <ScrollArea className="w-44 sm:w-auto">
                              <div className="flex sm:flex-col p-2">
                                {Array.from({ length: 12 }, (_, i) => i + 1)
                                  .reverse()
                                  .map((hour) => (
                                    <Button
                                      key={hour}
                                      size="icon"
                                      variant={
                                        field.value &&
                                          field.value.getHours() % 12 === hour % 12
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="sm:w-full shrink-0 aspect-square"
                                      onClick={() =>
                                        handleTimeChange("startDate", "hour", hour.toString())
                                      }
                                    >
                                      {hour}
                                    </Button>
                                  ))}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                              />
                            </ScrollArea>
                            <ScrollArea className="w-44 sm:w-auto">
                              <div className="flex sm:flex-col p-2">
                                {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                  (minute) => (
                                    <Button
                                      key={minute}
                                      size="icon"
                                      variant={
                                        field.value &&
                                          field.value.getMinutes() === minute
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="sm:w-full shrink-0 aspect-square"
                                      onClick={() =>
                                        handleTimeChange("startDate", "minute", minute.toString())
                                      }
                                    >
                                      {minute.toString().padStart(2, "0")}
                                    </Button>
                                  )
                                )}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                              />
                            </ScrollArea>
                            <ScrollArea className="">
                              <div className="flex sm:flex-col p-2">
                                {["AM", "PM"].map((ampm) => (
                                  <Button
                                    key={ampm}
                                    size="icon"
                                    variant={
                                      field.value &&
                                        ((ampm === "AM" &&
                                          field.value.getHours() < 12) ||
                                          (ampm === "PM" &&
                                            field.value.getHours() >= 12))
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange("startDate", "ampm", ampm)
                                    }
                                  >
                                    {ampm}
                                  </Button>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date and Time */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date & Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/dd/yyyy hh:mm aa")
                            ) : (
                              <span>Pick a date and time</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="sm:flex">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => handleDateTimeSelect("endDate", date)}
                            initialFocus
                          />
                          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                            <ScrollArea className="w-44 sm:w-auto">
                              <div className="flex sm:flex-col p-2">
                                {Array.from({ length: 12 }, (_, i) => i + 1)
                                  .reverse()
                                  .map((hour) => (
                                    <Button
                                      key={hour}
                                      size="icon"
                                      variant={
                                        field.value &&
                                          field.value.getHours() % 12 === hour % 12
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="sm:w-full shrink-0 aspect-square"
                                      onClick={() =>
                                        handleTimeChange("endDate", "hour", hour.toString())
                                      }
                                    >
                                      {hour}
                                    </Button>
                                  ))}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                              />
                            </ScrollArea>
                            <ScrollArea className="w-44 sm:w-auto">
                              <div className="flex sm:flex-col p-2">
                                {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                  (minute) => (
                                    <Button
                                      key={minute}
                                      size="icon"
                                      variant={
                                        field.value &&
                                          field.value.getMinutes() === minute
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="sm:w-full shrink-0 aspect-square"
                                      onClick={() =>
                                        handleTimeChange("endDate", "minute", minute.toString())
                                      }
                                    >
                                      {minute.toString().padStart(2, "0")}
                                    </Button>
                                  )
                                )}
                              </div>
                              <ScrollBar
                                orientation="horizontal"
                                className="sm:hidden"
                              />
                            </ScrollArea>
                            <ScrollArea className="">
                              <div className="flex sm:flex-col p-2">
                                {["AM", "PM"].map((ampm) => (
                                  <Button
                                    key={ampm}
                                    size="icon"
                                    variant={
                                      field.value &&
                                        ((ampm === "AM" &&
                                          field.value.getHours() < 12) ||
                                          (ampm === "PM" &&
                                            field.value.getHours() >= 12))
                                        ? "default"
                                        : "ghost"
                                    }
                                    className="sm:w-full shrink-0 aspect-square"
                                    onClick={() =>
                                      handleTimeChange("endDate", "ampm", ampm)
                                    }
                                  >
                                    {ampm}
                                  </Button>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
{/* Reason Field */}
<FormField
  control={form.control}
  name="reason"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Reason</FormLabel>
      <FormControl>
        <Textarea
          placeholder="Enter reason"
          className="min-h-[100px]" // Adjust height as needed
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
            <Button type='submit' disabled={loading}>
              {
                loading ? <Loader /> : "Confirm"
              }
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
