import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {storeUserData} from '../constants/helper';

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  allUserData: {},
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoading = true;
      const {email, password} = action.payload;
      const allAuthData = state.allUserData;
      const loginUserData = allAuthData?.length
        ? allAuthData?.find(user => user?.email === email)
        : null;
      console.log('allAuthData', allAuthData, loginUserData);
      if (loginUserData) {
        if (
          loginUserData?.email === email &&
          loginUserData?.password === password
        ) {
          state.isAuthenticated = true;
          state.user = action.payload; // Set user data
          storeUserData(action.payload);
        } else {
          return;
        }
      } else {
        return;
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
  extraReducers: builder => {
    builder.addCase(getAllUserData.pending, state => {
      state.isLoading = true;
      state.allUserData = {};
    });
    builder.addCase(getAllUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUserData = action.payload;
    });
    builder.addCase(getAllUserData.rejected, state => {
      state.isLoading = false;
      state.allUserData = {};
    });
  },
});

export const getAllUserData = createAsyncThunk(
  'auth/getAllUserData',
  async () => {
    const response = await fetch(
      'https://pavanallprojectdata.onrender.com/auth',
    );
    const res = await response.json();
    return res;
  },
);

export const {login, logout, setLoading} = authSlice.actions;
export default authSlice.reducer;
