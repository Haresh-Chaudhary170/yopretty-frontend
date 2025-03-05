'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { format, differenceInDays } from 'date-fns'; // Import date-fns functions

type Category = {
  id: string;
  name: string;
  isActive: boolean;
  description: string;
  image: string;
  startDate: string; // Ensure this is a valid date string (e.g., ISO 8601)
  endDate: string;   // Ensure this is a valid date string (e.g., ISO 8601)
  reason: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'startDate',
    header: 'START DATE',
    cell: ({ row }) => {
      const date = new Date(row.getValue('startDate')); // Convert to Date object
      return format(date, 'MM/dd/yyyy hh:mm a'); // Format with AM/PM
    },
  },
  {
    accessorKey: 'endDate',
    header: 'END DATE',
    cell: ({ row }) => {
      const date = new Date(row.getValue('endDate')); // Convert to Date object
      return format(date, 'MM/dd/yyyy hh:mm a'); // Format with AM/PM
    },
  },
  {
    id: 'daysDifference',
    header: 'NUMBER OF DAYS',
    cell: ({ row }) => {
      const startDate = new Date(row.getValue('startDate')); // Get start date
      const endDate = new Date(row.getValue('endDate')); // Get end date
      const daysDifference = differenceInDays(endDate, startDate); // Calculate difference
      return `${daysDifference} day(s)`; // Display the difference
    },
  },
  {
    accessorKey: 'reason',
    header: 'REASON',
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];