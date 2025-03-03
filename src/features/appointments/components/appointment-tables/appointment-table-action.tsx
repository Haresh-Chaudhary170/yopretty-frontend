'use client';

import { DataTableSearch } from '@/components/ui/table/data-table-search';
import {
  useAppointmentTableFilters
} from './use-appointment-table-filters';

export default function AppointmentTableAction() {
  const {

    searchQuery,
    setPage,
    setSearchQuery
  } = useAppointmentTableFilters();
  return (
    <div className='flex flex-wrap items-center gap-4'>
      <DataTableSearch
        searchKey='name'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />

    </div>
  );
}
