import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Slice/authSlice';
import extraSlice from '../Slice/extraSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    extraSlice: extraSlice,
  },
});
