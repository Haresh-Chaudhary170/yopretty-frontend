import PageTitle from '@/components/PageTitle'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import AddCategoryForm from '../components/CategoriesAddForm'

const AddEvent = () => {
    return (
        <div className="flex flex-col gap-5  w-full p-4 border rounded-lg">
            <div className="flex justify-between">
                <PageTitle title="Add Category" />
                <Link href={'/admin/categories'} >
                    <div className="flex">

                        <ArrowLeft />
                        <span>Back</span>
                    </div>
                </Link>

            </div>
            <div className="bg-gray-50 rounded-lg">
                <AddCategoryForm/>
            </div>
        </div>)
}

export default AddEvent