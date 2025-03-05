'use client'

import axios from 'axios';
import { DataTable as HolidayTable } from '@/components/ui/table/data-table';
import { columns } from './holiday-tables/columns';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


const HolidayListingPage=()=> {
    const [dateExclusions, setDateExclusions] = useState([]);
    const [total_dateExclusions, setTotal_dateExclusions] = useState(0);
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar/get-date-exclusion`,
          {
            params: filters,
            withCredentials: true, // Include cookies in API requests
          }
        );

        const { total_dateExclusions, dateExclusions } = response.data;
        console.log(dateExclusions)
        setDateExclusions(dateExclusions);
        setTotal_dateExclusions(total_dateExclusions);
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
    <HolidayTable
      columns={columns}
      data={dateExclusions}
      totalItems={total_dateExclusions}
      />
  );
}

export default HolidayListingPage;