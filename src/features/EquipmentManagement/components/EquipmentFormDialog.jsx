/**
 * Equipment Form Dialog Component
 * Modal form for creating/editing equipment
 */

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from '@mui/material';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_STATUS } from '../equipment.constants';

const EquipmentFormDialog = ({
  open,
  selectedEquipment,
  formData,
  onClose,
  onSave,
  onFormDataChange,
}) => {
  const handleFieldChange = (field) => (event) => {
    onFormDataChange(field, event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
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
                onChange={handleFieldChange('name')}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label='Category'
                  onChange={handleFieldChange('category')}
                  required
                >
                  {Object.entries(EQUIPMENT_CATEGORIES).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Manufacturer'
                value={formData.manufacturer}
                onChange={handleFieldChange('manufacturer')}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Model'
                value={formData.model}
                onChange={handleFieldChange('model')}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Serial Number'
                value={formData.serialNumber}
                onChange={handleFieldChange('serialNumber')}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Location'
                value={formData.location}
                onChange={handleFieldChange('location')}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Purchase Date'
                type='date'
                InputLabelProps={{ shrink: true }}
                value={formData.purchaseDate}
                onChange={handleFieldChange('purchaseDate')}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Purchase Price'
                type='number'
                value={formData.purchasePrice}
                onChange={handleFieldChange('purchasePrice')}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Warranty Expiry'
                type='date'
                InputLabelProps={{ shrink: true }}
                value={formData.warrantyExpiry}
                onChange={handleFieldChange('warrantyExpiry')}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label='Status'
                  onChange={handleFieldChange('status')}
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
                onChange={handleFieldChange('notes')}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant='contained'>
          {selectedEquipment ? 'Update' : 'Add'} Equipment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(EquipmentFormDialog);
