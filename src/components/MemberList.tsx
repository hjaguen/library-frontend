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
import { fetchMembers } from '../store/membersSlice';

const MemberList: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Debug the entire members state
  const membersState = useAppSelector((state) => state.members);
  console.log('Members state:', membersState);

  // More defensive selector
  const members = useAppSelector((state) => {
    const items = state.members?.items;
    return Array.isArray(items) ? items : [];
  });
  const status = useAppSelector((state) => state.members?.status ?? 'idle');
  const error = useAppSelector((state) => state.members?.error);

  // Fetch members on component mount
  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  if (status === 'loading') {
    return <Typography>Loading members...</Typography>;
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
        Members
      </Typography>

      {isMobile ? (
        <Grid container spacing={2}>
          {members.map((member) => (
            <Grid item xs={12} key={member.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {member.email}
                  </Typography>
                  <Chip
                    label={member.membershipStatus}
                    color={member.membershipStatus === 'active' ? 'success' : 'error'}
                    size="small"
                    sx={{ mt: 1 }}
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
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={member.membershipStatus}
                      color={member.membershipStatus === 'active' ? 'success' : 'error'}
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

export default MemberList;
