import {
  format,
  isToday,
  isYesterday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subWeeks,
  subMonths,
  parseISO,
} from 'date-fns';

/**
 * Format time for display (HH:mm format)
 * @param {string|Date} time - Time string or Date object
 * @returns {string} Formatted time
 */
export const formatTime = (time) => {
  if (!time) return '--';
  const date = typeof time === 'string' ? parseISO(time) : time;
  return format(date, 'HH:mm');
};

/**
 * Format date for display
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return '--';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

/**
 * Format datetime for display
 * @param {string|Date} datetime - DateTime string or Date object
 * @returns {string} Formatted datetime
 */
export const formatDateTime = (datetime) => {
  if (!datetime) return '--';
  const dateObj = typeof datetime === 'string' ? parseISO(datetime) : datetime;
  return format(dateObj, 'MMM dd, yyyy HH:mm');
};

/**
 * Calculate session duration in minutes
 * @param {string|Date} checkIn - Check-in time
 * @param {string|Date} checkOut - Check-out time (optional)
 * @returns {number|null} Duration in minutes
 */
export const calculateDuration = (checkIn, checkOut) => {
  if (!checkIn) return null;

  const checkInTime = typeof checkIn === 'string' ? parseISO(checkIn) : checkIn;
  const checkOutTime = checkOut
    ? typeof checkOut === 'string'
      ? parseISO(checkOut)
      : checkOut
    : new Date();

  const durationMs = checkOutTime.getTime() - checkInTime.getTime();
  return Math.floor(durationMs / (1000 * 60)); // Convert to minutes
};

/**
 * Format duration for display
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration
 */
export const formatDuration = (minutes) => {
  if (!minutes || minutes < 0) return '--';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
};

/**
 * Get relative date label (Today, Yesterday, etc.)
 * @param {string|Date} date - Date to check
 * @returns {string} Relative date label
 */
export const getRelativeDateLabel = (date) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  if (isToday(dateObj)) {
    return 'Today';
  }

  if (isYesterday(dateObj)) {
    return 'Yesterday';
  }

  return formatDate(dateObj);
};

/**
 * Filter attendance records by time period
 * @param {Array} records - Attendance records
 * @param {string} period - Time period filter
 * @param {Date} customStartDate - Custom start date (optional)
 * @param {Date} customEndDate - Custom end date (optional)
 * @returns {Array} Filtered records
 */
export const filterByTimePeriod = (
  records,
  period,
  customStartDate,
  customEndDate
) => {
  const now = new Date();
  let startDate, endDate;

  switch (period) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
      );
      break;

    case 'yesterday':
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      startDate = new Date(
        yesterday.getFullYear(),
        yesterday.getMonth(),
        yesterday.getDate()
      );
      endDate = new Date(
        yesterday.getFullYear(),
        yesterday.getMonth(),
        yesterday.getDate(),
        23,
        59,
        59
      );
      break;

    case 'this_week':
      startDate = startOfWeek(now, { weekStartsOn: 1 }); // Monday
      endDate = endOfWeek(now, { weekStartsOn: 1 });
      break;

    case 'last_week':
      const lastWeek = subWeeks(now, 1);
      startDate = startOfWeek(lastWeek, { weekStartsOn: 1 });
      endDate = endOfWeek(lastWeek, { weekStartsOn: 1 });
      break;

    case 'this_month':
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
      break;

    case 'last_month':
      const lastMonth = subMonths(now, 1);
      startDate = startOfMonth(lastMonth);
      endDate = endOfMonth(lastMonth);
      break;

    case 'custom':
      startDate = customStartDate;
      endDate = customEndDate;
      break;

    default:
      return records;
  }

  if (!startDate || !endDate) return records;

  return records.filter((record) => {
    const recordDate = parseISO(record.checkInTime);
    return recordDate >= startDate && recordDate <= endDate;
  });
};

/**
 * Get attendance statistics
 * @param {Array} records - Attendance records
 * @returns {Object} Statistics object
 */
export const getAttendanceStats = (records) => {
  const totalSessions = records.length;
  const completedSessions = records.filter(
    (r) => r.status === 'completed'
  ).length;
  const activeSessions = records.filter(
    (r) => r.status === 'checked_in'
  ).length;

  const totalMinutes = records
    .filter((r) => r.duration)
    .reduce((sum, r) => sum + r.duration, 0);

  const averageDuration =
    totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;

  // Get unique members
  const uniqueMembers = new Set(records.map((r) => r.memberId)).size;

  return {
    totalSessions,
    completedSessions,
    activeSessions,
    totalDuration: totalMinutes,
    averageDuration,
    uniqueMembers,
  };
};

/**
 * Group attendance records by date
 * @param {Array} records - Attendance records
 * @returns {Object} Records grouped by date
 */
export const groupByDate = (records) => {
  return records.reduce((groups, record) => {
    const date = record.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(record);
    return groups;
  }, {});
};

/**
 * Search members by name or membership ID
 * @param {Array} members - Array of members
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered members
 */
export const searchMembers = (members, searchTerm) => {
  if (!searchTerm) return members;

  const term = searchTerm.toLowerCase();
  return members.filter(
    (member) =>
      member.name.toLowerCase().includes(term) ||
      member.membershipId.toLowerCase().includes(term) ||
      member.email.toLowerCase().includes(term)
  );
};

/**
 * Generate unique attendance ID
 * @returns {string} Unique ID
 */
export const generateAttendanceId = () => {
  return `ATT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate check-in data
 * @param {Object} data - Check-in data
 * @returns {Object} Validation result
 */
export const validateCheckIn = (data) => {
  const errors = {};

  if (!data.memberId) {
    errors.memberId = 'Member is required';
  }

  if (!data.checkInTime) {
    errors.checkInTime = 'Check-in time is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate check-out data
 * @param {Object} data - Check-out data
 * @returns {Object} Validation result
 */
export const validateCheckOut = (data) => {
  const errors = {};

  if (!data.checkOutTime) {
    errors.checkOutTime = 'Check-out time is required';
  }

  if (data.checkInTime && data.checkOutTime) {
    const checkIn = parseISO(data.checkInTime);
    const checkOut = parseISO(data.checkOutTime);

    if (checkOut <= checkIn) {
      errors.checkOutTime = 'Check-out time must be after check-in time';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
