import React from 'react';
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Assessment as ReportIcon,
} from '@mui/icons-material';
import { useReporting } from '../context/ReportingContext';
import { formatDate } from '../utils/reportingUtils';
import { REPORT_TYPES } from '../constants/reportingConstants';

const ReportList = () => {
  const {
    generatedReports,
    filters,
    setFilters,
    pagination,
    setPagination,
    openDialog,
  } = useReporting();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedReportId, setSelectedReportId] = React.useState(null);

  const handleSearchChange = (event) => {
    setFilters({ searchTerm: event.target.value });
  };

  const handleChangePage = (event, newPage) => {
    setPagination({ page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      page: 0,
      pageSize: parseInt(event.target.value, 10),
    });
  };

  const handleMenuOpen = (event, reportId) => {
    setAnchorEl(event.currentTarget);
    setSelectedReportId(reportId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReportId(null);
  };

  const handleViewReport = (report) => {
    // Navigate to report details or set current report
    handleMenuClose();
  };

  const handleDownloadReport = (report) => {
    openDialog('export');
    handleMenuClose();
  };

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      // Delete report logic here
    }
    handleMenuClose();
  };

  const getReportTypeLabel = (type) => {
    const typeLabels = {
      [REPORT_TYPES.REGISTRATION]: 'Registration',
      [REPORT_TYPES.ATTENDANCE]: 'Attendance',
      [REPORT_TYPES.PAYMENT]: 'Payment',
      [REPORT_TYPES.TRAINER_PERFORMANCE]: 'Trainer Performance',
    };
    return typeLabels[type] || type;
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      completed: { label: 'Completed', color: 'success' },
      generating: { label: 'Generating', color: 'warning' },
      failed: { label: 'Failed', color: 'error' },
      scheduled: { label: 'Scheduled', color: 'info' },
    };

    const config = statusConfig[status] || { label: status, color: 'default' };
    return (
      <Chip
        label={config.label}
        color={config.color}
        variant='outlined'
        size='small'
      />
    );
  };

  // Filter reports based on search term
  const filteredReports = generatedReports.filter(
    (report) =>
      !filters.searchTerm ||
      report.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      getReportTypeLabel(report.type)
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase())
  );

  // Paginate reports
  const startIndex = pagination.page * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedReports = filteredReports.slice(startIndex, endIndex);

  return (
    <Box>
      {/* Header and Search */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6'>
          Generated Reports ({filteredReports.length})
        </Typography>

        <TextField
          placeholder='Search reports...'
          value={filters.searchTerm}
          onChange={handleSearchChange}
          size='small'
          sx={{ minWidth: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Reports Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Generated</TableCell>
                <TableCell>Records</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedReports.length > 0 ? (
                paginatedReports.map((report) => (
                  <TableRow key={report.id} hover>
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
                          <ReportIcon fontSize='small' />
                        </Avatar>
                        <Box>
                          <Typography variant='subtitle2'>
                            {report.title}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            ID: {report.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getReportTypeLabel(report.type)}
                        variant='outlined'
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {formatDate(report.generatedAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {report.dataCount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(report.status)}</TableCell>
                    <TableCell align='right'>
                      <IconButton
                        size='small'
                        onClick={(e) => handleMenuOpen(e, report.id)}
                      >
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align='center' sx={{ py: 4 }}>
                    <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'grey.100' }}>
                      <ReportIcon />
                    </Avatar>
                    <Typography variant='body2' color='text.secondary'>
                      {filters.searchTerm
                        ? 'No reports match your search'
                        : 'No reports generated yet'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {filteredReports.length > 0 && (
          <TablePagination
            component='div'
            count={filteredReports.length}
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
            const report = generatedReports.find(
              (r) => r.id === selectedReportId
            );
            if (report) handleViewReport(report);
          }}
        >
          <ViewIcon sx={{ mr: 1 }} fontSize='small' />
          View Report
        </MenuItem>

        <MenuItem
          onClick={() => {
            const report = generatedReports.find(
              (r) => r.id === selectedReportId
            );
            if (report) handleDownloadReport(report);
          }}
        >
          <DownloadIcon sx={{ mr: 1 }} fontSize='small' />
          Download
        </MenuItem>

        <MenuItem
          onClick={() => handleDeleteReport(selectedReportId)}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} fontSize='small' />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ReportList;
