import { notFound } from 'next/navigation';
import CategoryForm from './category-form';
import axios from 'axios';

type TCategoryViewPageProps = {
  categoryId: string;
};

export default async function CategoryViewPage({
  categoryId
}: TCategoryViewPageProps) {
  let category = null;
  let pageTitle = 'Create New Category';

  if (categoryId !== 'new') {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/get-single/${categoryId}`,{withCredentials:true});
    category = response.data;
    console.log(response.data)
    if (!category) {
      notFound();
    }
    pageTitle = `Edit Category`;
  }

  return <CategoryForm initialData={category} pageTitle={pageTitle} />;
}
