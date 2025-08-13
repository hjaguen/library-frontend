import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Member {
  id: number;
  name: string;
  email: string;
  membershipStatus: 'active' | 'inactive';
}

interface MembersState {
  items: Member[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MembersState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/members`);
  return response.data;
});

export const addMember = createAsyncThunk('members/addMember', async (member: Omit<Member, 'id'>) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/members`, member);
  return response.data;
});

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Ensure we're getting an array from the API
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch members';
        // Reset items to empty array on error
        state.items = [];
      })
      .addCase(addMember.fulfilled, (state, action) => {
        if (!Array.isArray(state.items)) {
          state.items = [];
        }
        state.items.push(action.payload);
      });
  },
});

export default membersSlice.reducer;
