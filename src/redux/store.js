import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import doctorsReducer from './doctorsSlice';
import clinicsReducer from './clinicsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
    clinics: clinicsReducer,
  },
});
