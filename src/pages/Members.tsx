import React from 'react';
import { Container, Box } from '@mui/material';
import MemberList from '../components/MemberList';
import MemberForm from '../components/MemberForm';
import ErrorBoundary from '../components/ErrorBoundary';

const Members: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <ErrorBoundary>
          <MemberList />
        </ErrorBoundary>
        <Box sx={{ mt: 4 }}>
          <ErrorBoundary>
            <MemberForm />
          </ErrorBoundary>
        </Box>
      </Box>
    </Container>
  );
};

export default Members;
