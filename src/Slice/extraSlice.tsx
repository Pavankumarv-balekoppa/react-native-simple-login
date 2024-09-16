import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storeUserData} from '../constants/helper';

export interface ExtraState {
  isAuthenticated: boolean;
  user: null | any;
  isLoading: boolean;
  data: any;
}
const initialState: ExtraState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  data: {},
};

export const extraSlice = createSlice({
  name: 'extraSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(getTempleData.pending, state => {
      state.isLoading = true;
      state.data = {};
    });
    builder.addCase(getTempleData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getTempleData.rejected, state => {
      state.isLoading = false;
      state.data = {};
    });
  },
});

export const getTempleData = createAsyncThunk(
  'extraSlice/getTempleData',
  async () => {
    const response = await fetch(
      'https://pavanallprojectdata.onrender.com/templeData',
    );
    const res = await response.json();
    return res;
  },
);

export default extraSlice.reducer;
