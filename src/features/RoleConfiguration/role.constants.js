export const permissionLabels = {
  canViewDashboard: 'View Dashboard',
  canManageMembers: 'Manage Members',
  canManageTrainers: 'Manage Trainers',
  canManageClasses: 'Manage Classes',
  canManageEquipment: 'Manage Equipment',
  canManageMemberships: 'Manage Memberships',
  canManagePayments: 'Manage Payments',
  canAccessRoleConfiguration: 'Access Role Configuration',
  canManageUsers: 'Manage Users',
  canViewAllReports: 'View All Reports',
  canViewAnalytics: 'View Analytics',
  canViewFinancials: 'View Financials',
};

export const adminOnlyPermissions = [
  'canManageTrainers',
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
      'Financial oversight',
      'System configuration',
      'All reports & analytics',
    ],
  },
  {
    name: 'trainer',
    title: 'Trainer Access',
    bgColor: 'warning.lighter',
    borderColor: 'warning.main',
    textColor: 'warning.dark',
    features: [
      'Member management',
      'Class scheduling',
      'Equipment tracking',
      'Training analytics',
      'Member progress reports',
    ],
  },
  {
    name: 'member',
    title: 'Member Access',
    bgColor: 'primary.lighter',
    borderColor: 'primary.main',
    textColor: 'primary.dark',
    features: [
      'Personal dashboard',
      'Class booking',
      'Workout tracking',
      'Personal profile',
      'Payment history',
    ],
  },
];
