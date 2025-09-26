import React, { useState } from 'react';
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
} from '../utils';
import { MEMBER_STATUS, MEMBERSHIP_TYPES } from '../constants';

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

  const filteredMembers = filterMembers(
    members,
    searchTerm,
    statusFilter,
    membershipFilter
  );
  const tableData = filteredMembers.map(formatMemberForTable);

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
            Showing {filteredMembers.length} of {members.length} members
          </Typography>
        </Box>

        {/* Members Table */}
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Membership</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Join Date</TableCell>
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

        {filteredMembers.length === 0 && (
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
