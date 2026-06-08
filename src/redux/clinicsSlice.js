import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from './apiConfig';

export const fetchClinicsByDoctor = createAsyncThunk(
  'clinics/fetchByDoctor',
  async (doctorId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/clinics?doctor_id=${doctorId}`,
        {
          headers: getAuthHeaders(),
        }
      );
      console.log('Clinics API response for doctor', doctorId, ':', response.data);
      return response.data;
    } catch (error) {
      const message = error.response?.data || error.message || 'Failed to fetch clinics';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const clinicsSlice = createSlice({
  name: 'clinics',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    selectedDoctorId: null,
  },
  reducers: {
    clearClinics: (state) => {
      state.list = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinicsByDoctor.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.selectedDoctorId = action.meta.arg;
      })
      .addCase(fetchClinicsByDoctor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // API returns an object like { success, count, data: [...] }
        state.list = (action.payload && action.payload.data) ? action.payload.data : (Array.isArray(action.payload) ? action.payload : []);
      })
      .addCase(fetchClinicsByDoctor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearClinics } = clinicsSlice.actions;
export default clinicsSlice.reducer;
