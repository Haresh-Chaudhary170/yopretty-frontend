'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export const CATEGORY_OPTIONS = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Clothing', label: 'Clothing' },
  { value: 'Toys', label: 'Toys' },
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Books', label: 'Books' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Beauty Appointments', label: 'Beauty Appointments' }
];
export function useAppointmentTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [appointmentsFilter, setAppointmentFilter] = useQueryState(
    'appointments',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setAppointmentFilter(null);

    setPage(1);
  }, [setSearchQuery, setAppointmentFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!appointmentsFilter;
  }, [searchQuery, appointmentsFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    appointmentsFilter,
    setAppointmentFilter
  };
}
