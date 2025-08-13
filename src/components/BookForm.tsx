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
import { addBook } from '../store/booksSlice';

const BookForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: ''
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
      await dispatch(addBook({ ...formData, available: true })).unwrap();
      setFormData({ title: '', author: '', isbn: '' });
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Add New Book
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            label="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Add Book
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default BookForm;
