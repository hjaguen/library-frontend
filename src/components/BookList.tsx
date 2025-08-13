import React, { useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Box
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBooks } from '../store/booksSlice';

const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Debug the entire books state
  const booksState = useAppSelector((state) => state.books);
  console.log('Books state:', booksState);
  console.log('Books items:', booksState?.items);

  // More defensive selector
  const books = useAppSelector((state) => {
    const items = state.books?.items;
    return Array.isArray(items) ? items : [];
  });
  const status = useAppSelector((state) => state.books?.status ?? 'idle');
  const error = useAppSelector((state) => state.books?.error);

  // Fetch books on component mount if not already loaded
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);


  if (status === 'loading') {
    return <Typography>Loading books...</Typography>;
  }

  if (status === 'failed') {
    return <Typography color="error">Error: {error}</Typography>;
  }

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
        Books
      </Typography>

      {isMobile ? (
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item xs={12} key={book.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    By {book.author}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    ISBN: {book.isbn}
                  </Typography>
                  <Chip 
                    label={book.available ? 'Available' : 'Checked Out'}
                    color={book.available ? 'success' : 'error'}
                    size="small"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>
                    <Chip 
                      label={book.available ? 'Available' : 'Checked Out'}
                      color={book.available ? 'success' : 'error'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default BookList;
