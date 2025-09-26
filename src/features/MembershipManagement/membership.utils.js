// Membership & Package Management Utility Functions

/**
 * Filter packages by type
 * @param {Array} packages - Array of package objects
 * @param {string} type - Type to filter by
 * @returns {Array} - Filtered packages
 */
export const filterPackagesByType = (packages, type) => {
  if (!type || type === 'all') return packages;
  return packages.filter((pkg) => pkg.type === type);
};

/**
 * Filter packages by duration
 * @param {Array} packages - Array of package objects
 * @param {string} duration - Duration to filter by
 * @returns {Array} - Filtered packages
 */
export const filterPackagesByDuration = (packages, duration) => {
  if (!duration || duration === 'all') return packages;
  return packages.filter((pkg) => pkg.duration === duration);
};

/**
 * Filter packages by status
 * @param {Array} packages - Array of package objects
 * @param {string} status - Status to filter by
 * @returns {Array} - Filtered packages
 */
export const filterPackagesByStatus = (packages, status) => {
  if (!status || status === 'all') return packages;
  return packages.filter((pkg) => pkg.status === status);
};

/**
 * Filter subscriptions by status
 * @param {Array} subscriptions - Array of subscription objects
 * @param {string} status - Status to filter by
 * @returns {Array} - Filtered subscriptions
 */
export const filterSubscriptionsByStatus = (subscriptions, status) => {
  if (!status || status === 'all') return subscriptions;
  return subscriptions.filter((sub) => sub.status === status);
};

/**
 * Search packages by name or description
 * @param {Array} packages - Array of package objects
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered packages
 */
export const searchPackages = (packages, searchTerm) => {
  if (!searchTerm) return packages;

  const term = searchTerm.toLowerCase();

  return packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(term) ||
      pkg.description.toLowerCase().includes(term) ||
      pkg.type.toLowerCase().includes(term)
  );
};

/**
 * Search subscriptions by member name or package name
 * @param {Array} subscriptions - Array of subscription objects
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered subscriptions
 */
export const searchSubscriptions = (subscriptions, searchTerm) => {
  if (!searchTerm) return subscriptions;

  const term = searchTerm.toLowerCase();

  return subscriptions.filter(
    (sub) =>
      sub.memberName.toLowerCase().includes(term) ||
      sub.packageName.toLowerCase().includes(term) ||
      sub.memberId.toLowerCase().includes(term)
  );
};

/**
 * Sort packages by specified field
 * @param {Array} packages - Array of package objects
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} - Sorted packages
 */
export const sortPackages = (packages, field, direction = 'asc') => {
  return [...packages].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];

    // Handle dates
    if (field.includes('Date')) {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    // Handle prices
    if (field === 'price') {
      aVal = parseFloat(aVal) || 0;
      bVal = parseFloat(bVal) || 0;
    }

    // Handle strings
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

/**
 * Get subscription status color for Material-UI components
 * @param {string} status - Subscription status
 * @returns {string} - Material-UI color variant
 */
export const getSubscriptionStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'expired':
      return 'error';
    case 'suspended':
      return 'warning';
    case 'cancelled':
      return 'default';
    case 'pending':
      return 'info';
    default:
      return 'default';
  }
};

/**
 * Get payment status color for Material-UI components
 * @param {string} status - Payment status
 * @returns {string} - Material-UI color variant
 */
export const getPaymentStatusColor = (status) => {
  switch (status) {
    case 'paid':
      return 'success';
    case 'pending':
      return 'warning';
    case 'overdue':
      return 'error';
    case 'failed':
      return 'error';
    default:
      return 'default';
  }
};

/**
 * Format currency value
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Calculate subscription end date based on start date and duration
 * @param {string} startDate - Start date string
 * @param {string} duration - Duration type
 * @returns {string} - End date string
 */
export const calculateEndDate = (startDate, duration) => {
  if (!startDate) return '';

  const start = new Date(startDate);
  let end = new Date(start);

  switch (duration) {
    case 'monthly':
      end.setMonth(end.getMonth() + 1);
      break;
    case 'quarterly':
      end.setMonth(end.getMonth() + 3);
      break;
    case 'semiannual':
      end.setMonth(end.getMonth() + 6);
      break;
    case 'annual':
      end.setFullYear(end.getFullYear() + 1);
      break;
    case 'lifetime':
      return 'Lifetime';
    default:
      return '';
  }

  return end.toISOString().split('T')[0];
};

