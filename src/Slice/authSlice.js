import {createSlice} from '@reduxjs/toolkit';
import { storeUserData } from '../constants/helper';

const initialState = {
  isAuthenticated: false,
  user: null,
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const {email, password} = action.payload;
      if (email === 'pavan.v@adcuratio.com' && password === 'pavan@123') {
        state.isAuthenticated = true;
        state.user = action.payload; // Set user data
        storeUserData(action.payload);
      } else {
        alert('Invalid credentials');
      }
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null; // Clear user data
      storeUserData(null);
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
