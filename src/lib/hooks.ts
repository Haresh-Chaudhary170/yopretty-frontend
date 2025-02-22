// hooks/useAuthStatus.ts
import { useEffect } from 'react';
import { logout, setLoginState } from '@/lib/features/auth/authSlice';
import { useDispatch } from 'react-redux';
export function useAuthStatus() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await fetch('/api/auth/status');
      const data = await response.json();

      if (data.isLoggedIn) {
        // Assuming you have a way to get the userId, perhaps from another API call
        dispatch(setLoginState({ userId: 'user-id-from-session' }));
      } else {
        dispatch(logout());
      }
    };

    checkAuthStatus();
  }, [dispatch]);
}
