// features/auth/authActions.ts
import { AppDispatch } from '../../store';
import { logout } from './authSlice';

export const logoutUser = () => async (dispatch: AppDispatch) => {
  await fetch('/api/auth/logout', { method: 'POST' });
  dispatch(logout());
};
