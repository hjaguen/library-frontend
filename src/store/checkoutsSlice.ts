import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Checkout {
  id: string;
  bookId: string;
  memberId: string;
  checkoutDate: string;
  dueDate: string;
  returnDate?: string;
}

interface CheckoutsState {
  items: Checkout[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CheckoutsState = {
  items: [],
  status: 'idle',
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCheckouts = createAsyncThunk('checkouts/fetchCheckouts', async () => {
  const response = await axios.get(`${API_URL}/checkouts`);
  return response.data;
});

export const createCheckout = createAsyncThunk(
  'checkouts/createCheckout',
  async (checkout: { bookId: string; memberId: string }) => {
    const response = await axios.post(`${API_URL}/checkouts`, checkout);
    return response.data;
  }
);

export const returnBook = createAsyncThunk(
  'checkouts/returnBook',
  async (checkoutId: string) => {
    const response = await axios.post(`${API_URL}/checkouts/${checkoutId}/return`);
    return response.data;
  }
);

const checkoutsSlice = createSlice({
  name: 'checkouts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckouts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCheckouts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCheckouts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default checkoutsSlice.reducer;
