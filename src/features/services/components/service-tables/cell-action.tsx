'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Service } from '@/constants/data';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { CalendarCheck, Edit, MoreHorizontal, Star, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: Service;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    setLoading(true);
    // Delete service with axios
    await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/delete/${data.id}`,{withCredentials:true});
    setLoading(false);
    toast({
      title: 'Success',
      description: 'Service deleted successfully',
    });
    setOpen(false);
    router.push('/dashboard/service');
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/service/${data.id}`)}
          >
            <Edit className='mr-2 h-4 w-4' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/service/${data.id}`)}
          >
            <Star className='mr-2 h-4 w-4' /> Reviews
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/service/${data.id}`)}
          >
            <CalendarCheck className='mr-2 h-4 w-4' /> Appointments
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)} className='bg-red-300'>
            <Trash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
