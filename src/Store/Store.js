import {configureStore} from '@reduxjs/toolkit';
import extraSlice from '../Slice/extraSlice';
import authSlice from '../Slice/authSlice';

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    extraSlice: extraSlice,
  },
});
