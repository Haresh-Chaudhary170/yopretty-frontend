import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ServiceViewPage from '@/features/services/components/service-view-page';

export const metadata = {
  title: 'Dashboard : Service View'
};

type PageProps = { params: Promise<{ serviceId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ServiceViewPage serviceId={params.serviceId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
