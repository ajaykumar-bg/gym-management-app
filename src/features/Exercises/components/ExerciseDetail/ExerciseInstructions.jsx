/**
 * Exercise Instructions Component
 * Displays step-by-step instructions for performing the exercise
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Chip,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircleOutline as CheckIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';
import {
  validateInstructions,
  formatInstruction,
} from '../../utils/exerciseDetailUtils';

/**
 * Individual instruction step component
 */
const InstructionStep = ({
  step,
  index,
  isCompleted = false,
  onToggleComplete,
  showCheckboxes = false,
}) => {
  const formattedInstruction = formatInstruction(step);

  return (
    <ListItem
      sx={{
        px: 0,
        py: 1,
        alignItems: 'flex-start',
        opacity: isCompleted ? 0.7 : 1,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      <ListItemIcon sx={{ minWidth: '40px', mt: 0.5 }}>
        {showCheckboxes ? (
          <IconButton
            size='small'
            onClick={() => onToggleComplete?.(index)}
            sx={{
              color: isCompleted ? 'success.main' : 'action.active',
              '&:hover': {
                backgroundColor: isCompleted ? 'success.light' : 'action.hover',
                opacity: 0.1,
              },
            }}
          >
            <CheckIcon fontSize='small' />
          </IconButton>
        ) : (
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {index + 1}
          </Box>
        )}
      </ListItemIcon>

      <ListItemText
        primary={
          <Typography
            variant='body1'
            sx={{
              lineHeight: 1.6,
              textDecoration: isCompleted ? 'line-through' : 'none',
            }}
          >
            {formattedInstruction}
          </Typography>
        }
      />
    </ListItem>
  );
};

/**
 * ExerciseInstructions component
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise object containing instructions
 * @param {boolean} props.showCheckboxes - Whether to show completion checkboxes
 * @param {boolean} props.collapsible - Whether instructions can be collapsed
 * @param {boolean} props.defaultExpanded - Default expanded state
 * @param {Function} props.onStepComplete - Handler for step completion
 * @returns {JSX.Element} ExerciseInstructions component
 */
const ExerciseInstructions = ({
  exercise,
  showCheckboxes = false,
  collapsible = false,
  defaultExpanded = true,
  onStepComplete,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  if (!exercise) {
    return null;
  }

  const instructions = validateInstructions(exercise.instructions);

  if (instructions.length === 0) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
          Instructions
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ fontStyle: 'italic' }}
        >
          No instructions available for this exercise.
        </Typography>
      </Box>
    );
  }

  const handleToggleComplete = (stepIndex) => {
    const newCompletedSteps = new Set(completedSteps);
    if (completedSteps.has(stepIndex)) {
      newCompletedSteps.delete(stepIndex);
    } else {
      newCompletedSteps.add(stepIndex);
    }
    setCompletedSteps(newCompletedSteps);
    onStepComplete?.(stepIndex, !completedSteps.has(stepIndex));
  };

  const completedCount = completedSteps.size;
  const totalSteps = instructions.length;
  const completionPercentage = Math.round((completedCount / totalSteps) * 100);

  const headerContent = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <Typography variant='h6' sx={{ fontWeight: 600, flexGrow: 1 }}>
        Instructions
      </Typography>

      {showCheckboxes && (
        <Chip
          label={`${completedCount}/${totalSteps} completed`}
          color={completedCount === totalSteps ? 'success' : 'default'}
          size='small'
          variant='outlined'
        />
      )}

      <Chip
        label={`${totalSteps} steps`}
        size='small'
        variant='outlined'
        icon={<PlayIcon />}
      />

      {collapsible && (
        <IconButton
          onClick={() => setExpanded(!expanded)}
          size='small'
          sx={{ ml: 1 }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      )}
    </Box>
  );

  const instructionsContent = (
    <List sx={{ py: 0 }}>
      {instructions.map((step, index) => (
        <InstructionStep
          key={index}
          step={step}
          index={index}
          isCompleted={completedSteps.has(index)}
          onToggleComplete={handleToggleComplete}
          showCheckboxes={showCheckboxes}
        />
      ))}
    </List>
  );

  return (
    <Box sx={{ py: 2 }}>
      <Divider sx={{ mb: 3 }} />

      {headerContent}

      {/* Progress bar for checkbox mode */}
      {showCheckboxes && completedCount > 0 && (
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              width: '100%',
              height: 4,
              backgroundColor: 'grey.200',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: `${completionPercentage}%`,
                height: '100%',
                backgroundColor:
                  completedCount === totalSteps
                    ? 'success.main'
                    : 'primary.main',
                transition: 'width 0.3s ease-in-out',
              }}
            />
          </Box>
          <Typography variant='caption' color='text.secondary' sx={{ mt: 0.5 }}>
            {completionPercentage}% complete
          </Typography>
        </Box>
      )}

      {collapsible ? (
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          {instructionsContent}
        </Collapse>
      ) : (
        instructionsContent
      )}
    </Box>
  );
};

export default React.memo(ExerciseInstructions);
