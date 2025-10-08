export const permissionLabels = {
  canViewDashboard: 'View Dashboard',
  canViewMembers: 'View Members',
  canManageMembers: 'Manage Members',
  canViewTrainers: 'View Trainers',
  canManageTrainers: 'Manage Trainers',
  canViewEquipment: 'View Equipment',
  canManageEquipment: 'Manage Equipment',
  canViewPackages: 'View Membership Packages',
  canManagePackages: 'Manage Membership Packages',
  canManageClasses: 'Manage Classes',
  canManageMemberships: 'Manage Memberships',
  canManagePayments: 'Manage Payments',
  canAccessRoleConfiguration: 'Access Role Configuration',
  canManageUsers: 'Manage Users',
  canViewAllReports: 'View All Reports',
  canViewAnalytics: 'View Analytics',
  canViewFinancials: 'View Financials',
  canViewWorkouts: 'View Workouts',
  canManageWorkouts: 'Manage Workouts',
  canViewExercises: 'View Exercises',
  canCreateWorkoutTemplates: 'Create Workout Templates',
};

export const adminOnlyPermissions = [
  'canManageTrainers',
  'canManagePackages',
  'canManageMemberships',
  'canManagePayments',
  'canAccessRoleConfiguration',
  'canManageUsers',
  'canViewAllReports',
  'canViewFinancials',
];

export const roleDescriptions = [
  {
    name: 'Admin',
    description:
      'Full gym management access including financials and user management',
  },
  {
    name: 'Trainer',
    description:
      'Manage members, classes, and equipment with access to training analytics',
  },
  {
    name: 'Member',
    description:
      'View personal profile, book classes, and track workout progress',
  },
];

export const roleAccessDetails = [
  {
    name: 'admin',
    title: 'Admin Access',
    bgColor: 'error.lighter',
    borderColor: 'error.main',
    textColor: 'error.dark',
    features: [
      'Full gym management',
      'Member & trainer management',
      'Membership packages & billing',
      'Financial oversight & billing',
      'System & role configuration',
      'Complete reports & analytics',
      'Equipment & facility management',
      'Workout template management',
    ],
  },
  {
    name: 'trainer',
    title: 'Trainer Access',
    bgColor: 'warning.lighter',
    borderColor: 'warning.main',
    textColor: 'warning.dark',
    features: [
      'Assigned member management',
      'View all trainer profiles',
      'View membership packages',
      'Class & session scheduling',
      'Equipment status tracking',
      'Training analytics & progress',
      'Member fitness assessments',
      'Create member workout plans',
      'Workout template creation',
    ],
  },
  {
    name: 'member',
    title: 'Member Access',
    bgColor: 'primary.lighter',
    borderColor: 'primary.main',
    textColor: 'primary.dark',
    features: [
      'Personal dashboard & profile',
      'View trainer profiles',
      'Class booking & scheduling',
      'Personal workout tracking',
      'Membership & payment history',
      'Equipment availability check',
      'Create personal workouts',
      'Track workout progress',
    ],
  },
];
