'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
// import StepOne from './steps/StepOne';
// import StepThree from './steps/StepThree';
import { RegisterForm } from './register-form';
// import RegisterCustomer from './custoomer-detail-form';
import StepTwo from './steps/StepTwo';
import KycAndCertifications from './kyc';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  // const userId = useSelector((state: RootState) => state.auth.userId);
  const role = useSelector((state: RootState) => state.auth.role);
  const router = useRouter();

  const nextStep = () => setStep(step + 1);
  const handleCompletion = () => router.push('/dashboard');

  return (
    <div className="">
      {step === 1 && 
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <RegisterForm nextStep={nextStep} />
      </div>
    </div>
      }
      {step === 2 && <StepTwo nextStep={nextStep} />}
      {step === 3 && role === 'SERVICE_PROVIDER' && <KycAndCertifications onComplete={handleCompletion} />}
    </div>
  );
}
