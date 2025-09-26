// Member Management constants and mock data

export const MEMBER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  EXPIRED: 'expired',
};

export const MEMBERSHIP_TYPES = {
  BASIC: 'basic',
  PREMIUM: 'premium',
  VIP: 'vip',
  LIFETIME: 'lifetime',
};

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const EMERGENCY_RELATIONS = [
  'Spouse',
  'Parent',
  'Child',
  'Sibling',
  'Friend',
  'Other',
];

export const MOCK_MEMBERS = [
  {
    id: 'MEM001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1-555-0123',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1-555-0124',
      relation: 'Spouse',
    },
    healthInfo: {
      bloodGroup: 'O+',
      allergies: ['Nuts', 'Shellfish'],
      medicalConditions: [],
      medications: [],
    },
    membershipInfo: {
      type: MEMBERSHIP_TYPES.PREMIUM,
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      status: MEMBER_STATUS.ACTIVE,
    },
    trainerId: 'TR001',
    joinDate: '2024-01-15',
    profileImage: null,
    bodyMeasurements: [
      {
        date: '2024-01-15',
        weight: 75.5,
        height: 175,
        bodyFat: 15.2,
        muscleMass: 45.8,
        measurements: {
          chest: 102,
          waist: 82,
          hips: 95,
          biceps: 35,
          thighs: 58,
        },
      },
      {
        date: '2024-06-15',
        weight: 73.2,
        height: 175,
        bodyFat: 12.8,
        muscleMass: 47.1,
        measurements: {
          chest: 104,
          waist: 78,
          hips: 93,
          biceps: 37,
          thighs: 56,
        },
      },
    ],
    notes: 'Regular member, goals focused on weight loss and muscle building.',
  },
  {
    id: 'MEM002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@email.com',
    phone: '+1-555-0125',
    dateOfBirth: '1985-08-22',
    gender: 'Female',
    address: {
      street: '456 Oak Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
    },
    emergencyContact: {
      name: 'Mike Johnson',
      phone: '+1-555-0126',
      relation: 'Spouse',
    },
    healthInfo: {
      bloodGroup: 'A+',
      allergies: [],
      medicalConditions: ['Hypertension'],
      medications: ['Lisinopril'],
    },
    membershipInfo: {
      type: MEMBERSHIP_TYPES.VIP,
      startDate: '2023-12-01',
      endDate: '2024-11-30',
      status: MEMBER_STATUS.ACTIVE,
    },
    trainerId: 'TR002',
    joinDate: '2023-12-01',
    profileImage: null,
    bodyMeasurements: [
      {
        date: '2023-12-01',
        weight: 62.3,
        height: 168,
        bodyFat: 22.1,
        muscleMass: 32.4,
        measurements: {
          chest: 88,
          waist: 70,
          hips: 92,
          biceps: 28,
          thighs: 52,
        },
      },
    ],
    notes: 'Focused on fitness maintenance and strength training.',
  },
  {
    id: 'MEM003',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'mike.brown@email.com',
    phone: '+1-555-0127',
    dateOfBirth: '1992-03-10',
    gender: 'Male',
    address: {
      street: '789 Pine St',
      city: 'New York',
      state: 'NY',
      zipCode: '10003',
    },
    emergencyContact: {
      name: 'Lisa Brown',
      phone: '+1-555-0128',
      relation: 'Parent',
    },
    healthInfo: {
      bloodGroup: 'B+',
      allergies: ['Dairy'],
      medicalConditions: [],
      medications: [],
    },
    membershipInfo: {
      type: MEMBERSHIP_TYPES.BASIC,
      startDate: '2024-09-01',
      endDate: '2024-12-01',
      status: MEMBER_STATUS.ACTIVE,
    },
    trainerId: 'TR001',
    joinDate: '2024-09-01',
    profileImage: null,
    bodyMeasurements: [
      {
        date: '2024-09-01',
        weight: 80.1,
        height: 180,
        bodyFat: 18.5,
        muscleMass: 52.3,
        measurements: {
          chest: 108,
          waist: 85,
          hips: 98,
          biceps: 38,
          thighs: 62,
        },
      },
    ],
    notes: 'New member, beginner level fitness goals.',
  },
];

export const MEMBER_TABLE_COLUMNS = [
  { field: 'id', headerName: 'Member ID', width: 120 },
  { field: 'name', headerName: 'Full Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'membershipType', headerName: 'Membership', width: 130 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'joinDate', headerName: 'Join Date', width: 130 },
  { field: 'actions', headerName: 'Actions', width: 120 },
];

export const BODY_MEASUREMENT_FIELDS = [
  { key: 'weight', label: 'Weight (kg)', type: 'number' },
  { key: 'height', label: 'Height (cm)', type: 'number' },
  { key: 'bodyFat', label: 'Body Fat (%)', type: 'number' },
  { key: 'muscleMass', label: 'Muscle Mass (kg)', type: 'number' },
  { key: 'chest', label: 'Chest (cm)', type: 'number' },
  { key: 'waist', label: 'Waist (cm)', type: 'number' },
  { key: 'hips', label: 'Hips (cm)', type: 'number' },
  { key: 'biceps', label: 'Biceps (cm)', type: 'number' },
  { key: 'thighs', label: 'Thighs (cm)', type: 'number' },
];
