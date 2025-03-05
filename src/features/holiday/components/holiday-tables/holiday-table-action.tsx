'use client';

import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import {
  useHolidayTableFilters
} from './use-holiday-table-filters';

export default function HolidayTableAction() {
  const {
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useHolidayTableFilters();
  return (
    <div className='flex flex-wrap items-center gap-4'>
      <DataTableSearch
        searchKey='name'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
 
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