/**
 * Check if subscription is expiring soon
 * @param {string} endDate - End date string
 * @param {number} warningDays - Days before expiry to show warning (default: 7)
 * @returns {boolean} - True if expiring soon
 */
export const isExpiringSoon = (endDate, warningDays = 7) => {
  if (!endDate || endDate === 'Lifetime') return false;

  const today = new Date();
  const expiry = new Date(endDate);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= warningDays && diffDays >= 0;
};

/**
 * Check if subscription is expired
 * @param {string} endDate - End date string
 * @returns {boolean} - True if expired
 */
export const isExpired = (endDate) => {
  if (!endDate || endDate === 'Lifetime') return false;

  const today = new Date();
  const expiry = new Date(endDate);

  return today > expiry;
};

/**
 * Get days until expiry
 * @param {string} endDate - End date string
 * @returns {number} - Days until expiry
 */
export const getDaysUntilExpiry = (endDate) => {
  if (!endDate || endDate === 'Lifetime') return null;

  const today = new Date();
  const expiry = new Date(endDate);
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Calculate revenue statistics
 * @param {Array} subscriptions - Array of subscription objects
 * @returns {Object} - Revenue statistics
 */
export const calculateRevenueStats = (subscriptions) => {
  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === 'active'
  );

  const monthlyRevenue = activeSubscriptions
    .filter(
      (sub) =>
        sub.packageName && sub.packageName.toLowerCase().includes('monthly')
    )
    .reduce((sum, sub) => sum + (sub.price || 0), 0);

  const annualRevenue = activeSubscriptions
    .filter(
      (sub) =>
        sub.packageName &&
        (sub.packageName.toLowerCase().includes('annual') ||
          sub.packageName.toLowerCase().includes('yearly'))
    )
    .reduce((sum, sub) => sum + (sub.price || 0), 0);

  const totalRevenue = activeSubscriptions.reduce(
    (sum, sub) => sum + (sub.price || 0),
    0
  );

  return {
    totalRevenue,
    monthlyRevenue,
    annualRevenue,
    activeSubscriptions: activeSubscriptions.length,
    totalSubscriptions: subscriptions.length,
  };
};

/**
 * Get membership statistics
 * @param {Array} packages - Array of package objects
 * @param {Array} subscriptions - Array of subscription objects
 * @returns {Object} - Statistics object
 */
export const getMembershipStats = (packages, subscriptions) => {
  const stats = {
    totalPackages: packages.length,
    activePackages: packages.filter((pkg) => pkg.status === 'active').length,
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter((sub) => sub.status === 'active')
      .length,
    expiredSubscriptions: subscriptions.filter(
      (sub) => sub.status === 'expired'
    ).length,
    suspendedSubscriptions: subscriptions.filter(
      (sub) => sub.status === 'suspended'
    ).length,
    expiringSoon: subscriptions.filter((sub) => isExpiringSoon(sub.endDate))
      .length,
    ...calculateRevenueStats(subscriptions),
  };

  return stats;
};

/**
 * Validate package data
 * @param {Object} packageData - Package data to validate
 * @returns {Object} - Validation result { isValid: boolean, errors: Array }
 */
export const validatePackageData = (packageData) => {
  const errors = [];

  if (!packageData.name || packageData.name.trim().length === 0) {
    errors.push('Package name is required');
  }

  if (!packageData.type) {
    errors.push('Package type is required');
  }

  if (!packageData.duration) {
    errors.push('Duration is required');
  }

  if (!packageData.price || packageData.price <= 0) {
    errors.push('Price must be greater than 0');
  }

  if (packageData.price && packageData.price > 10000) {
    errors.push('Price cannot exceed $10,000');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Generate unique package ID
 * @returns {string} - Unique ID
 */
export const generatePackageId = () => {
  return `PKG${Date.now().toString(36).toUpperCase()}${Math.random()
    .toString(36)
    .substr(2, 2)
    .toUpperCase()}`;
};

/**
 * Generate unique subscription ID
 * @returns {string} - Unique ID
 */
export const generateSubscriptionId = () => {
  return `SUB${Date.now().toString(36).toUpperCase()}${Math.random()
    .toString(36)
    .substr(2, 2)
    .toUpperCase()}`;
};
