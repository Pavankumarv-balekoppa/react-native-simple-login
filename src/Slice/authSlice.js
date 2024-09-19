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
  extraReducers: builder => {
    // Handle login
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, state => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    });

    // Handle logout
    builder.addCase(logout.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, state => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    });

    // Handle getAllUserData
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


// Thunks for login and logout
export const login = createAsyncThunk(
  'authSlice/login',
  async ({email, password}, {getState, rejectWithValue}) => {
    console.log('email', email, 'password', password);
    const {allUserData} = getState().authSlice;

    console.log('allUserData', allUserData);
    const loginUserData = allUserData?.length
      ? allUserData?.find(user => user?.email === email)
      : null;
    console.log('loginUserData', allUserData, loginUserData);
    if (loginUserData && loginUserData?.password === password) {
      storeUserData(loginUserData);
      return loginUserData;
    } else {
      return rejectWithValue('Wrong email/password please check and re-try');
    }
  },
);

export const logout = createAsyncThunk('authSlice/logout', async () => {
  storeUserData(null);
  return null;
});

export const getAllUserData = createAsyncThunk(
  'authSlice/getAllUserData',
  async () => {
    const response = await fetch(
      'https://pavanallprojectdata.onrender.com/auth',
    );
    const res = await response.json();
    return res;
  },
);


export default authSlice.reducer;
