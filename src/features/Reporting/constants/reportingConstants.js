// Report types
export const REPORT_TYPES = {
  REGISTRATION: 'registration',
  ATTENDANCE: 'attendance',
  PAYMENT: 'payment',
  MEMBERSHIP: 'membership',
  REVENUE: 'revenue',
  TRAINER_PERFORMANCE: 'trainer_performance',
};

// Time period filters
export const TIME_PERIODS = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  THIS_WEEK: 'this_week',
  LAST_WEEK: 'last_week',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_QUARTER: 'this_quarter',
  LAST_QUARTER: 'last_quarter',
  THIS_YEAR: 'this_year',
  LAST_YEAR: 'last_year',
  CUSTOM: 'custom',
};

// Export formats
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  CSV: 'csv',
  EXCEL: 'excel',
  JSON: 'json',
};

// Chart types
export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  AREA: 'area',
  PIE: 'pie',
  DONUT: 'donut',
};

// Report status
export const REPORT_STATUS = {
  GENERATING: 'generating',
  COMPLETED: 'completed',
  FAILED: 'failed',
  SCHEDULED: 'scheduled',
};

// Color palette for charts
export const CHART_COLORS = {
  PRIMARY: '#1976d2',
  SECONDARY: '#dc004e',
  SUCCESS: '#2e7d32',
  WARNING: '#ed6c02',
  INFO: '#0288d1',
  ERROR: '#d32f2f',
  NEUTRAL: '#757575',
  LIGHT_BLUE: '#03a9f4',
  PURPLE: '#9c27b0',
  ORANGE: '#ff9800',
  TEAL: '#009688',
  PINK: '#e91e63',
};

// Mock registration data
export const MOCK_REGISTRATION_DATA = [
  {
    id: 1,
    memberName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1234567890',
    registrationDate: '2024-10-01',
    membershipType: 'Premium',
    status: 'active',
    referralSource: 'Social Media',
    age: 28,
    gender: 'Male',
  },
  {
    id: 2,
    memberName: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1234567891',
    registrationDate: '2024-10-05',
    membershipType: 'Basic',
    status: 'active',
    referralSource: 'Friend Referral',
    age: 32,
    gender: 'Female',
  },
  {
    id: 3,
    memberName: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1234567892',
    registrationDate: '2024-10-10',
    membershipType: 'VIP',
    status: 'active',
    referralSource: 'Google Ads',
    age: 35,
    gender: 'Male',
  },
  {
    id: 4,
    memberName: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1234567893',
    registrationDate: '2024-10-15',
    membershipType: 'Premium',
    status: 'pending',
    referralSource: 'Walk-in',
    age: 26,
    gender: 'Female',
  },
  {
    id: 5,
    memberName: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1234567894',
    registrationDate: '2024-10-20',
    membershipType: 'Basic',
    status: 'active',
    referralSource: 'Website',
    age: 41,
    gender: 'Male',
  },
];

// Mock attendance data
export const MOCK_ATTENDANCE_DATA = [
  {
    id: 1,
    memberId: 1,
    memberName: 'John Doe',
    date: '2024-10-23',
    checkInTime: '06:30',
    checkOutTime: '08:00',
    duration: 90,
    sessionType: 'Cardio',
  },
  {
    id: 2,
    memberId: 2,
    memberName: 'Jane Smith',
    date: '2024-10-23',
    checkInTime: '07:00',
    checkOutTime: '08:30',
    duration: 90,
    sessionType: 'Yoga',
  },
  {
    id: 3,
    memberId: 3,
    memberName: 'Mike Johnson',
    date: '2024-10-22',
    checkInTime: '18:00',
    checkOutTime: '19:30',
    duration: 90,
    sessionType: 'Weight Training',
  },
  {
    id: 4,
    memberId: 1,
    memberName: 'John Doe',
    date: '2024-10-22',
    checkInTime: '06:45',
    checkOutTime: '08:15',
    duration: 90,
    sessionType: 'Cardio',
  },
  {
    id: 5,
    memberId: 4,
    memberName: 'Sarah Wilson',
    date: '2024-10-21',
    checkInTime: '17:00',
    checkOutTime: '18:30',
    duration: 90,
    sessionType: 'Cross Training',
  },
];

// Mock payment data
export const MOCK_PAYMENT_DATA = [
  {
    id: 1,
    memberId: 1,
    memberName: 'John Doe',
    membershipType: 'Premium',
    amount: 99.99,
    paymentDate: '2024-10-01',
    paymentMethod: 'Credit Card',
    status: 'completed',
    invoiceNumber: 'INV-001',
    dueDate: '2024-11-01',
    transactionId: 'TXN-001',
  },
  {
    id: 2,
    memberId: 2,
    memberName: 'Jane Smith',
    membershipType: 'Basic',
    amount: 49.99,
    paymentDate: '2024-10-05',
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    invoiceNumber: 'INV-002',
    dueDate: '2024-11-05',
    transactionId: 'TXN-002',
  },
  {
    id: 3,
    memberId: 3,
    memberName: 'Mike Johnson',
    membershipType: 'VIP',
    amount: 149.99,
    paymentDate: '2024-10-10',
    paymentMethod: 'Credit Card',
    status: 'completed',
    invoiceNumber: 'INV-003',
    dueDate: '2024-11-10',
    transactionId: 'TXN-003',
  },
  {
    id: 4,
    memberId: 4,
    memberName: 'Sarah Wilson',
    membershipType: 'Premium',
    amount: 99.99,
    paymentDate: null,
    paymentMethod: null,
    status: 'pending',
    invoiceNumber: 'INV-004',
    dueDate: '2024-10-30',
    transactionId: null,
  },
  {
    id: 5,
    memberId: 5,
    memberName: 'David Brown',
    membershipType: 'Basic',
    amount: 49.99,
    paymentDate: '2024-10-20',
    paymentMethod: 'Cash',
    status: 'completed',
    invoiceNumber: 'INV-005',
    dueDate: '2024-11-20',
    transactionId: 'TXN-005',
  },
];

