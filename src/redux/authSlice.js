import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from './apiConfig';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/register`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorData = error.response?.data;
      let message = 'Registration failed';

      if (typeof errorData === 'string') {
        message = errorData;
      } else if (errorData?.message) {
        message = errorData.message;
      } else if (error.message) {
        message = error.message;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/login`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('=== Login API Response ===');
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      console.log('Response data keys:', Object.keys(response.data));
      console.log('========================');

      return response.data;
    } catch (error) {
      const errorData = error.response?.data;

      let message = 'Login failed';
      if (typeof errorData === 'string') {
        message = errorData;
      } else if (errorData?.message) {
        message = errorData.message;
      } else if (error.message) {
        message = error.message;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Helper to extract user data from various possible API response formats
const extractUserData = (payload) => {
  // Try various nested structures
  const user = payload?.user || payload?.data?.user || payload?.data || payload || {};
  console.log('extractUserData - extracted user:', user);
  return user;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
    registerSuccess: false,
  },
  reducers: {
    clearAuthStatus: (state) => {
      state.status = 'idle';
      state.error = null;
      state.registerSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.registerSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.registerSuccess = false;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // store token if present
        if (action.payload?.token) {
          try {
            localStorage.setItem('authToken', action.payload.token);
          } catch (e) {
            // ignore storage errors
          }
        }
        // save user info if available and persist it across refresh
        const authUser = extractUserData(action.payload);
        state.user = authUser;
        console.log('Login fulfilled - extracted authUser:', authUser);
        console.log('Login fulfilled - authUser keys:', Object.keys(authUser));
        if (authUser && Object.keys(authUser).length > 0) {
          try {
            localStorage.setItem('authUser', JSON.stringify(authUser));
            console.log('Saved authUser to localStorage:', authUser);
          } catch (e) {
            console.error('Error saving authUser:', e);
          }
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearAuthStatus } = authSlice.actions;
export default authSlice.reducer;
