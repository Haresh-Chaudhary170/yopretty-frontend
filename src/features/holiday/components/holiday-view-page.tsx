import { notFound } from 'next/navigation';
import HolidayForm from './holiday-form';
import axios from 'axios';

type THolidayViewPageProps = {
  holidayId: string;
};

export default async function HolidayViewPage({
  holidayId
}: THolidayViewPageProps) {
  let holiday = null;
  let pageTitle = 'Take Day Off';

  if (holidayId !== 'new') {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/get-single/${holidayId}`,{withCredentials:true});
    holiday = response.data;
    console.log(response.data)
    if (!holiday) {
      notFound();
    }
    pageTitle = `Edit Holiday`;
  }

  return <HolidayForm initialData={holiday} pageTitle={pageTitle} />;
}
