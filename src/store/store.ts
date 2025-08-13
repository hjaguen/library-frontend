import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import membersReducer from './membersSlice';
import checkoutsReducer from './checkoutsSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    members: membersReducer,
    checkouts: checkoutsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
