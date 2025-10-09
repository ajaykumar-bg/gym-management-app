/**
 * WorkoutTemplates Component
 * Displays available workout templates for quick workout creation
 */

import React, { memo, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useWorkout } from '../context';
import TemplateDetailsDialog from './TemplateDetailsDialog';
import TemplateCustomizationDialog from './TemplateCustomizationDialog';
import TemplateFilters from './TemplateFilters';
import TemplateGrid from './TemplateGrid';
import { filterTemplatesByCategory } from './template.utils';

const WorkoutTemplates = memo(() => {
  const { templates, navigateToList, createWorkoutFromTemplate } = useWorkout();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCustomizationDialog, setShowCustomizationDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [viewTemplate, setViewTemplate] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);
    setShowCustomizationDialog(true);
  };

  const handleViewDetails = (template) => {
    setViewTemplate(template);
    setShowDetailsDialog(true);
  };

  const handleConfirmCustomization = (customization) => {
    if (selectedTemplate) {
      createWorkoutFromTemplate(selectedTemplate.id, customization);
    }
    setSelectedTemplate(null);
  };

  const handleCloseCustomization = () => {
    setShowCustomizationDialog(false);
    setSelectedTemplate(null);
  };

  const handleCloseDetails = () => {
    setShowDetailsDialog(false);
    setViewTemplate(null);
  };

  const filteredTemplates = filterTemplatesByCategory(
    templates,
    categoryFilter
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={navigateToList} sx={{ mr: 1 }}>
          <BackIcon />
        </IconButton>
        <Typography variant='h4' component='h1'>
          Workout Templates
        </Typography>
      </Box>

      <TemplateFilters
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />

      <TemplateGrid
        templates={filteredTemplates}
        onUseTemplate={handleUseTemplate}
        onViewDetails={handleViewDetails}
      />

      <TemplateCustomizationDialog
        open={showCustomizationDialog}
        template={selectedTemplate}
        onClose={handleCloseCustomization}
        onConfirm={handleConfirmCustomization}
      />

      <TemplateDetailsDialog
        open={showDetailsDialog}
        template={viewTemplate}
        onClose={handleCloseDetails}
      />
    </Box>
  );
});

WorkoutTemplates.displayName = 'WorkoutTemplates';

export default WorkoutTemplates;
