import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { fetchCheckouts, createCheckout, returnBook } from '../store/checkoutsSlice';
import { fetchBooks, updateBookAvailability } from '../store/booksSlice';
import { fetchMembers } from '../store/membersSlice';

const CheckoutPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
}

interface Member {
  id: number;
  name: string;
  email: string;
  membershipStatus: 'active' | 'inactive';
}

interface Checkout {
  id: string;
  bookId: string;
  memberId: string;
  checkoutDate: string;
  dueDate: string;
  returnDate?: string;
}

  const books = useAppSelector((state) => {
    const items = state.books?.items;
    return Array.isArray(items) ? items : [];
  }) as Book[];

  const members = useAppSelector((state) => {
    const items = state.members?.items;
    return Array.isArray(items) ? items : [];
  }) as Member[];

  const checkouts = useAppSelector((state) => {
    const items = state.checkouts?.items;
    return Array.isArray(items) ? items : [];
  }) as Checkout[];

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchMembers());
    dispatch(fetchCheckouts());
  }, [dispatch]);

  const handleBookChange = (event: SelectChangeEvent) => {
    setSelectedBookId(event.target.value);
  };

  const handleMemberChange = (event: SelectChangeEvent) => {
    setSelectedMemberId(event.target.value);
  };

  const handleCheckout = async () => {
    if (selectedBookId && selectedMemberId) {
      try {
        // Create checkout first
        const checkoutResult = await dispatch(createCheckout({
          bookId: selectedBookId,
          memberId: selectedMemberId
        })).unwrap();

        if (checkoutResult) {
          // Clear selections
          setSelectedBookId('');
          setSelectedMemberId('');
          
          // Update book availability
          await dispatch(updateBookAvailability({
            id: selectedBookId,
            available: false
          })).unwrap();

          // Refresh checkouts list
          dispatch(fetchCheckouts());
        }
      } catch (error) {
        console.error('Failed to create checkout:', error);
      }
    }
  };

  const handleReturn = async (checkoutId: string, bookId: string) => {
    try {
      const returnResult = await dispatch(returnBook(checkoutId)).unwrap();
      
      if (returnResult) {
        // Update book availability
        await dispatch(updateBookAvailability({
          id: bookId,
          available: true
        })).unwrap();

        // Refresh checkouts list
        dispatch(fetchCheckouts());
      }
    } catch (error) {
      console.error('Failed to return book:', error);
    }
  };

  const availableBooks = books.filter(book => book.available);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
          mb: { xs: 2, sm: 3 }
        }}
      >
        Book Checkout
      </Typography>
      
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: { xs: 2, sm: 3 } }}>
        <Stack spacing={2}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
          >
            New Checkout
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Book</InputLabel>
            <Select
              value={selectedBookId}
              label="Book"
              onChange={handleBookChange}
            >
              {availableBooks.map((book) => (
                <MenuItem key={book.id} value={book.id}>
                  {book.title} - {book.author}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel>Member</InputLabel>
            <Select
              value={selectedMemberId}
              label="Member"
              onChange={handleMemberChange}
            >
              {members
                .filter(member => member.membershipStatus === 'active')
                .map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            disabled={!selectedBookId || !selectedMemberId}
          >
            Checkout Book
          </Button>
        </Stack>
      </Paper>

      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ 
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          mt: { xs: 3, sm: 4 }
        }}
      >
        Active Checkouts
      </Typography>
      
      {isMobile ? (
        <Stack spacing={2}>
          {checkouts
            .filter(checkout => !checkout.returnDate)
            .map((checkout) => {
              const book = books.find(b => b.id === checkout.bookId);
              const member = members.find(m => m.id === checkout.memberId);
              
              return (
                <Card key={checkout.id}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {book?.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Borrowed by: {member?.name}
                    </Typography>
                    <Box sx={{ my: 1 }}>
                      <Typography variant="body2" component="div">
                        Checkout Date: {new Date(checkout.checkoutDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" component="div" sx={{ mt: 0.5 }}>
                        Due Date: {new Date(checkout.dueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      onClick={() => handleReturn(checkout.id, checkout.bookId)}
                      sx={{ mt: 1 }}
                      fullWidth
                    >
                      Return Book
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
        </Stack>
      ) : (
        <TableContainer 
          component={Paper}
          sx={{ 
            overflowX: 'auto',
            '& .MuiTable-root': {
              minWidth: 650
            }
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Book</TableCell>
                <TableCell>Member</TableCell>
                <TableCell>Checkout Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {checkouts
                .filter(checkout => !checkout.returnDate)
                .map((checkout) => {
                  const book = books.find(b => b.id === checkout.bookId);
                  const member = members.find(m => m.id === checkout.memberId);
                  
                  return (
                    <TableRow key={checkout.id}>
                      <TableCell>{book?.title}</TableCell>
                      <TableCell>{member?.name}</TableCell>
                      <TableCell>{new Date(checkout.checkoutDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(checkout.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => handleReturn(checkout.id, checkout.bookId)}
                        >
                          Return
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CheckoutPanel;
