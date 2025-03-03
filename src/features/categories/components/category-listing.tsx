import axios from 'axios';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as CategoryTable } from '@/components/ui/table/data-table';
import { columns } from './category-tables/columns';

type CategoryListingPage = object;

export default async function CategoryListingPage({ }: CategoryListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
  };

  // Fetch categories from the actual API using Axios
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/get-all-admin`, {
      params: filters,
      withCredentials: true, // Include cookies in API requests
    });

    const { total_categories, categories } = response.data;
    console.log(total_categories, categories)
    return (
      <CategoryTable
        columns={columns}
        data={categories}
        totalItems={total_categories}
      />
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Handle error gracefully
    return <div>Error fetching categories. Please try again later.</div>;
  }
}
