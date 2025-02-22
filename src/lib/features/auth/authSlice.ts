// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  userId: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<{ userId: string }>) => {
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userId = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setLoginState, logout } = authSlice.actions;
export default authSlice.reducer;
