'use client';
import { Service } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: 'images',
    header: 'IMAGE',
    cell: ({ row }) => {
      console.log(row.original.images);
      console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${(row.getValue('images') as string[])[0]}`)
      return (
        <div className='relative aspect-square w-24'>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${(row.getValue('images') as string[])[0]}`}
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
    accessorKey: 'category',
    header: 'CATEGORY',
    cell: ({ row }) => {
      const category = row.getValue('category') as { name: string };
      return category.name;
    }
  },
  {
    accessorKey: 'price',
    header: 'PRICE'
  },
  {
    accessorKey: 'duration',
    header: 'DURATION'
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
