'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { format, differenceInDays } from 'date-fns'; // Import date-fns functions

interface Event {
  id: string;
  service: {
    name: string;
    id: string;
  };
  timeSlot: {
    startTime: string;
    endTime: string;
  };
}

export const columns: ColumnDef<Event>[] = [
  {
    accessorFn: (row) => row.timeSlot.startTime, // Access startTime inside timeSlot using accessorFn
    header: 'START DATE',
    cell: ({ row }) => {
      const date = new Date(row.getValue('timeSlot.startTime')); // Convert to Date object
      return format(date, 'MM/dd/yyyy hh:mm a'); // Format with AM/PM
    },
  },
  {
    accessorFn: (row) => row.timeSlot.endTime, // Access endTime inside timeSlot using accessorFn
    header: 'END DATE',
    cell: ({ row }) => {
      const date = new Date(row.getValue('timeSlot.endTime')); // Convert to Date object
      return format(date, 'MM/dd/yyyy hh:mm a'); // Format with AM/PM
    },
  },
  {
    id: 'daysDifference',
    header: 'NUMBER OF DAYS',
    cell: ({ row }) => {
      const startDate = new Date(row.getValue('timeSlot.startTime')); // Get start date
      const endDate = new Date(row.getValue('timeSlot.endTime')); // Get end date
      const daysDifference = differenceInDays(endDate, startDate); // Calculate difference
      return `${daysDifference} day(s)`; // Display the difference
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
