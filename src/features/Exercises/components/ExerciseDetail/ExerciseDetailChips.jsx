/**
 * Exercise Detail Chips Component
 * Displays exercise attributes as chips with detailed tooltips for the detail view
 */

import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { CHIP_COLORS } from '../../constants/ui.constants';
import {
  formatMuscleGroups,
  getChipLabel,
} from '../../utils/exerciseDetailUtils';

/**
 * Custom styled tooltip for detailed exercise information
 */
const DetailedTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 280,
    fontSize: theme.typography.pxToRem(13),
    padding: theme.spacing(1.5),
  },
}));

/**
 * Muscle Groups Chip with enhanced tooltip
 */
const MuscleGroupsChip = ({ exercise, chipColor = 'primary' }) => {
  if (!exercise?.primaryMuscles?.length && !exercise?.target) {
    return null;
  }

  // Get muscle groups using our utility function
  const muscleGroups = formatMuscleGroups(
    exercise.primaryMuscles || exercise.target || [],
    exercise.secondaryMuscles || []
  );

  const primaryMuscles = muscleGroups.primary;
  const secondaryMuscles = muscleGroups.secondary;

  if (primaryMuscles.length === 0) {
    return null;
  }

  const displayLabel =
    primaryMuscles.length === 1
      ? primaryMuscles[0]
      : `${primaryMuscles[0]} +${primaryMuscles.length - 1}`;

  const tooltipContent = (
    <React.Fragment>
      <Typography color='inherit' variant='subtitle2' sx={{ fontWeight: 600 }}>
        Muscle Groups Targeted
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant='body2' component='div'>
          <strong>Primary:</strong> {primaryMuscles.join(', ')}
        </Typography>
        {secondaryMuscles.length > 0 && (
          <Typography variant='body2' component='div' sx={{ mt: 0.5 }}>
            <strong>Secondary:</strong> {secondaryMuscles.join(', ')}
          </Typography>
        )}
      </Box>
      <Typography variant='caption' sx={{ mt: 1, opacity: 0.8 }}>
        Primary muscles are the main focus, secondary provide support
      </Typography>
    </React.Fragment>
  );

  return (
    <DetailedTooltip title={tooltipContent} arrow placement='top'>
      <Chip
        label={displayLabel}
        color={chipColor}
        size='small'
        sx={{
          textTransform: 'capitalize',
          fontWeight: 500,
        }}
      />
    </DetailedTooltip>
  );
};

/**
 * Generic exercise attribute chip with tooltip
 */
const AttributeChip = ({
  attribute,
  label,
  color,
  tooltip,
  size = 'small',
  description,
}) => {
  if (!label || label === '-' || label === 'None') {
    return null;
  }

  // Use getChipLabel with attribute and value, or fallback to label
  const displayLabel = attribute
    ? getChipLabel(attribute, label)
    : typeof label === 'string'
    ? label
    : String(label);

  const chipElement = (
    <Chip
      label={displayLabel}
      color={color}
      size={size}
      sx={{
        textTransform: 'capitalize',
        fontWeight: 500,
      }}
    />
  );

  if (!tooltip && !description) {
    return chipElement;
  }

  const tooltipContent = description ? (
    <React.Fragment>
      <Typography color='inherit' variant='subtitle2' sx={{ fontWeight: 600 }}>
        {tooltip}
      </Typography>
      <Typography variant='body2' sx={{ mt: 0.5 }}>
        {description}
      </Typography>
    </React.Fragment>
  ) : (
    tooltip
  );

  return (
    <Tooltip title={tooltipContent} arrow placement='top'>
      {chipElement}
    </Tooltip>
  );
};

/**
 * ExerciseDetailChips component
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise object
 * @param {boolean} props.showAll - Whether to show all available chips
 * @param {Array} props.visibleChips - Array of chip types to show
 * @returns {JSX.Element} ExerciseDetailChips component
 */
const ExerciseDetailChips = ({
  exercise,
  showAll = true,
  visibleChips = [
    'muscle',
    'equipment',
    'level',
    'category',
    'force',
    'mechanic',
  ],
}) => {
  if (!exercise) {
    return null;
  }

  // Safely access CHIP_COLORS with fallbacks
  const safeChipColors = {
    PRIMARY_MUSCLE: CHIP_COLORS?.PRIMARY_MUSCLE || 'primary',
    EQUIPMENT: CHIP_COLORS?.EQUIPMENT || 'default',
    LEVEL: CHIP_COLORS?.LEVEL || 'secondary',
    CATEGORY: CHIP_COLORS?.CATEGORY || 'info',
    FORCE: CHIP_COLORS?.FORCE || 'warning',
    MECHANIC: CHIP_COLORS?.MECHANIC || 'success',
  };

  const chipConfig = [
    {
      key: 'muscle',
      component: (
        <MuscleGroupsChip
          exercise={exercise}
          chipColor={safeChipColors.PRIMARY_MUSCLE}
        />
      ),
    },
    {
      key: 'equipment',
      component: (
        <AttributeChip
          attribute='equipment'
          label={exercise.equipment}
          color={safeChipColors.EQUIPMENT}
          tooltip='Equipment Required'
          description={
            exercise.equipment && exercise.equipment.toLowerCase() !== 'none'
              ? `This exercise requires ${exercise.equipment.toLowerCase()}`
              : 'No equipment needed - bodyweight exercise'
          }
        />
      ),
    },
    {
      key: 'level',
      component: (
        <AttributeChip
          attribute='difficulty'
          label={exercise.level || exercise.difficulty}
          color={safeChipColors.LEVEL}
          tooltip='Difficulty Level'
          description={`This exercise is suitable for ${(
            exercise.level || exercise.difficulty
          )?.toLowerCase()} level practitioners`}
        />
      ),
    },
    {
      key: 'category',
      component: (
        <AttributeChip
          attribute='category'
          label={exercise.category}
          color={safeChipColors.CATEGORY}
          tooltip='Exercise Category'
          description={`This is a ${exercise.category?.toLowerCase()} exercise`}
        />
      ),
    },
    {
      key: 'force',
      component: exercise.force ? (
        <AttributeChip
          attribute='force'
          label={exercise.force}
          color={safeChipColors.FORCE}
          tooltip='Force Type'
          description={`This exercise involves ${exercise.force?.toLowerCase()} movement pattern`}
        />
      ) : null,
    },
    {
      key: 'mechanic',
      component: exercise.mechanic ? (
        <AttributeChip
          attribute='mechanic'
          label={exercise.mechanic}
          color={safeChipColors.MECHANIC}
          tooltip='Movement Mechanic'
          description={`This exercise uses ${exercise.mechanic?.toLowerCase()} movement mechanics`}
        />
      ) : null,
    },
  ];

  const displayChips = showAll
    ? chipConfig
    : chipConfig.filter((chip) => visibleChips.includes(chip.key));

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        mb: 3,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {displayChips.map(({ key, component }) =>
        component ? (
          <React.Fragment key={key}>{component}</React.Fragment>
        ) : null
      )}
    </Box>
  );
};

export default React.memo(ExerciseDetailChips);
