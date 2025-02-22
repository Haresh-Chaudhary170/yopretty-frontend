import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId: string | null;
  role: 'CUSTOMER' | 'SERVICE_PROVIDER' | null;
  customerId: string | null;
  serviceProviderId: string | null;
}

const initialState: AuthState = {
  userId: null,
  role: null,
  customerId: null,
  serviceProviderId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUserRole: (state, action: PayloadAction<'CUSTOMER' | 'SERVICE_PROVIDER'>) => {
      state.role = action.payload;
    },
    setCustomerId: (state, action: PayloadAction<string>) => {
      state.customerId = action.payload;
    },
    setServiceProviderId: (state, action: PayloadAction<string>) => {
      state.serviceProviderId = action.payload;
    },
    clearAuth: (state) => {
      state.userId = null;
      state.role = null;
      state.customerId = null;
      state.serviceProviderId = null;
    },
  },
});

export const {
  setUserId,
  setUserRole,
  setCustomerId,
  setServiceProviderId,
  clearAuth
} = authSlice.actions;
export default authSlice.reducer;
