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
const MuscleGroupsChip = ({ exercise }) => {
  if (!exercise?.primaryMuscles?.length) {
    return null;
  }

  const primaryMuscles = exercise.primaryMuscles || [];
  const secondaryMuscles = exercise.secondaryMuscles || [];
  const primaryMuscle = primaryMuscles[0];

  const tooltipContent = (
    <React.Fragment>
      <Typography color='inherit' variant='subtitle2' sx={{ fontWeight: 600 }}>
        Muscle Groups Targeted
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Typography variant='body2' component='div'>
          <strong>Primary:</strong> {formatMuscleGroups(primaryMuscles, 3)}
        </Typography>
        {secondaryMuscles.length > 0 && (
          <Typography variant='body2' component='div' sx={{ mt: 0.5 }}>
            <strong>Secondary:</strong>{' '}
            {formatMuscleGroups(secondaryMuscles, 3)}
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
        label={getChipLabel(primaryMuscle)}
        color={CHIP_COLORS.PRIMARY_MUSCLE}
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
  label,
  color,
  tooltip,
  size = 'small',
  description,
}) => {
  if (!label || label === '-') {
    return null;
  }

  const chipElement = (
    <Chip
      label={getChipLabel(label)}
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

  const chipConfig = [
    {
      key: 'muscle',
      component: <MuscleGroupsChip exercise={exercise} />,
    },
    {
      key: 'equipment',
      component: (
        <AttributeChip
          label={exercise.equipment}
          color={CHIP_COLORS.EQUIPMENT}
          tooltip='Equipment Required'
          description={
            exercise.equipment
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
          label={exercise.level}
          color={CHIP_COLORS.LEVEL}
          tooltip='Difficulty Level'
          description={`This exercise is suitable for ${exercise.level?.toLowerCase()} level practitioners`}
        />
      ),
    },
    {
      key: 'category',
      component: (
        <AttributeChip
          label={exercise.category}
          color={CHIP_COLORS.CATEGORY}
          tooltip='Exercise Category'
          description={`This is a ${exercise.category?.toLowerCase()} exercise`}
        />
      ),
    },
    {
      key: 'force',
      component: exercise.force ? (
        <AttributeChip
          label={exercise.force}
          color={CHIP_COLORS.FORCE}
          tooltip='Force Type'
          description={`This exercise involves ${exercise.force?.toLowerCase()} movement pattern`}
        />
      ) : null,
    },
    {
      key: 'mechanic',
      component: exercise.mechanic ? (
        <AttributeChip
          label={exercise.mechanic}
          color={CHIP_COLORS.MECHANIC}
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
