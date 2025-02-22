import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserId } from '@/store/slices/authSlice';

export function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('http://localhost:5000/api/auth/check-auth', {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.userId) {
        dispatch(setUserId(data.userId));
      }
    };
    checkAuth();
  }, [dispatch]);
}
