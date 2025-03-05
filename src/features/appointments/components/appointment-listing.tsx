'use client'

import axios from 'axios';
import { DataTable as AppointmentTable } from '@/components/ui/table/data-table';
import { columns } from './appointment-tables/columns';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


const AppointmentListingPage=()=> {
    const [bookings, setBookings] = useState([]);
    const [total_bookings, setTotal_bookings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  // Showcasing the use of search params cache in nested RSCs

    const searchParams = useSearchParams();
    const page = searchParams.get('page');
    const search = searchParams.get('q');
    const pageLimit = searchParams.get('limit');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/provider`,
          {
            params: filters,
            withCredentials: true, // Include cookies in API requests
          }
        );

        const { total_bookings, bookings } = response.data;
        console.log(bookings)
        setBookings(bookings);
        setTotal_bookings(total_bookings);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Error fetching services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [page, search, pageLimit]); // Re-fetch when these values change

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <AppointmentTable
      columns={columns}
      data={bookings}
      totalItems={total_bookings}
      />
  );
}

export default AppointmentListingPage;