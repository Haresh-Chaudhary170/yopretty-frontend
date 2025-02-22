import axios from 'axios';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ServiceTable } from '@/components/ui/table/data-table';
import { columns } from './service-tables/columns';

type ServiceListingPage = object;

export default async function ServiceListingPage({ }: ServiceListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  // Fetch services from the actual API using Axios
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/get-all-admin`, {
      params: filters,
    });

    const { total_services, services } = response.data;
    console.log(total_services, services)
    return (
      <ServiceTable
        columns={columns}
        data={services}
        totalItems={total_services}
      />
    );
  } catch (error) {
    console.error('Error fetching services:', error);
    // Handle error gracefully
    return <div>Error fetching services. Please try again later.</div>;
  }
}
