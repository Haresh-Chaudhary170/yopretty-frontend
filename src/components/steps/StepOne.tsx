import { useDispatch } from 'react-redux';
import { setUserId, setUserRole } from '@/store/slices/authSlice';

export default function StepOne({ nextStep }: { nextStep: () => void }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    dispatch(setUserId(data.userId));
    dispatch(setUserRole(data.role));
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Step 1: Signup</h2>
      <input type="text" placeholder="Name" className="w-full p-2 border rounded" required />
      <input type="email" placeholder="Email" className="w-full p-2 border rounded" required />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Next</button>
    </form>
  );
}
