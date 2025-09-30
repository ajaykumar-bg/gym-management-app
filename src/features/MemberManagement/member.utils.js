// Member Management utility functions

import { MEMBER_STATUS, MEMBERSHIP_TYPES } from './member.constants';

/**
 * Get member status color for UI display
 */
export const getMemberStatusColor = (status) => {
  switch (status) {
    case MEMBER_STATUS.ACTIVE:
      return 'success';
    case MEMBER_STATUS.INACTIVE:
      return 'warning';
    case MEMBER_STATUS.SUSPENDED:
      return 'error';
    case MEMBER_STATUS.EXPIRED:
      return 'error';
    default:
      return 'default';
  }
};

/**
 * Get membership type color for UI display
 */
export const getMembershipTypeColor = (type) => {
  switch (type) {
    case MEMBERSHIP_TYPES.BASIC:
      return 'primary';
    case MEMBERSHIP_TYPES.PREMIUM:
      return 'warning';
    case MEMBERSHIP_TYPES.VIP:
      return 'error';
    case MEMBERSHIP_TYPES.LIFETIME:
      return 'success';
    default:
      return 'default';
  }
};

/**
 * Calculate age from date of birth
 */
export const calculateAge = (dateOfBirth) => {
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
 * Calculate BMI from weight and height
 */
export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

/**
 * Get BMI category
 */
export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

/**
 * Check if membership is expiring soon (within 30 days)
 */
export const isMembershipExpiringSoon = (endDate) => {
  const today = new Date();
  const expiryDate = new Date(endDate);
  const diffTime = expiryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 30 && diffDays > 0;
};

/**
 * Format member data for table display
 */
export const formatMemberForTable = (member) => ({
  id: member.id,
  name: `${member.firstName} ${member.lastName}`,
  email: member.email,
  phone: member.phone,
  membershipType: member.membershipInfo.type.toUpperCase(),
  status: member.membershipInfo.status.toUpperCase(),
  joinDate: new Date(member.joinDate).toLocaleDateString(),
});

/**
 * Get latest body measurements
 */
export const getLatestMeasurements = (member) => {
  if (!member.bodyMeasurements || member.bodyMeasurements.length === 0) {
    return null;
  }

  return member.bodyMeasurements.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  });
};

/**
 * Calculate progress between two measurements
 */
export const calculateProgress = (latest, previous) => {
  if (!latest || !previous) return null;

  return {
    weight: {
      change: (latest.weight - previous.weight).toFixed(1),
      percentage: (
        ((latest.weight - previous.weight) / previous.weight) *
        100
      ).toFixed(1),
    },
    bodyFat: {
      change: (latest.bodyFat - previous.bodyFat).toFixed(1),
      percentage: (
        ((latest.bodyFat - previous.bodyFat) / previous.bodyFat) *
        100
      ).toFixed(1),
    },
    muscleMass: {
      change: (latest.muscleMass - previous.muscleMass).toFixed(1),
      percentage: (
        ((latest.muscleMass - previous.muscleMass) / previous.muscleMass) *
        100
      ).toFixed(1),
    },
  };
};

/**
 * Validate member form data
 */
export const validateMemberForm = (memberData) => {
  const errors = {};

  if (!memberData.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!memberData.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!memberData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(memberData.email)) {
    errors.email = 'Email is invalid';
  }

  if (!memberData.phone?.trim()) {
    errors.phone = 'Phone number is required';
  }

  if (!memberData.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Filter members based on search criteria
 */
export const filterMembers = (
  members,
  searchTerm,
  statusFilter,
  membershipFilter
) => {
  return members.filter((member) => {
    const matchesSearch =
      searchTerm === '' ||
      `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || member.membershipInfo.status === statusFilter;

    const matchesMembership =
      membershipFilter === 'all' ||
      member.membershipInfo.type === membershipFilter;

    return matchesSearch && matchesStatus && matchesMembership;
  });
};

/**
 * Filter members based on user role and permissions
 * @param {Array} members - Array of member objects
 * @param {Object} user - Current user object
 * @returns {Array} - Filtered members array
 */
export const filterMembersByRole = (members, user) => {
  if (!user) return [];

  if (user.role === 'admin') {
    return members; // Admin can see all members
  } else if (user.role === 'trainer') {
    // Trainer can only see their assigned members
    return members.filter((member) => member.trainerId === user.id);
  } else {
    // Members can only see their own profile
    return members.filter((member) => member.id === user.id);
  }
};

/**
 * Validate member form data
 * @param {Object} memberData - Member data to validate
 * @returns {boolean} - True if valid
 */
export const validateMemberData = (memberData) => {
  if (!memberData.firstName?.trim()) return false;
  if (!memberData.lastName?.trim()) return false;
  if (!memberData.email?.trim()) return false;
  if (!memberData.phone?.trim()) return false;
  if (!memberData.membershipInfo?.type) return false;
  if (!memberData.membershipInfo?.startDate) return false;
  return true;
};

/**
 * Generate unique member ID
 * @returns {string} - Unique member ID
 */
export const generateMemberId = () => {
  return `MEM${Date.now().toString().slice(-6)}`;
};

/**
 * Check if membership is expired
 * @param {string} endDate - Membership end date
 * @returns {boolean} - True if expired
 */
export const isMembershipExpired = (endDate) => {
  if (!endDate) return false;

  const today = new Date();
  const expiryDate = new Date(endDate);

  return today > expiryDate;
};

/**
 * Get membership status with additional info
 * @param {Object} member - Member object
 * @returns {Object} - Status information
 */
export const getMembershipStatusInfo = (member) => {
  const endDate = member.membershipInfo?.endDate;
  const status = member.membershipInfo?.status;

  return {
    status,
    isExpired: isMembershipExpired(endDate),
    isExpiringSoon: isMembershipExpiringSoon(endDate),
    daysUntilExpiry: endDate
      ? Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24))
      : null,
  };
};

/**
 * Search members by multiple fields
 * @param {Array} members - Array of member objects
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered members array
 */
export const searchMembers = (members, searchTerm) => {
  if (!searchTerm) return members;

  const term = searchTerm.toLowerCase();

  return members.filter(
    (member) =>
      `${member.firstName} ${member.lastName}`.toLowerCase().includes(term) ||
      member.email.toLowerCase().includes(term) ||
      member.phone.toLowerCase().includes(term) ||
      member.id.toLowerCase().includes(term)
  );
};

/**
 * Sort members by specified field
 * @param {Array} members - Array of member objects
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} - Sorted members array
 */
export const sortMembers = (members, field, direction = 'asc') => {
  return [...members].sort((a, b) => {
    let aVal, bVal;

    switch (field) {
      case 'name':
        aVal = `${a.firstName} ${a.lastName}`.toLowerCase();
        bVal = `${b.firstName} ${b.lastName}`.toLowerCase();
        break;
      case 'joinDate':
        aVal = new Date(a.joinDate || '1900-01-01');
        bVal = new Date(b.joinDate || '1900-01-01');
        break;
      case 'membershipType':
        aVal = a.membershipInfo?.type || '';
        bVal = b.membershipInfo?.type || '';
        break;
      case 'status':
        aVal = a.membershipInfo?.status || '';
        bVal = b.membershipInfo?.status || '';
        break;
      default:
        aVal = a[field] || '';
        bVal = b[field] || '';
    }

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (direction === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
};
