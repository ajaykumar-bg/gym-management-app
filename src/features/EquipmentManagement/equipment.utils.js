// Equipment Management Utility Functions

/**
 * Get status color for Material-UI components
 * @param {string} status - Equipment status
 * @returns {string} - Material-UI color variant
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'operational':
      return 'success';
    case 'maintenance':
      return 'warning';
    case 'repair':
      return 'error';
    case 'out-of-order':
      return 'error';
    case 'retired':
      return 'default';
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
 * Calculate days until next maintenance
 * @param {string} nextMaintenanceDate - Next maintenance date string
 * @returns {number} - Days until maintenance
 */
export const getDaysUntilMaintenance = (nextMaintenanceDate) => {
  if (!nextMaintenanceDate) return null;

  const today = new Date();
  const maintenanceDate = new Date(nextMaintenanceDate);
  const diffTime = maintenanceDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Check if equipment needs maintenance soon
 * @param {string} nextMaintenanceDate - Next maintenance date string
 * @param {number} warningDays - Days before maintenance to show warning (default: 7)
 * @returns {boolean} - True if maintenance is due soon
 */
export const isMaintenanceDueSoon = (nextMaintenanceDate, warningDays = 7) => {
  const daysUntil = getDaysUntilMaintenance(nextMaintenanceDate);
  return daysUntil !== null && daysUntil <= warningDays && daysUntil >= 0;
};

/**
 * Check if equipment maintenance is overdue
 * @param {string} nextMaintenanceDate - Next maintenance date string
 * @returns {boolean} - True if maintenance is overdue
 */
export const isMaintenanceOverdue = (nextMaintenanceDate) => {
  const daysUntil = getDaysUntilMaintenance(nextMaintenanceDate);
  return daysUntil !== null && daysUntil < 0;
};

/**
 * Calculate equipment age in years
 * @param {string} purchaseDate - Purchase date string
 * @returns {number} - Age in years
 */
export const getEquipmentAge = (purchaseDate) => {
  if (!purchaseDate) return 0;

  const today = new Date();
  const purchase = new Date(purchaseDate);
  const ageInMs = today - purchase;
  const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365);

  return Math.floor(ageInYears * 10) / 10; // Round to 1 decimal place
};

/**
 * Check if equipment warranty is still valid
 * @param {string} warrantyExpiryDate - Warranty expiry date string
 * @returns {boolean} - True if warranty is still valid
 */
export const isWarrantyValid = (warrantyExpiryDate) => {
  if (!warrantyExpiryDate) return false;

  const today = new Date();
  const expiryDate = new Date(warrantyExpiryDate);

  return today <= expiryDate;
};

/**
 * Get days until warranty expires
 * @param {string} warrantyExpiryDate - Warranty expiry date string
 * @returns {number} - Days until warranty expires
 */
export const getDaysUntilWarrantyExpiry = (warrantyExpiryDate) => {
  if (!warrantyExpiryDate) return null;

  const today = new Date();
  const expiryDate = new Date(warrantyExpiryDate);
  const diffTime = expiryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Filter equipment by status
 * @param {Array} equipment - Array of equipment objects
 * @param {string} status - Status to filter by
 * @returns {Array} - Filtered equipment array
 */
export const filterEquipmentByStatus = (equipment, status) => {
  if (!status || status === 'all') return equipment;
  return equipment.filter((item) => item.status === status);
};

/**
 * Filter equipment by category
 * @param {Array} equipment - Array of equipment objects
 * @param {string} category - Category to filter by
 * @returns {Array} - Filtered equipment array
 */
export const filterEquipmentByCategory = (equipment, category) => {
  if (!category || category === 'all') return equipment;
  return equipment.filter((item) => item.category === category);
};

/**
 * Sort equipment by specified field
 * @param {Array} equipment - Array of equipment objects
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} - Sorted equipment array
 */
export const sortEquipment = (equipment, field, direction = 'asc') => {
  return [...equipment].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];

    // Handle dates
    if (field.includes('Date') || field.includes('Maintenance')) {
      aVal = new Date(aVal || '1900-01-01');
      bVal = new Date(bVal || '1900-01-01');
    }

    // Handle numbers
    if (field === 'purchasePrice') {
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
 * Search equipment by name, manufacturer, or model
 * @param {Array} equipment - Array of equipment objects
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered equipment array
 */
export const searchEquipment = (equipment, searchTerm) => {
  if (!searchTerm) return equipment;

  const term = searchTerm.toLowerCase();

  return equipment.filter(
    (item) =>
      item.name.toLowerCase().includes(term) ||
      item.manufacturer.toLowerCase().includes(term) ||
      item.model.toLowerCase().includes(term) ||
      item.location.toLowerCase().includes(term)
  );
};

/**
 * Get equipment statistics
 * @param {Array} equipment - Array of equipment objects
 * @returns {Object} - Statistics object
 */
export const getEquipmentStatistics = (equipment) => {
  const stats = {
    total: equipment.length,
    operational: 0,
    maintenance: 0,
    repair: 0,
    outOfOrder: 0,
    retired: 0,
    totalValue: 0,
    maintenanceDueSoon: 0,
    maintenanceOverdue: 0,
    warrantyExpiringSoon: 0,
  };

  equipment.forEach((item) => {
    // Status counts
    stats[item.status.replace('-', '')]++;

    // Total value
    stats.totalValue += item.purchasePrice || 0;

    // Maintenance alerts
    if (isMaintenanceDueSoon(item.nextMaintenance)) {
      stats.maintenanceDueSoon++;
    }
    if (isMaintenanceOverdue(item.nextMaintenance)) {
      stats.maintenanceOverdue++;
    }

    // Warranty alerts
    const warrantyDays = getDaysUntilWarrantyExpiry(item.warrantyExpiry);
    if (warrantyDays !== null && warrantyDays <= 90 && warrantyDays >= 0) {
      stats.warrantyExpiringSoon++;
    }
  });

  return stats;
};

/**
 * Filter equipment based on multiple criteria
 * @param {Array} equipment - Array of equipment objects
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered equipment array
 */
export const filterEquipment = (equipment, filters) => {
  let filtered = [...equipment];

  if (filters.category && filters.category !== 'all') {
    filtered = filterEquipmentByCategory(filtered, filters.category);
  }

  if (filters.status && filters.status !== 'all') {
    filtered = filterEquipmentByStatus(filtered, filters.status);
  }

  if (filters.search) {
    filtered = searchEquipment(filtered, filters.search);
  }

  return filtered;
};

/**
 * Validate equipment form data
 * @param {Object} formData - Form data to validate
 * @returns {boolean} - True if valid
 */
export const validateEquipmentData = (formData) => {
  if (!formData.name?.trim()) return false;
  if (!formData.category) return false;
  if (formData.purchasePrice && isNaN(parseFloat(formData.purchasePrice)))
    return false;
  return true;
};

/**
 * Generate unique equipment ID
 * @returns {string} - Unique equipment ID
 */
export const generateEquipmentId = () => {
  return `EQ${Date.now().toString().slice(-6)}`;
};
