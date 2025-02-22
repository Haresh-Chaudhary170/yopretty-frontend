import { fakeServices, Service } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ServiceForm from './service-form';

type TServiceViewPageProps = {
  serviceId: string;
};

export default async function ServiceViewPage({
  serviceId
}: TServiceViewPageProps) {
  let service = null;
  let pageTitle = 'Create New Service';

  if (serviceId !== 'new') {
    const data = await fakeServices.getServiceById(Number(serviceId));
    service = data.service as Service;
    if (!service) {
      notFound();
    }
    pageTitle = `Edit Service`;
  }

  return <ServiceForm initialData={service} pageTitle={pageTitle} />;
}
