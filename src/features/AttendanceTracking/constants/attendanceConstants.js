// Attendance status constants
export const ATTENDANCE_STATUS = {
  CHECKED_IN: 'checked_in',
  CHECKED_OUT: 'checked_out',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

// Time periods for filtering
export const TIME_PERIODS = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  THIS_WEEK: 'this_week',
  LAST_WEEK: 'last_week',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  CUSTOM: 'custom',
};

// Session duration thresholds (in minutes)
export const SESSION_DURATION = {
  SHORT: 30,
  NORMAL: 60,
  LONG: 120,
  EXTENDED: 180,
};

// Default pagination settings
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

// Chart colors for attendance analytics
export const CHART_COLORS = {
  PRIMARY: '#1976d2',
  SECONDARY: '#dc004e',
  SUCCESS: '#2e7d32',
  WARNING: '#ed6c02',
  INFO: '#0288d1',
  NEUTRAL: '#757575',
};

// Mock member data for development
export const MOCK_MEMBERS = [
  {
    id: 1,
    name: 'John Doe',
    membershipId: 'MEM001',
    membershipType: 'Premium',
    phone: '+1234567890',
    email: 'john.doe@email.com',
    joinDate: '2024-01-15',
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    membershipId: 'MEM002',
    membershipType: 'Basic',
    phone: '+1234567891',
    email: 'jane.smith@email.com',
    joinDate: '2024-02-10',
    status: 'active',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    membershipId: 'MEM003',
    membershipType: 'Premium',
    phone: '+1234567892',
    email: 'mike.johnson@email.com',
    joinDate: '2024-01-20',
    status: 'active',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    membershipId: 'MEM004',
    membershipType: 'VIP',
    phone: '+1234567893',
    email: 'sarah.wilson@email.com',
    joinDate: '2024-03-05',
    status: 'active',
  },
  {
    id: 5,
    name: 'David Brown',
    membershipId: 'MEM005',
    membershipType: 'Basic',
    phone: '+1234567894',
    email: 'david.brown@email.com',
    joinDate: '2024-02-28',
    status: 'active',
  },
];

// Sample attendance records for development
export const MOCK_ATTENDANCE_RECORDS = [
  {
    id: 1,
    memberId: 1,
    memberName: 'John Doe',
    membershipId: 'MEM001',
    checkInTime: '2024-10-23T06:30:00Z',
    checkOutTime: '2024-10-23T08:00:00Z',
    duration: 90, // minutes
    status: ATTENDANCE_STATUS.COMPLETED,
    date: '2024-10-23',
    notes: 'Morning workout session',
  },
  {
    id: 2,
    memberId: 2,
    memberName: 'Jane Smith',
    membershipId: 'MEM002',
    checkInTime: '2024-10-23T07:00:00Z',
    checkOutTime: null,
    duration: null,
    status: ATTENDANCE_STATUS.CHECKED_IN,
    date: '2024-10-23',
    notes: '',
  },
  {
    id: 3,
    memberId: 3,
    memberName: 'Mike Johnson',
    membershipId: 'MEM003',
    checkInTime: '2024-10-22T18:30:00Z',
    checkOutTime: '2024-10-22T20:15:00Z',
    duration: 105,
    status: ATTENDANCE_STATUS.COMPLETED,
    date: '2024-10-22',
    notes: 'Evening strength training',
  },
  {
    id: 4,
    memberId: 1,
    memberName: 'John Doe',
    membershipId: 'MEM001',
    checkInTime: '2024-10-22T06:45:00Z',
    checkOutTime: '2024-10-22T08:30:00Z',
    duration: 105,
    status: ATTENDANCE_STATUS.COMPLETED,
    date: '2024-10-22',
    notes: 'Cardio and weight training',
  },
  {
    id: 5,
    memberId: 4,
    memberName: 'Sarah Wilson',
    membershipId: 'MEM004',
    checkInTime: '2024-10-21T17:00:00Z',
    checkOutTime: '2024-10-21T18:45:00Z',
    duration: 105,
    status: ATTENDANCE_STATUS.COMPLETED,
    date: '2024-10-21',
    notes: 'Yoga and meditation',
  },
];
