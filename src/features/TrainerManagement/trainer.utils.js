// Trainer Management Utilities

import { TRAINER_SPECIALIZATIONS } from './trainer.constants';

/**
 * Calculate trainer's age from date of birth
 */
export const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

/**
 * Calculate years of experience at the gym
 */
export const calculateYearsAtGym = (hireDate) => {
  if (!hireDate) return 0;
  const today = new Date();
  const hire = new Date(hireDate);
  const years = (today - hire) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(years * 10) / 10; // Round to 1 decimal place
};

/**
 * Get trainer's specializations as readable string
 */
export const getSpecializationsText = (specializations) => {
  if (!specializations || specializations.length === 0)
    return 'No specializations listed';
  return specializations
    .map((spec) => TRAINER_SPECIALIZATIONS[spec] || spec)
    .join(', ');
};

/**
 * Check if trainer has valid certifications
 */
export const hasValidCertifications = (certifications) => {
  if (!certifications || certifications.length === 0) return false;
  return certifications.some((cert) => cert.status === 'valid');
};

/**
 * Get certification status color
 */
export const getCertificationStatusColor = (status) => {
  switch (status) {
    case 'valid':
      return 'success';
    case 'expired':
      return 'error';
    case 'pending':
      return 'warning';
    case 'na':
    default:
      return 'default';
  }
};

/**
 * Get trainer status color
 */
export const getTrainerStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'default';
    case 'onLeave':
      return 'warning';
    case 'suspended':
      return 'error';
    default:
      return 'default';
  }
};

/**
 * Calculate trainer's capacity utilization
 */
export const calculateCapacityUtilization = (currentClients, maxClients) => {
  if (!maxClients || maxClients === 0) return 0;
  return Math.round((currentClients / maxClients) * 100);
};

/**
 * Get capacity utilization color
 */
export const getCapacityColor = (utilization) => {
  if (utilization >= 90) return 'error';
  if (utilization >= 75) return 'warning';
  if (utilization >= 50) return 'info';
  return 'success';
};

/**
 * Format work schedule for display
 */
export const formatWorkSchedule = (schedule) => {
  if (!schedule) return 'No schedule available';

  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return days
    .map((day, index) => {
      const daySchedule = schedule[day];
      if (!daySchedule || daySchedule[0] === 'rest') {
        return `${dayNames[index]}: Rest`;
      }
      return `${dayNames[index]}: ${daySchedule.join(', ')}`;
    })
    .join('\n');
};

/**
 * Get trainer's current availability
 */
export const getCurrentAvailability = (schedule) => {
  if (!schedule) return 'Not available';

  const now = new Date();
  const currentDay = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ][now.getDay()];
  const todaySchedule = schedule[currentDay];

  if (!todaySchedule || todaySchedule[0] === 'rest') {
    return 'Not working today';
  }

  const currentTime = now.getHours() * 100 + now.getMinutes(); // HHMM format

  for (const timeSlot of todaySchedule) {
    const [start, end] = timeSlot.split('-');
    const startTime = parseInt(start.replace(':', ''));
    const endTime = parseInt(end.replace(':', ''));

    if (currentTime >= startTime && currentTime <= endTime) {
      return 'Available now';
    }
  }

  return 'Not currently available';
};

/**
 * Filter trainers based on search criteria
 */
export const filterTrainers = (trainers, filters) => {
  return trainers.filter((trainer) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        trainer.name.toLowerCase().includes(searchLower) ||
        trainer.email.toLowerCase().includes(searchLower) ||
        trainer.specializations.some((spec) =>
          TRAINER_SPECIALIZATIONS[spec]?.toLowerCase().includes(searchLower)
        );
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      if (trainer.status !== filters.status) return false;
    }

    // Specialization filter
    if (filters.specialization && filters.specialization !== 'all') {
      if (!trainer.specializations.includes(filters.specialization))
        return false;
    }

    // Experience level filter
    if (filters.experience && filters.experience !== 'all') {
      if (trainer.experience !== filters.experience) return false;
    }

    // Availability filter
    if (filters.availability && filters.availability !== 'all') {
      if (!trainer.availability.includes(filters.availability)) return false;
    }

    return true;
  });
};

/**
 * Sort trainers by different criteria
 */
