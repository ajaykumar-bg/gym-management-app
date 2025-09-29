import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Chip,
  IconButton,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Search,
  Add,
  Visibility,
  Edit,
  Delete,
  FilterList,
} from '@mui/icons-material';
import {
  getMemberStatusColor,
  getMembershipTypeColor,
  formatMemberForTable,
  filterMembers,
} from '../member.utils';
import { MEMBER_STATUS, MEMBERSHIP_TYPES } from '../member.constants';

const MemberList = ({
  members,
  onViewMember,
  onEditMember,
  onDeleteMember,
  onAddMember,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedAndFilteredMembers = useMemo(() => {
    const filtered = filterMembers(
      members,
      searchTerm,
      statusFilter,
      membershipFilter
    );

    const sorted = [...filtered].sort((a, b) => {
      let aValue, bValue;

      switch (orderBy) {
        case 'name':
          aValue = `${a.firstName || ''} ${a.lastName || ''}`.toLowerCase();
          bValue = `${b.firstName || ''} ${b.lastName || ''}`.toLowerCase();
          break;
        case 'email':
          aValue = (a.email || '').toLowerCase();
          bValue = (b.email || '').toLowerCase();
          break;
        case 'membershipType':
          aValue = a.membershipInfo?.type || '';
          bValue = b.membershipInfo?.type || '';
          break;
        case 'status':
          aValue = a.membershipInfo?.status || '';
          bValue = b.membershipInfo?.status || '';
          break;
        case 'joinDate':
          aValue = new Date(a.joinDate || '');
          bValue = new Date(b.joinDate || '');
          break;
        default:
          aValue = a[orderBy];
          bValue = b[orderBy];
      }

      if (order === 'desc') {
        return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
      }
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });

    return sorted;
  }, [members, searchTerm, statusFilter, membershipFilter, order, orderBy]);

  const tableData = sortedAndFilteredMembers.map(formatMemberForTable);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleMembershipFilterChange = (event) => {
    setMembershipFilter(event.target.value);
  };

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h5' component='div'>
            Member Management
          </Typography>
        }
        action={
          <Button variant='contained' startIcon={<Add />} onClick={onAddMember}>
            Add Member
          </Button>
        }
      />

      <CardContent>
        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Search members...'
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <Search sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label='Status'
              >
                <MenuItem value='all'>All Status</MenuItem>
                {Object.values(MEMBER_STATUS).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Membership</InputLabel>
              <Select
                value={membershipFilter}
                onChange={handleMembershipFilterChange}
                label='Membership'
              >
                <MenuItem value='all'>All Types</MenuItem>
                {Object.values(MEMBERSHIP_TYPES).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <Button
              fullWidth
              variant='outlined'
              startIcon={<FilterList />}
              sx={{ height: '56px' }}
            >
              Filters
            </Button>
          </Grid>
        </Grid>

        {/* Results Summary */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Showing {sortedAndFilteredMembers.length} of {members.length}{' '}
            members
          </Typography>
        </Box>

        {/* Members Table */}
        <TableContainer component={Paper} elevation={0}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Member
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'email'}
                    direction={orderBy === 'email' ? order : 'asc'}
                    onClick={() => handleRequestSort('email')}
                  >
                    Contact
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'membershipType'}
                    direction={orderBy === 'membershipType' ? order : 'asc'}
                    onClick={() => handleRequestSort('membershipType')}
                  >
                    Membership
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleRequestSort('status')}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'joinDate'}
                    direction={orderBy === 'joinDate' ? order : 'asc'}
                    onClick={() => handleRequestSort('joinDate')}
                  >
                    Join Date
                  </TableSortLabel>
                </TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((member) => {
                const originalMember = members.find((m) => m.id === member.id);
                return (
                  <TableRow key={member.id} hover>
                    <TableCell>
                      <Box display='flex' alignItems='center'>
                        <Avatar sx={{ mr: 2 }}>
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </Avatar>
                        <Box>
                          <Typography variant='body1' fontWeight='medium'>
                            {member.name}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {member.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant='body2'>{member.email}</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {member.phone}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={member.membershipType}
                        color={getMembershipTypeColor(
                          originalMember.membershipInfo.type
                        )}
                        size='small'
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={member.status}
                        color={getMemberStatusColor(
                          originalMember.membershipInfo.status
                        )}
                        size='small'
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant='body2'>{member.joinDate}</Typography>
                    </TableCell>

                    <TableCell align='center'>
                      <Box display='flex' justifyContent='center' gap={1}>
                        <IconButton
                          size='small'
                          onClick={() => onViewMember(originalMember)}
                          color='primary'
                        >
                          <Visibility fontSize='small' />
                        </IconButton>
                        <IconButton
                          size='small'
                          onClick={() => onEditMember(originalMember)}
                          color='warning'
                        >
                          <Edit fontSize='small' />
                        </IconButton>
                        <IconButton
                          size='small'
                          onClick={() => onDeleteMember(originalMember.id)}
                          color='error'
                        >
                          <Delete fontSize='small' />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {sortedAndFilteredMembers.length === 0 && (
          <Box textAlign='center' py={4}>
            <Typography variant='h6' color='text.secondary'>
              No members found
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Try adjusting your search criteria
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberList;
