import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
}

interface BooksState {
  items: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL;

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data.items; // Extract the items array from the response
});

export const addBook = createAsyncThunk('books/addBook', async (book: Omit<Book, 'id' | 'available'>) => {
  const response = await axios.post(`${API_URL}/books`, book);
  return response.data;
});

export const updateBookAvailability = createAsyncThunk(
  'books/updateAvailability',
  async ({ id, available }: { id: string; available: boolean }) => {
    const response = await axios.put(`${API_URL}/books/${id}/availability`, { available });
    return response.data;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload || [];
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch books';
        // Reset items to empty array on error
        state.items = [];
      })
      .addCase(addBook.fulfilled, (state, action) => {
        if (!Array.isArray(state.items)) {
          state.items = [];
        }
        state.items.push(action.payload);
      })
      .addCase(updateBookAvailability.fulfilled, (state, action) => {
        if (!Array.isArray(state.items)) {
          state.items = [];
          return;
        }
        const index = state.items.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default booksSlice.reducer;
