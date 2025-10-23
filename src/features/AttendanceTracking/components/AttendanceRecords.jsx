import React from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  MenuItem,
  Chip,
  Avatar,
  IconButton,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Logout as CheckOutIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAttendance } from '../context/AttendanceContext';
import {
  formatTime,
  formatDuration,
  getRelativeDateLabel,
} from '../utils/attendanceUtils';
import { ATTENDANCE_STATUS } from '../constants/attendanceConstants';
import AttendanceFilters from './AttendanceFilters';

const AttendanceRecords = () => {
  const {
    filteredRecords,
    pagination,
    setPagination,
    openDialog,
    setSelectedRecord,
    deleteAttendanceRecord,
  } = useAttendance();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRecordId, setSelectedRecordId] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPagination({ page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      page: 0,
      pageSize: parseInt(event.target.value, 10),
    });
  };

  const handleMenuOpen = (event, recordId) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecordId(recordId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecordId(null);
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    openDialog('viewDetails');
    handleMenuClose();
  };

  const handleCheckOut = (record) => {
    setSelectedRecord(record);
    openDialog('checkOut');
    handleMenuClose();
  };

  const handleDelete = async (recordId) => {
    if (
      window.confirm('Are you sure you want to delete this attendance record?')
    ) {
      try {
        await deleteAttendanceRecord(recordId);
      } catch (error) {
        // Error is handled by context
      }
    }
    handleMenuClose();
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      [ATTENDANCE_STATUS.CHECKED_IN]: {
        label: 'Active',
        color: 'success',
        variant: 'filled',
      },
      [ATTENDANCE_STATUS.COMPLETED]: {
        label: 'Completed',
        color: 'primary',
        variant: 'outlined',
      },
    };

    const config = statusConfig[status] || {
      label: status,
      color: 'default',
      variant: 'outlined',
    };

    return (
      <Chip
        label={config.label}
        color={config.color}
        variant={config.variant}
        size='small'
      />
    );
  };

  // Paginate records
  const startIndex = pagination.page * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  return (
    <Box>
      {/* Header and Filters */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant='h6'>
            Attendance Records ({filteredRecords.length})
          </Typography>

          <Button variant='contained' onClick={() => openDialog('checkIn')}>
            New Check-In
          </Button>
        </Box>

        <AttendanceFilters />
      </Box>

      {/* Records Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Check-In</TableCell>
                <TableCell>Check-Out</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((record) => (
                  <TableRow key={record.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            mr: 2,
                            bgcolor: 'primary.light',
                            width: 32,
                            height: 32,
                          }}
                        >
                          <PersonIcon fontSize='small' />
                        </Avatar>
                        <Box>
                          <Typography variant='subtitle2'>
                            {record.memberName}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {record.membershipId}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {getRelativeDateLabel(record.date)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {formatTime(record.checkInTime)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {record.checkOutTime
                          ? formatTime(record.checkOutTime)
                          : '--'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {formatDuration(record.duration)}
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(record.status)}</TableCell>
                    <TableCell align='right'>
                      <IconButton
                        size='small'
                        onClick={(e) => handleMenuOpen(e, record.id)}
                      >
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align='center' sx={{ py: 4 }}>
                    <Typography variant='body2' color='text.secondary'>
                      No attendance records found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {filteredRecords.length > 0 && (
          <TablePagination
            component='div'
            count={filteredRecords.length}
            page={pagination.page}
            onPageChange={handleChangePage}
            rowsPerPage={pagination.pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        )}
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            const record = filteredRecords.find(
              (r) => r.id === selectedRecordId
            );
            if (record) handleViewDetails(record);
          }}
        >
          <ViewIcon sx={{ mr: 1 }} fontSize='small' />
          View Details
        </MenuItem>

        {(() => {
          const record = filteredRecords.find((r) => r.id === selectedRecordId);
          return (
            record?.status === ATTENDANCE_STATUS.CHECKED_IN && (
              <MenuItem onClick={() => handleCheckOut(record)}>
                <CheckOutIcon sx={{ mr: 1 }} fontSize='small' />
                Check Out
              </MenuItem>
            )
          );
        })()}

        <MenuItem
          onClick={() => handleDelete(selectedRecordId)}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} fontSize='small' />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AttendanceRecords;
