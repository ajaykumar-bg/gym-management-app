import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Build,
  CheckCircle,
  Warning,
  Error,
  FitnessCenter,
} from '@mui/icons-material';
import {
  EQUIPMENT_CATEGORIES,
  EQUIPMENT_STATUS,
  MOCK_EQUIPMENT,
} from './constants';
import { getStatusColor } from './utils';

const EquipmentManagement = () => {
  const [equipment, setEquipment] = useState(MOCK_EQUIPMENT);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    purchasePrice: '',
    warrantyExpiry: '',
    status: 'operational',
    maintenanceSchedule: 'monthly',
    location: '',
    notes: '',
  });

  const handleCreateEquipment = () => {
    setSelectedEquipment(null);
    setFormData({
      name: '',
      category: '',
      manufacturer: '',
      model: '',
      serialNumber: '',
      purchaseDate: '',
      purchasePrice: '',
      warrantyExpiry: '',
      status: 'operational',
      maintenanceSchedule: 'monthly',
      location: '',
      notes: '',
    });
    setShowForm(true);
  };

  const handleEditEquipment = (equipment) => {
    setSelectedEquipment(equipment);
    setFormData({
      name: equipment.name,
      category: equipment.category,
      manufacturer: equipment.manufacturer,
      model: equipment.model,
      serialNumber: equipment.serialNumber,
      purchaseDate: equipment.purchaseDate,
      purchasePrice: equipment.purchasePrice.toString(),
      warrantyExpiry: equipment.warrantyExpiry,
      status: equipment.status,
      maintenanceSchedule: equipment.maintenanceSchedule,
      location: equipment.location,
      notes: equipment.notes || '',
    });
    setShowForm(true);
  };

  const handleSaveEquipment = () => {
    const equipmentData = {
      ...formData,
      id: selectedEquipment?.id || `EQ${Date.now().toString().slice(-3)}`,
      purchasePrice: parseFloat(formData.purchasePrice),
      addedDate:
        selectedEquipment?.addedDate || new Date().toISOString().split('T')[0],
      lastMaintenance: selectedEquipment?.lastMaintenance,
      nextMaintenance: selectedEquipment?.nextMaintenance,
    };

    if (selectedEquipment) {
      setEquipment((prev) =>
        prev.map((eq) => (eq.id === selectedEquipment.id ? equipmentData : eq))
      );
    } else {
      setEquipment((prev) => [...prev, equipmentData]);
    }

    setShowForm(false);
  };

  const handleDeleteEquipment = (equipmentId) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      setEquipment((prev) => prev.filter((eq) => eq.id !== equipmentId));
    }
  };

  const filteredEquipment = equipment.filter((eq) => {
    const categoryMatch =
      filterCategory === 'all' || eq.category === filterCategory;
    const statusMatch = filterStatus === 'all' || eq.status === filterStatus;
    return categoryMatch && statusMatch;
  });

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

  const equipmentStats = {
    total: equipment.length,
    operational: equipment.filter((eq) => eq.status === 'operational').length,
    maintenance: equipment.filter((eq) => eq.status === 'maintenance').length,
    repair: equipment.filter((eq) => eq.status === 'repair').length,
    outOfOrder: equipment.filter((eq) => eq.status === 'out-of-order').length,
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h4' component='h1'>
          Equipment Management
        </Typography>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={handleCreateEquipment}
        >
          Add Equipment
        </Button>
      </Box>

      {/* Equipment Status Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant='h4' color='primary'>
                {equipmentStats.total}
              </Typography>
              <Typography variant='body2'>Total Equipment</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant='h4' color='success.main'>
                {equipmentStats.operational}
              </Typography>
              <Typography variant='body2'>Operational</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant='h4' color='warning.main'>
                {equipmentStats.maintenance}
              </Typography>
              <Typography variant='body2'>In Maintenance</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant='h4' color='error.main'>
                {equipmentStats.repair}
              </Typography>
              <Typography variant='body2'>Under Repair</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant='h4' color='error.dark'>
                {equipmentStats.outOfOrder}
              </Typography>
              <Typography variant='body2'>Out of Order</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl size='small' sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={filterCategory}
            label='Filter by Category'
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value='all'>All Categories</MenuItem>
            {Object.entries(EQUIPMENT_CATEGORIES).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={filterStatus}
            label='Filter by Status'
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value='all'>All Status</MenuItem>
            {Object.entries(EQUIPMENT_STATUS).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Equipment Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Equipment</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Last Maintenance</TableCell>
              <TableCell>Next Maintenance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEquipment.map((item) => (
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
                  <IconButton
                    size='small'
                    onClick={() => handleEditEquipment(item)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size='small'
                    onClick={() => handleDeleteEquipment(item.id)}
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

      {/* Equipment Form Dialog */}
      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          {selectedEquipment ? 'Edit Equipment' : 'Add New Equipment'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Equipment Name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label='Category'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    required
                  >
                    {Object.entries(EQUIPMENT_CATEGORIES).map(
                      ([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Manufacturer'
                  value={formData.manufacturer}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      manufacturer: e.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Model'
                  value={formData.model}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, model: e.target.value }))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Serial Number'
                  value={formData.serialNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      serialNumber: e.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Location'
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Purchase Date'
                  type='date'
                  InputLabelProps={{ shrink: true }}
                  value={formData.purchaseDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      purchaseDate: e.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Purchase Price'
                  type='number'
                  value={formData.purchasePrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      purchasePrice: e.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Warranty Expiry'
                  type='date'
                  InputLabelProps={{ shrink: true }}
                  value={formData.warrantyExpiry}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      warrantyExpiry: e.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label='Status'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                  >
                    {Object.entries(EQUIPMENT_STATUS).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label='Notes'
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)}>Cancel</Button>
          <Button onClick={handleSaveEquipment} variant='contained'>
            {selectedEquipment ? 'Update' : 'Add'} Equipment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EquipmentManagement;
