import {createSlice} from '@reduxjs/toolkit';
import { storeUserData } from '../constants/helper';

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading : false,
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoading = true;
      const {email, password} = action.payload;
      // if (email === 'pavan.v@adcuratio.com' && password === 'pavan@123') {
      if (email === 'p' && password === 'p') {
        state.isAuthenticated = true;
        state.user = action.payload; // Set user data
        storeUserData(action.payload);
      } else {
        alert('Invalid credentials');
      }
      state.isLoading = false;
    },
    logout: state => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.user = null; // Clear user data
      storeUserData(null);
      state.isLoading = false;
    },
  },
});

export const {login, logout, setLoading} = authSlice.actions;
export default authSlice.reducer;
