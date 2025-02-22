'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const handleStepOneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setUserId(data.userId);
    setRole(data.role);
    setStep(2);
  };

  const handleStepTwoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const res = await fetch('/api/submit-profile', {
    //   method: 'POST',
    //   body: JSON.stringify({ userId, details: 'Some details' }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // const data = await res.json();
    if (role === 'CUSTOMER') {
      router.push('/login');
    } else {
      setStep(3);
    }
  };

  const handleStepThreeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/verify-kyc', {
      method: 'POST',
      body: JSON.stringify({ userId }),
      headers: { 'Content-Type': 'application/json' },
    });
    router.push('/login');
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg'>
      {step === 1 && (
        <form onSubmit={handleStepOneSubmit} className='space-y-4'>
          <h2 className='text-xl font-bold'>Step 1: Signup</h2>
          <input type='text' placeholder='Name' className='w-full p-2 border rounded' required />
          <input type='email' placeholder='Email' className='w-full p-2 border rounded' required />
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>Next</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleStepTwoSubmit} className='space-y-4'>
          <h2 className='text-xl font-bold'>Step 2: {role === 'CUSTOMER' ? 'Customer Details' : 'Service Provider Details'}</h2>
          <input type='text' placeholder='Additional Info' className='w-full p-2 border rounded' required />
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>Submit</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleStepThreeSubmit} className='space-y-4'>
          <h2 className='text-xl font-bold'>Step 3: KYC Verification</h2>
          <input type='file' className='w-full p-2 border rounded' required />
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>Verify</button>
        </form>
      )}
    </div>
  );
}
