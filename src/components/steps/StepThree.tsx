import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function StepThree({ onComplete }: { onComplete: () => void }) {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/profile/verify-kyc', {
      method: 'POST',
      body: JSON.stringify({ userId }),
      headers: { 'Content-Type': 'application/json' },
    });
    onComplete(); // Redirect to dashboard
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Step 3: KYC Verification</h2>
      <input type="file" className="w-full p-2 border rounded" required />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Verify</button>
    </form>
  );
}
