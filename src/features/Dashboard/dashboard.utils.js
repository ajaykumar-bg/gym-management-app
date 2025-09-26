/**
 * Dashboard utility functions for gym management
 */

// Format currency values
export const formatCurrency = (value) => {
  if (typeof value === 'string' && value.includes('$')) {
    return value;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// Format numbers with commas
export const formatNumber = (value) => {
  if (typeof value === 'string') return value;
  return new Intl.NumberFormat().format(value);
};

// Get change indicator color
export const getChangeColor = (changeType) => {
  switch (changeType) {
    case 'positive':
      return 'success.main';
    case 'negative':
      return 'error.main';
    case 'warning':
      return 'warning.main';
    case 'info':
      return 'info.main';
    default:
      return 'text.secondary';
  }
};

// Get change arrow icon
export const getChangeIcon = (changeType) => {
  switch (changeType) {
    case 'positive':
      return 'TrendingUp';
    case 'negative':
      return 'TrendingDown';
    case 'warning':
      return 'Warning';
    case 'info':
      return 'Info';
    default:
      return null;
  }
};

// Generate greeting based on time of day
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

// Get role-specific dashboard title
export const getDashboardTitle = (role, userName) => {
  const greeting = getGreeting();
  return `${greeting}, ${userName}!`;
};

// Calculate percentage change
export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
};

// Get activity icon based on type
export const getActivityIcon = (type) => {
  const iconMap = {
    member: 'Person',
    payment: 'AttachMoney',
    equipment: 'Build',
    trainer: 'FitnessCenter',
    class: 'Event',
    progress: 'TrendingUp',
    schedule: 'Schedule',
    workout: 'FitnessCenter',
    achievement: 'EmojiEvents',
    measurement: 'Straighten',
  };
  return iconMap[type] || 'Info';
};

// Format time ago
export const formatTimeAgo = (timeString) => {
  // This is a simple implementation - in a real app you might use a library like date-fns
  return timeString;
};

// Get chart colors based on theme
export const getChartColors = (theme = 'light') => {
  return {
    primary: '#1976d2',
    secondary: '#dc004e',
    success: '#2e7d32',
    warning: '#ed6c02',
    error: '#d32f2f',
    info: '#0288d1',
  };
};

// Validate stat value
export const validateStatValue = (value) => {
  if (value === null || value === undefined) return '0';
  return value;
};
