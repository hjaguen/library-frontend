import React from 'react';
import { Container, Box } from '@mui/material';
import CheckoutPanel from '../components/CheckoutPanel';

const Checkouts: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <CheckoutPanel />
      </Box>
    </Container>
  );
};

export default Checkouts;
