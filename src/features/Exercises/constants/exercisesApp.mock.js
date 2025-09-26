// Mock data for exercises
export const exercisesData = [
	{
		id: 1,
		name: 'Barbell Bench Press',
		muscle: 'Chest',
		equipment: 'Barbell',
		difficulty: 'Intermediate',
		description:
			'Lie on a flat bench, grip the barbell with hands slightly wider than shoulder-width. Lower the bar to your chest, then press it back up to full arm extension.',
		instructions: [
			'Lie flat on your back on a bench',
			'Grip the bar with hands just wider than shoulder-width',
			'Lift the bar off the rack and hold it straight over you',
			'Lower the bar slowly until it touches your chest',
			'Push the bar back to the starting position',
		],
		images: [
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
		],
	},
	{
		id: 2,
		name: 'Pull-up',
		muscle: 'Back',
		equipment: 'Body Weight',
		difficulty: 'Advanced',
		description:
			'Hang from a pull-up bar with palms facing away from you, pull your body up until your chin is above the bar, then lower back down.',
		instructions: [
			'Grab the pull-up bar with a grip slightly wider than shoulders, palms facing away',
			'Hang with arms fully extended',
			'Pull yourself up until your chin passes the bar',
			'Lower yourself with control until arms are fully extended',
			'Repeat for desired reps',
		],
		images: [
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
		],
	},
	{
		id: 3,
		name: 'Squat',
		muscle: 'Legs',
		equipment: 'Barbell',
		difficulty: 'Intermediate',
		description:
			'Place a barbell on your upper back, squat down until thighs are parallel to the floor, then return to standing position.',
		instructions: [
			'Place the barbell on your upper back, not on your neck',
			'Stand with feet shoulder-width apart, toes slightly pointed out',
			'Keep your back straight and core engaged',
			'Bend at the knees and hips to lower your body',
			'Lower until thighs are parallel to the ground',
			'Push through your heels to return to starting position',
		],
		images: [
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
		],
	},
	{
		id: 4,
		name: 'Dumbbell Shoulder Press',
		muscle: 'Shoulders',
		equipment: 'Dumbbell',
		difficulty: 'Beginner',
		description:
			'Sit or stand with dumbbells at shoulder height, press them upward until arms are extended, then lower back down.',
		instructions: [
			'Sit on a bench with back support or stand with feet shoulder-width apart',
			'Hold dumbbells at shoulder height, palms facing forward',
			'Press the weights upward until arms are fully extended',
			'Pause briefly at the top',
			'Lower the weights back to shoulder level with control',
		],
		images: [
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
		],
	},
	{
		id: 5,
		name: 'Bicep Curl',
		muscle: 'Arms',
		equipment: 'Dumbbell',
		difficulty: 'Beginner',
		description:
			'Hold dumbbells with arms extended and palms facing forward, curl the weights up to shoulder level, then lower back down.',
		instructions: [
			'Stand with feet shoulder-width apart, holding dumbbells at your sides',
			'Keep your elbows close to your torso',
			'Curl the weights up toward your shoulders',
			'Hold the contracted position briefly',
			'Lower the weights back to starting position with control',
		],
		images: [
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
		],
	},
	{
		id: 6,
		name: 'Plank',
		muscle: 'Core',
		equipment: 'Body Weight',
		difficulty: 'Beginner',
		description:
			'Support your body on your forearms and toes while keeping your body in a straight line from head to heels.',
		instructions: [
			'Start in a push-up position, then bend your elbows to rest on your forearms',
			'Your elbows should be directly beneath your shoulders',
			'Keep your body in a straight line from head to heels',
			"Engage your core and don't let your hips sag or lift",
			'Hold the position for the desired time',
		],
		images: [
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
			'/api/placeholder/500/300',
		],
	},
];

// Filter options
export const muscleTypes = [
	{
		label: 'All',
		value: 'All',
	},
	{
		label: 'Abdominals',
		value: 'abdominals',
	},
	{
		label: 'Abductors',
		value: 'abductors',
	},
	{
		label: 'Adductors',
		value: 'adductors',
	},
	{
		label: 'Biceps',
		value: 'biceps',
	},
	{
		label: 'Calves',
		value: 'calves',
	},
	{
		label: 'Chest',
		value: 'chest',
	},
	{
		label: 'Forearms',
		value: 'forearms',
	},
	{
		label: 'Glutes',
		value: 'glutes',
	},
	{
		label: 'Hamstrings',
		value: 'hamstrings',
	},
	{
		label: 'Lats',
		value: 'lats',
	},
	{
		label: 'Lower back',
		value: 'lower back',
	},
	{
		label: 'Middle back',
		value: 'middle back',
	},
	{
		label: 'Neck',
		value: 'neck',
	},
	{
		label: 'Quadriceps',
		value: 'quadriceps',
	},
	{
		label: 'Shoulders',
		value: 'shoulders',
	},
	{
		label: 'Traps',
		value: 'traps',
	},
	{
		label: 'Triceps',
		value: 'triceps',
	},
];

export const categoryTypes = [
	{
		label: 'All',
		value: 'All',
	},
	{
		label: 'Strength',
		value: 'strength',
	},
	{
		label: 'Stretching',
		value: 'stretching',
	},
	{
		label: 'Plyometrics',
		value: 'plyometrics',
	},
	{
		label: 'Strongman',
		value: 'strongman',
	},
	{
		label: 'Powerlifting',
		value: 'powerlifting',
	},
	{
		label: 'Cardio',
		value: 'cardio',
	},
	{
		label: 'Olympic Weightlifting',
		value: 'olympic weightlifting',
	},
];

export const equipmentTypes = [
	{
		label: 'All',
		value: 'All',
	},
	{
		label: 'Machine',
		value: 'machine',
	},
	{
		label: 'Barbell',
		value: 'barbell',
	},
	{
		label: 'Dumbbell',
		value: 'dumbbell',
	},
	{
		label: 'Cable',
		value: 'cable',
	},
	{
		label: 'e-z Curl bar',
		value: 'e-z curl bar',
	},
	{
		label: 'Kettlebells',
		value: 'kettlebells',
	},
	{
		label: 'Bands',
		value: 'bands',
	},
	{
		label: 'Medicine ball',
		value: 'medicine ball',
	},
	{
		label: 'Exercise ball',
		value: 'exercise ball',
	},
	{
		label: 'Body Weight',
		value: 'body only',
	},
	{
		label: 'Foam roll',
		value: 'foam roll',
	},
	{
		label: 'Other',
		value: 'other',
	},
];

export const forceTypes = [
	{
		label: 'All',
		value: 'All',
	},
	{
		label: 'Push',
		value: 'push',
	},
	{
		label: 'Pull',
		value: 'pull',
	},

	{
		label: 'Static',
		value: 'static',
	},
];

export const difficultyLevels = [
	{
		label: 'All',
		value: 'All',
	},
	{
		label: 'Beginner',
		value: 'beginner',
	},
	{
		label: 'Intermediate',
		value: 'intermediate',
	},
	{
		label: 'Expert',
		value: 'expert',
	},
];
