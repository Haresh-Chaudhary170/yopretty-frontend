import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import RegisterCustomer from '../custoomer-detail-form';
import RegisterServiceProvider from '../service-provider-form';

export default function StepTwo({ nextStep }: { nextStep: () => void }) {
  const role = useSelector((state: RootState) => state.auth.role);
  console.log(role)


  return (
    <div>
      {
        role == "CUSTOMER" ? (<RegisterCustomer />) : (<RegisterServiceProvider nextStep={nextStep} />)
      }
    </div>
  );
}
                   