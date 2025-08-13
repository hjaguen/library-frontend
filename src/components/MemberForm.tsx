import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Stack
} from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import { addMember } from '../store/membersSlice';

const MemberForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addMember({ ...formData, membershipStatus: 'active' })).unwrap();
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Failed to add member:', error);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Add New Member
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Add Member
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default MemberForm;
