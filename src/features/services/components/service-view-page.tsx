import { notFound } from 'next/navigation';
import ServiceForm from './service-form';
import axios from 'axios';

type TServiceViewPageProps = {
  serviceId: string;
};

export default async function ServiceViewPage({
  serviceId
}: TServiceViewPageProps) {
  let service = null;
  let pageTitle = 'Create New Service';

  if (serviceId !== 'new') {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/get-single/${serviceId}`,{withCredentials:true});
    service = response.data;
    console.log(response.data)
    if (!service) {
      notFound();
    }
    pageTitle = `Edit Service`;
  }

  return <ServiceForm initialData={service} pageTitle={pageTitle} />;
}
