/**
 * Equipment Table Component
 * Displays equipment in a sortable table
 */

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Edit,
  Delete,
  Build,
  CheckCircle,
  Warning,
  Error,
  FitnessCenter,
} from '@mui/icons-material';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_STATUS } from '../equipment.constants';
import { getStatusColor } from '../equipment.utils';

const getStatusIcon = (status) => {
  switch (status) {
    case 'operational':
      return <CheckCircle color='success' />;
    case 'maintenance':
      return <Build color='warning' />;
    case 'repair':
      return <Warning color='error' />;
    case 'out-of-order':
      return <Error color='error' />;
    default:
      return <FitnessCenter />;
  }
};

const EquipmentTable = ({
  equipment,
  orderBy,
  order,
  onRequestSort,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => onRequestSort('name')}
              >
                Equipment
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'category'}
                direction={orderBy === 'category' ? order : 'asc'}
                onClick={() => onRequestSort('category')}
              >
                Category
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'status'}
                direction={orderBy === 'status' ? order : 'asc'}
                onClick={() => onRequestSort('status')}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'location'}
                direction={orderBy === 'location' ? order : 'asc'}
                onClick={() => onRequestSort('location')}
              >
                Location
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'lastMaintenance'}
                direction={orderBy === 'lastMaintenance' ? order : 'asc'}
                onClick={() => onRequestSort('lastMaintenance')}
              >
                Last Maintenance
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'nextMaintenance'}
                direction={orderBy === 'nextMaintenance' ? order : 'asc'}
                onClick={() => onRequestSort('nextMaintenance')}
              >
                Next Maintenance
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipment.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Box>
                  <Typography variant='subtitle2'>{item.name}</Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {item.manufacturer} {item.model}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={EQUIPMENT_CATEGORIES[item.category]}
                  size='small'
                  color='primary'
                  variant='outlined'
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getStatusIcon(item.status)}
                  <Chip
                    label={EQUIPMENT_STATUS[item.status]}
                    size='small'
                    color={getStatusColor(item.status)}
                  />
                </Box>
              </TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>
                {item.lastMaintenance
                  ? new Date(item.lastMaintenance).toLocaleDateString()
                  : 'N/A'}
              </TableCell>
              <TableCell>
                {item.nextMaintenance
                  ? new Date(item.nextMaintenance).toLocaleDateString()
                  : 'N/A'}
              </TableCell>
              <TableCell>
                <IconButton size='small' onClick={() => onEdit(item)}>
                  <Edit />
                </IconButton>
                <IconButton
                  size='small'
                  onClick={() => onDelete(item.id)}
                  color='error'
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(EquipmentTable);
