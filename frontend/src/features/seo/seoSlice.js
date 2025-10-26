import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const fetchHeaders = createAsyncThunk('seo/fetchHeaders', async () => {
  const response = await axios.get(`${API_BASE}/headers`);
  return response.data.data || response.data;
});

const initialState = {
  headers: {},
  loading: false,
  error: null,
};

export const seoSlice = createSlice({
  name: 'seo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeaders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHeaders.fulfilled, (state, action) => {
        state.loading = false;
        state.headers = action.payload;
      })
      .addCase(fetchHeaders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default seoSlice.reducer;
