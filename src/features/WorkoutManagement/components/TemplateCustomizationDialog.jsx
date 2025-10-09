/**
 * TemplateCustomizationDialog Component
 * Dialog for customizing workout template settings before creation
 */

import React, { memo, useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const TemplateCustomizationDialog = memo(
  ({ open, template, onClose, onConfirm }) => {
    const [customization, setCustomization] = useState({
      name: template?.name || '',
      difficulty: template?.difficulty || 'intermediate',
      estimatedDuration: template?.estimatedDuration || 60,
    });

    const handleChange = (field, value) => {
      setCustomization((prev) => ({ ...prev, [field]: value }));
    };

    const handleConfirm = () => {
      onConfirm(customization);
      onClose();
    };

    if (!template) return null;

    return (
      <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
        <DialogTitle>Customize Workout Template</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label='Workout Name'
              value={customization.name}
              onChange={(e) => handleChange('name', e.target.value)}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={customization.difficulty}
                label='Difficulty'
                onChange={(e) => handleChange('difficulty', e.target.value)}
              >
                <MenuItem value='beginner'>Beginner</MenuItem>
                <MenuItem value='intermediate'>Intermediate</MenuItem>
                <MenuItem value='expert'>Expert</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label='Estimated Duration (minutes)'
              type='number'
              value={customization.estimatedDuration}
              onChange={(e) =>
                handleChange(
                  'estimatedDuration',
                  parseInt(e.target.value) || 60
                )
              }
              inputProps={{ min: 15, max: 180 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm} variant='contained'>
            Create Workout
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

TemplateCustomizationDialog.displayName = 'TemplateCustomizationDialog';

export default TemplateCustomizationDialog;
