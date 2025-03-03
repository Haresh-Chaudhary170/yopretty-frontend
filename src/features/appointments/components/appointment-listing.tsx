import axios from 'axios';
import { DataTable as AppointmentTable } from '@/components/ui/table/data-table';
import { columns } from './appointment-tables/columns';

type AppointmentListingPage = object;

export default async function AppointmentListingPage({ total_bookings, bookings }: AppointmentListingPage) {


  // Fetch bookings from the actual API using Axios
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/provider`, {
      withCredentials: true, // Include cookies in API requests
    });

    const { total_bookings, bookings } = response.data;
    console.log(total_bookings, bookings)
    return (
      <AppointmentTable
        columns={columns}
        data={bookings}
        totalItems={total_bookings}
      />
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    // Handle error gracefully
    return <div>Error fetching bookings. Please try again later.</div>;
  }
}
