import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storeUserData} from '../constants/helper';

export interface ExtraState {
  isAuthenticated: boolean;
  user: null | any;
  isLoading: boolean;
  data: any;
  IPCData: any;
}
const initialState: ExtraState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  data: {},
  IPCData: {},
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
      // Compare the fetched data with the current data
      if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
        state.data = action.payload; // Only update if data is different
      }
    });
    builder.addCase(getTempleData.rejected, state => {
      state.isLoading = false;
      state.data = {};
    });
    builder.addCase(getIPCData.pending, state => {
      state.isLoading = true;
      state.IPCData = {};
    });
    builder.addCase(getIPCData.fulfilled, (state, action) => {
      state.isLoading = false;
      // Compare the fetched data with the current data
      if (JSON.stringify(state.IPCData) !== JSON.stringify(action.payload)) {
        state.IPCData = action.payload; // Only update if data is different
      }
    });
    builder.addCase(getIPCData.rejected, state => {
      state.isLoading = false;
      state.IPCData = {};
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
export const getIPCData = createAsyncThunk('extraSlice/getIPCData', async () => {
  const response = await fetch(
    'https://pavan-ipcsection.onrender.com/IpsSection',
  );
  const res = await response.json();
  return res;
});

export default extraSlice.reducer;
