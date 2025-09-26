import React from 'react';
import {
	Grid,
	Card,
	CardContent,
	CardMedia,
	Typography,
	Box,
	Chip,
	Button,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
	},
}));

function Exercise(props) {
	const { exercise, onOpenDetails } = props;

	return (
		<Grid size={{ xs: 12, sm: 6, md: 4 }} key={exercise.name}>
			<Card
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					transition: 'transform 0.2s, box-shadow 0.2s',
					'&:hover': {
						transform: 'translateY(-5px)',
						boxShadow: 6,
					},
				}}
			>
				<CardMedia
					component='img'
					height='200'
					loading='lazy'
					image={exercise?.images[0]}
					alt={exercise.name}
				/>
				<CardContent sx={{ flexGrow: 1 }}>
					<Typography gutterBottom variant='h5' component='h2'>
						{exercise.name}
					</Typography>
					<Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
						<HtmlTooltip
							title={
								<React.Fragment>
									<Typography color='inherit'>
										Muscle Groups involved
									</Typography>
									<b>{'Primary: '}</b>
									<em>{exercise.primaryMuscles.join(',')}</em>
									<br />
									<b>{'Secondary: '}</b>
									<em>{exercise.secondaryMuscles.join(',')}</em>
								</React.Fragment>
							}
						>
							<Chip
								label={exercise.primaryMuscles[0]}
								color='primary'
								size='small'
							/>
						</HtmlTooltip>
						<Tooltip title='Equipment used'>
							<Chip
								label={exercise.equipment || '-'}
								color='secondary'
								size='small'
							/>
						</Tooltip>
						<Tooltip title='Level'>
							<Chip label={exercise.level} color='default' size='small' />
						</Tooltip>

						<Tooltip title='Category'>
							<Chip label={exercise.category} color='error' size='small' />
						</Tooltip>
						<Tooltip title='Force'>
							<Chip label={exercise.force || '-'} color='info' size='small' />
						</Tooltip>
						<Tooltip title='Mechanic'>
							<Chip
								label={exercise.mechanic || '-'}
								color='success'
								size='small'
							/>
						</Tooltip>
					</Box>
					<Typography variant='body2' color='text.secondary'>
						{exercise.description?.substring(0, 120)}...
					</Typography>
				</CardContent>
				<Box sx={{ p: 2, pt: 0 }}>
					<Button
						variant='contained'
						fullWidth
						onClick={() => onOpenDetails(exercise)}
					>
						View Details
					</Button>
				</Box>
			</Card>
		</Grid>
	);
}

export default React.memo(Exercise);
