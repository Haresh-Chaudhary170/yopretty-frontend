'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

type Category={
  id: string;
  name: string;
  isActive: boolean;
  description: string;
  image: string;
}
export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'image',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square w-24'>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${(row.getValue('image'))}`}
            alt={row.getValue('name')}
            fill
            className='rounded-lg'
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },

  {
    accessorKey: 'isActive',
    header: 'STATUS',
    cell: ({ row }) => (
      <div className={`text-${row.getValue('isActive') ? 'green' : 'red'}-600 font-bold`}>
        {row.getValue('isActive') ? 'Active' : 'Inactive'}
      </div>
    )
  },

  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