export const sortTrainers = (trainers, sortBy, sortOrder = 'asc') => {
  const sorted = [...trainers].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'experience':
        aValue = a.yearsAtGym;
        bValue = b.yearsAtGym;
        break;
      case 'rating':
        aValue = a.averageRating;
        bValue = b.averageRating;
        break;
      case 'clients':
        aValue = a.currentClients;
        bValue = b.currentClients;
        break;
      case 'hireDate':
        aValue = new Date(a.hireDate);
        bValue = new Date(b.hireDate);
        break;
      case 'capacity':
        aValue = calculateCapacityUtilization(a.currentClients, a.maxClients);
        bValue = calculateCapacityUtilization(b.currentClients, b.maxClients);
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Generate trainer performance summary
 */
export const generatePerformanceSummary = (trainer) => {
  const capacityUtilization = calculateCapacityUtilization(
    trainer.currentClients,
    trainer.maxClients
  );
  const yearsAtGym = calculateYearsAtGym(trainer.hireDate);

  return {
    overallScore: Math.round(
      (trainer.averageRating * 20 +
        capacityUtilization * 0.5 +
        trainer.clientRetentionRate * 0.3) /
        3
    ),
    strengths: [
      trainer.averageRating >= 4.5 && 'High client satisfaction',
      capacityUtilization >= 80 && 'High demand',
      trainer.clientRetentionRate >= 90 && 'Excellent client retention',
      yearsAtGym >= 3 && 'Experienced team member',
    ].filter(Boolean),
    areasForImprovement: [
      trainer.averageRating < 4.0 && 'Client satisfaction below target',
      capacityUtilization < 50 && 'Low client utilization',
      trainer.clientRetentionRate < 80 && 'Client retention needs improvement',
      !hasValidCertifications(trainer.certifications) &&
        'Certification updates needed',
    ].filter(Boolean),
  };
};

/**
 * Validate trainer data
 */
export const validateTrainerData = (trainerData) => {
  if (!trainerData) return false;

  const requiredFields = ['name', 'email', 'phone'];
  const hasRequiredFields = requiredFields.every(
    (field) => trainerData[field] && trainerData[field].toString().trim()
  );

  const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trainerData.email);
  const hasSpecializations =
    trainerData.specializations && trainerData.specializations.length > 0;

  return hasRequiredFields && hasValidEmail && hasSpecializations;
};

/**
 * Get detailed validation errors
 */
export const getValidationErrors = (trainerData) => {
  const errors = {};

  if (!trainerData.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!trainerData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trainerData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!trainerData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  }

  if (!trainerData.hireDate) {
    errors.hireDate = 'Hire date is required';
  }

  if (
    !trainerData.specializations ||
    trainerData.specializations.length === 0
  ) {
    errors.specializations = 'At least one specialization is required';
  }

  if (!trainerData.hourlyRate || trainerData.hourlyRate <= 0) {
    errors.hourlyRate = 'Valid hourly rate is required';
  }

  return errors;
};

/**
 * Generate unique trainer ID
 */
export const generateTrainerId = () => {
  return `trainer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Filter trainers based on user role
 */
export const filterTrainersByRole = (trainers, user) => {
  if (!user) return [];

  if (user.role === 'admin') {
    return trainers; // Admin can see all trainers
  } else if (user.role === 'trainer') {
    // Trainers can see all trainers for collaboration
    return trainers;
  } else {
    // Members can see all active trainers for selection
    return trainers.filter((trainer) => trainer.status === 'active');
  }
};

/**
 * Check if user can perform trainer action
 */
export const canPerformTrainerAction = (user, action, trainer) => {
  if (!user) return false;

  switch (action) {
    case 'view':
      return (
        user.role === 'admin' ||
        user.role === 'trainer' ||
        user.role === 'member'
      );
    case 'edit':
    case 'delete':
    case 'create':
      return user.role === 'admin';
    case 'assign':
      return user.role === 'admin' || user.role === 'trainer';
    case 'schedule':
      return (
        user.role === 'admin' ||
        (user.role === 'trainer' && user.id === trainer?.id)
      );
    default:
      return false;
  }
};

/**
 * Format trainer data for export
 */
export const formatTrainerForExport = (trainer) => {
  return {
    ID: trainer.id,
    Name: trainer.name,
    Email: trainer.email,
    Phone: trainer.phone,
    Status: trainer.status,
    'Hire Date': trainer.hireDate,
    'Years at Gym': calculateYearsAtGym(trainer.hireDate),
    Specializations: getSpecializationsText(trainer.specializations),
    'Hourly Rate': `$${trainer.hourlyRate}`,
    'Current Clients': trainer.currentClients,
    'Max Clients': trainer.maxClients,
    'Capacity Utilization': `${calculateCapacityUtilization(
      trainer.currentClients,
      trainer.maxClients
    )}%`,
    'Average Rating': trainer.averageRating,
    'Client Retention Rate': `${trainer.clientRetentionRate}%`,
  };
};

/**
 * Get trainer quick stats
 */
export const getTrainerQuickStats = (trainers) => {
  const total = trainers.length;
  const active = trainers.filter((t) => t.status === 'active').length;
  const inactive = trainers.filter((t) => t.status === 'inactive').length;
  const onLeave = trainers.filter((t) => t.status === 'on-leave').length;

  return {
    total,
    active,
    inactive,
    onLeave,
    activePercentage: total > 0 ? Math.round((active / total) * 100) : 0,
  };
};
