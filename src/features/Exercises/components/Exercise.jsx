/**
 * Exercise Card Component
 * Displays an individual exercise in a card format with image, details, and actions
 * 
 * This component has been refactored to use smaller, reusable components:
 * - ExerciseImage: Handles image display with loading and error states
 * - ExerciseContent: Displays exercise name, chips, and description
 * - ExerciseActions: Handles action buttons and interactions
 */

import React from 'react';
import { Grid, Card } from '@mui/material';
import { CARD_CONFIG } from '../constants/ui.constants';
import { sanitizeExercise } from '../utils/exerciseUtils';
import ExerciseImage from './Exercise/ExerciseImage';
import ExerciseContent from './Exercise/ExerciseContent';
import ExerciseActions from './Exercise/ExerciseActions';

/**
 * Exercise Card Component
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise object with all exercise data
 * @param {Function} props.onOpenDetails - Handler for opening exercise details
 * @param {Function} props.onToggleFavorite - Handler for toggling favorite status (optional)
 * @param {Function} props.onShare - Handler for sharing exercise (optional)
 * @param {boolean} props.isFavorite - Whether this exercise is marked as favorite (optional)
 * @param {boolean} props.showFavorite - Whether to show favorite button (optional, default: false)
 * @param {boolean} props.showShare - Whether to show share button (optional, default: false)
 * @param {Object} props.gridProps - Additional Grid component props (optional)
 * @param {Object} props.cardProps - Additional Card component props (optional)
 * @returns {JSX.Element} Exercise card component
 */
function Exercise(props) {
	const { 
		exercise: rawExercise, 
		onOpenDetails,
		onToggleFavorite,
		onShare,
		isFavorite = false,
		showFavorite = false,
		showShare = false,
		gridProps = {},
		cardProps = {},
	} = props;

	// Sanitize exercise data to ensure consistent format
	const exercise = sanitizeExercise(rawExercise);

	if (!exercise) {
		return null;
	}

	const defaultGridProps = {
		size: { xs: 12, sm: 6, md: 4 },
		key: exercise.name || exercise.id,
	};

	const defaultCardProps = {
		sx: {
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			transition: `transform ${CARD_CONFIG.TRANSITION_DURATION}, box-shadow ${CARD_CONFIG.TRANSITION_DURATION}`,
			cursor: 'pointer',
			'&:hover': {
				transform: CARD_CONFIG.HOVER_TRANSFORM,
				boxShadow: CARD_CONFIG.HOVER_BOX_SHADOW,
			},
		},
		onClick: () => onOpenDetails && onOpenDetails(exercise),
	};

	return (
		<Grid {...defaultGridProps} {...gridProps}>
			<Card {...defaultCardProps} {...cardProps}>
				{/* Exercise Image */}
				<ExerciseImage 
					exercise={exercise}
					alt={exercise.name}
				/>

				{/* Exercise Content (Name, Chips, Description) */}
				<ExerciseContent exercise={exercise} />

				{/* Exercise Actions (Buttons) */}
				<ExerciseActions
					exercise={exercise}
					onViewDetails={onOpenDetails}
					onToggleFavorite={onToggleFavorite}
					onShare={onShare}
					isFavorite={isFavorite}
					showFavorite={showFavorite}
					showShare={showShare}
				/>
			</Card>
		</Grid>
	);
}

export default React.memo(Exercise);
