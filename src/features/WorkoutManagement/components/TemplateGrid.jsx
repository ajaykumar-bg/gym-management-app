/**
 * TemplateGrid Component
 * Grid layout for displaying workout template cards
 */

import React, { memo } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import TemplateCard from './TemplateCard';

const TemplateGrid = memo(({ templates, onUseTemplate, onViewDetails }) => {
  if (templates.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant='h6' color='text.secondary'>
          No templates found
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Try selecting a different category or clear the filter.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {templates.map((template) => (
        <Grid key={template.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <TemplateCard
            template={template}
            onUseTemplate={onUseTemplate}
            onViewDetails={onViewDetails}
          />
        </Grid>
      ))}
    </Grid>
  );
});

TemplateGrid.displayName = 'TemplateGrid';

export default TemplateGrid;
