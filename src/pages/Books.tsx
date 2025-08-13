import React from 'react';
import { Container, Box } from '@mui/material';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import ErrorBoundary from '../components/ErrorBoundary';

const Books: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <ErrorBoundary>
          <BookList />
        </ErrorBoundary>
        <Box sx={{ mt: 4 }}>
          <ErrorBoundary>
            <BookForm />
          </ErrorBoundary>
        </Box>
      </Box>
    </Container>
  );
};

export default Books;
