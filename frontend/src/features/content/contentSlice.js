import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async ({ limit = 50, offset = 0, country = '' }) => {
    const response = await axios.get(`${API_BASE}/content`, {
      params: { limit, offset, country },
    });
    return response.data;
  }
);

export const fetchContentById = createAsyncThunk(
  'content/fetchById',
  async (id) => {
    const response = await axios.get(`${API_BASE}/content/${id}`);
    return response.data;
  }
);

export const fetchLinks = createAsyncThunk(
  'content/fetchLinks',
  async () => {
    const response = await axios.get(`${API_BASE}/links`);
    return response.data;
  }
);

const initialState = {
  items: [],
  currentItem: null,
  links: [],
  loading: false,
  error: null,
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchContentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.links = action.payload.data || action.payload;
      });
  },
});

export const { clearCurrentItem } = contentSlice.actions;
export default contentSlice.reducer;