// Mock trainer performance data
export const MOCK_TRAINER_DATA = [
  {
    id: 1,
    trainerName: 'Alex Rodriguez',
    specialization: 'Personal Training',
    clientsCount: 15,
    sessionsThisMonth: 45,
    revenue: 2250,
    rating: 4.8,
    experience: '5 years',
  },
  {
    id: 2,
    trainerName: 'Lisa Chen',
    specialization: 'Yoga',
    clientsCount: 25,
    sessionsThisMonth: 60,
    revenue: 1800,
    rating: 4.9,
    experience: '7 years',
  },
  {
    id: 3,
    trainerName: 'Marcus Thompson',
    specialization: 'Weight Training',
    clientsCount: 20,
    sessionsThisMonth: 55,
    revenue: 2750,
    rating: 4.7,
    experience: '8 years',
  },
];

// Report templates configuration
export const REPORT_TEMPLATES = {
  [REPORT_TYPES.REGISTRATION]: {
    title: 'Registration Report',
    description: 'Member registration trends and demographics',
    icon: 'PersonAdd',
    defaultChartType: CHART_TYPES.LINE,
    fields: [
      'memberName',
      'registrationDate',
      'membershipType',
      'status',
      'referralSource',
      'age',
      'gender',
    ],
    filters: [
      'dateRange',
      'membershipType',
      'status',
      'referralSource',
      'gender',
    ],
    charts: [
      {
        type: CHART_TYPES.LINE,
        title: 'Registration Trend',
        dataKey: 'registrationDate',
      },
      {
        type: CHART_TYPES.PIE,
        title: 'Membership Type Distribution',
        dataKey: 'membershipType',
      },
      {
        type: CHART_TYPES.BAR,
        title: 'Referral Sources',
        dataKey: 'referralSource',
      },
    ],
  },
  [REPORT_TYPES.ATTENDANCE]: {
    title: 'Attendance Report',
    description: 'Member attendance patterns and session analysis',
    icon: 'AccessTime',
    defaultChartType: CHART_TYPES.BAR,
    fields: [
      'memberName',
      'date',
      'checkInTime',
      'checkOutTime',
      'duration',
      'sessionType',
    ],
    filters: ['dateRange', 'sessionType', 'member'],
    charts: [
      { type: CHART_TYPES.LINE, title: 'Daily Attendance', dataKey: 'date' },
      { type: CHART_TYPES.BAR, title: 'Session Types', dataKey: 'sessionType' },
      { type: CHART_TYPES.AREA, title: 'Peak Hours', dataKey: 'checkInTime' },
    ],
  },
  [REPORT_TYPES.PAYMENT]: {
    title: 'Payment Report',
    description: 'Payment status, revenue analysis, and outstanding dues',
    icon: 'Payment',
    defaultChartType: CHART_TYPES.BAR,
    fields: [
      'memberName',
      'amount',
      'paymentDate',
      'paymentMethod',
      'status',
      'invoiceNumber',
      'dueDate',
    ],
    filters: ['dateRange', 'paymentMethod', 'status', 'membershipType'],
    charts: [
      {
        type: CHART_TYPES.LINE,
        title: 'Revenue Trend',
        dataKey: 'paymentDate',
      },
      {
        type: CHART_TYPES.PIE,
        title: 'Payment Methods',
        dataKey: 'paymentMethod',
      },
      { type: CHART_TYPES.DONUT, title: 'Payment Status', dataKey: 'status' },
    ],
  },
  [REPORT_TYPES.TRAINER_PERFORMANCE]: {
    title: 'Trainer Performance Report',
    description: 'Trainer performance metrics and client management',
    icon: 'FitnessCenter',
    defaultChartType: CHART_TYPES.BAR,
    fields: [
      'trainerName',
      'specialization',
      'clientsCount',
      'sessionsThisMonth',
      'revenue',
      'rating',
    ],
    filters: ['specialization', 'rating'],
    charts: [
      {
        type: CHART_TYPES.BAR,
        title: 'Sessions per Trainer',
        dataKey: 'sessionsThisMonth',
      },
      {
        type: CHART_TYPES.BAR,
        title: 'Revenue per Trainer',
        dataKey: 'revenue',
      },
      {
        type: CHART_TYPES.PIE,
        title: 'Specialization Distribution',
        dataKey: 'specialization',
      },
    ],
  },
};

// Default pagination settings
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
};

// Date format options
export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  ISO: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
};
