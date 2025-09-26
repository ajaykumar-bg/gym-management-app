/**
 * Exercise Attribute Chips Component
 * Displays exercise attributes as colored chips with tooltips
 */

import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { CHIP_COLORS, TOOLTIP_CONFIG } from '../../constants/ui.constants';
import { formatMuscleGroups } from '../../utils/exerciseUtils';

/**
 * Custom styled tooltip component
 */
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: TOOLTIP_CONFIG.MAX_WIDTH,
    fontSize: theme.typography.pxToRem(TOOLTIP_CONFIG.FONT_SIZE),
  },
}));

/**
 * Individual attribute chip component
 */
const AttributeChip = ({ label, color, tooltip, size = 'small' }) => {
  if (!label || label === '-') {
    return null;
  }

  const chip = (
    <Chip
      label={label}
      color={color}
      size={size}
      sx={{ textTransform: 'capitalize' }}
    />
  );

  if (!tooltip) {
    return chip;
  }

  return (
    <Tooltip title={tooltip} arrow>
      {chip}
    </Tooltip>
  );
};

/**
 * Muscle groups chip with enhanced tooltip
 */
const MuscleChip = ({ exercise }) => {
  if (!exercise?.primaryMuscles?.length) {
    return null;
  }

  const primaryMuscle = exercise.primaryMuscles[0];
  const secondaryMuscles = exercise.secondaryMuscles || [];

  const tooltip = (
    <React.Fragment>
      <Typography color="inherit" variant="subtitle2">
        Muscle Groups Involved
      </Typography>
      <Box sx={{ mt: 0.5 }}>
        <Typography variant="caption">
          <strong>Primary: </strong>
          {formatMuscleGroups(exercise.primaryMuscles)}
        </Typography>
        {secondaryMuscles.length > 0 && (
          <Typography variant="caption" display="block">
            <strong>Secondary: </strong>
            {formatMuscleGroups(secondaryMuscles)}
          </Typography>
        )}
      </Box>
    </React.Fragment>
  );

  return (
    <HtmlTooltip title={tooltip}>
      <Chip
        label={primaryMuscle}
        color={CHIP_COLORS.PRIMARY_MUSCLE}
        size="small"
        sx={{ textTransform: 'capitalize' }}
      />
    </HtmlTooltip>
  );
};

/**
 * ExerciseChips component
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise object
 * @param {boolean} props.showAll - Whether to show all chips (default: true)
 * @param {Array} props.visibleChips - Array of chip types to show (default: all)
 * @returns {JSX.Element} ExerciseChips component
 */
const ExerciseChips = ({ 
  exercise, 
  showAll = true, 
  visibleChips = ['muscle', 'equipment', 'level', 'category', 'force', 'mechanic'] 
}) => {
  if (!exercise) {
    return null;
  }

  const chipConfig = [
    {
      key: 'muscle',
      component: <MuscleChip exercise={exercise} />,
    },
    {
      key: 'equipment',
      component: (
        <AttributeChip
          label={exercise.equipment}
          color={CHIP_COLORS.EQUIPMENT}
          tooltip="Equipment used"
        />
      ),
    },
    {
      key: 'level',
      component: (
        <AttributeChip
          label={exercise.level}
          color={CHIP_COLORS.LEVEL}
          tooltip="Difficulty level"
        />
      ),
    },
    {
      key: 'category',
      component: (
        <AttributeChip
          label={exercise.category}
          color={CHIP_COLORS.CATEGORY}
          tooltip="Exercise category"
        />
      ),
    },
    {
      key: 'force',
      component: (
        <AttributeChip
          label={exercise.force}
          color={CHIP_COLORS.FORCE}
          tooltip="Force type"
        />
      ),
    },
    {
      key: 'mechanic',
      component: (
        <AttributeChip
          label={exercise.mechanic}
          color={CHIP_COLORS.MECHANIC}
          tooltip="Movement mechanic"
        />
      ),
    },
  ];

  const displayChips = showAll 
    ? chipConfig 
    : chipConfig.filter(chip => visibleChips.includes(chip.key));

  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
      {displayChips.map(({ key, component }) => (
        <React.Fragment key={key}>
          {component}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default React.memo(ExerciseChips);
