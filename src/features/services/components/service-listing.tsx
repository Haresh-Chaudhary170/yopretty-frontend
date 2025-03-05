// import axios from 'axios';
// import { searchParamsCache } from '@/lib/searchparams';
// import { DataTable as ServiceTable } from '@/components/ui/table/data-table';
// import { columns } from './service-tables/columns';

// type ServiceListingPage = object;

// export default async function ServiceListingPage({ }: ServiceListingPage) {
//   // Create an Axios instance

//   // Showcasing the use of search params cache in nested RSCs
//   const page = searchParamsCache.get('page');
//   const search = searchParamsCache.get('q');
//   const pageLimit = searchParamsCache.get('limit');
//   const categories = searchParamsCache.get('categories');

//   const filters = {
//     page,
//     limit: pageLimit,
//     ...(search && { search }),
//     ...(categories && { categories: categories })
//   };

//   // Fetch services from the actual API using Axios
//   try {
//     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/get-all-admin`, {
//       params: filters,
//       withCredentials: true, // Include cookies in API requests
//     });

//     const { total_services, services } = response.data;
//     console.log(total_services, services)
//     return (
//       <ServiceTable
//         columns={columns}
//         data={services}
//         totalItems={total_services}
//       />
//     );
//   } catch (error) {
//     console.error('Error fetching services:', error);
//     // Handle error gracefully
//     return <div>Error fetching services. Please try again later.</div>;
//   }
// }


"use client"; // Mark this as a client component

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Use Next.js's client-side search params
import { DataTable as ServiceTable } from '@/components/ui/table/data-table';
import { columns } from './service-tables/columns';

const ServiceListingPage=()=> {
  const [services, setServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use Next.js's `useSearchParams` to get client-side search params
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const search = searchParams.get('q');
  const pageLimit = searchParams.get('limit');
  const categories = searchParams.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories }),
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/get-all-admin`,
          {
            params: filters,
            withCredentials: true, // Include cookies in API requests
          }
        );

        const { total_services, services } = response.data;
        setServices(services);
        setTotalServices(total_services);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Error fetching services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [page, search, pageLimit, categories]); // Re-fetch when these values change

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ServiceTable
      columns={columns}
      data={services}
      totalItems={totalServices}
    />
  );
}

export default ServiceListingPage;