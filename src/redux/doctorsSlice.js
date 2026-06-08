import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from './apiConfig';

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?role=doctor`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data || error.message || 'Failed to fetch doctors';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // API returns an object like { success, count, data: [...] }
        // prefer the `data` array if present, otherwise use payload directly
        state.list = (action.payload && action.payload.data) ? action.payload.data : (Array.isArray(action.payload) ? action.payload : []);
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default doctorsSlice.reducer;
