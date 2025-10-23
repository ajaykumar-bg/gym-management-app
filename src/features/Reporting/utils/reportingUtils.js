import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  subWeeks,
  subMonths,
  subQuarters,
  subYears,
  isToday,
  isYesterday,
} from 'date-fns';

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} formatStr - Format string
 * @returns {string} Formatted date
 */
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '--';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

/**
 * Get date range based on time period
 * @param {string} period - Time period
 * @param {Date} customStart - Custom start date
 * @param {Date} customEnd - Custom end date
 * @returns {Object} Date range object
 */
export const getDateRange = (period, customStart = null, customEnd = null) => {
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
      startDate = startOfWeek(now, { weekStartsOn: 1 });
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

    case 'this_quarter':
      startDate = startOfQuarter(now);
      endDate = endOfQuarter(now);
      break;

    case 'last_quarter':
      const lastQuarter = subQuarters(now, 1);
      startDate = startOfQuarter(lastQuarter);
      endDate = endOfQuarter(lastQuarter);
      break;

    case 'this_year':
      startDate = startOfYear(now);
      endDate = endOfYear(now);
      break;

    case 'last_year':
      const lastYear = subYears(now, 1);
      startDate = startOfYear(lastYear);
      endDate = endOfYear(lastYear);
      break;

    case 'custom':
      startDate = customStart;
      endDate = customEnd;
      break;

    default:
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
  }

  return { startDate, endDate };
};

/**
 * Filter data by date range
 * @param {Array} data - Data array
 * @param {string} dateField - Date field name
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} Filtered data
 */
export const filterByDateRange = (data, dateField, startDate, endDate) => {
  if (!startDate || !endDate) return data;

  return data.filter((item) => {
    const itemDate =
      typeof item[dateField] === 'string'
        ? parseISO(item[dateField])
        : item[dateField];
    return itemDate >= startDate && itemDate <= endDate;
  });
};

/**
 * Group data by field
 * @param {Array} data - Data array
 * @param {string} field - Field to group by
 * @returns {Object} Grouped data
 */
export const groupBy = (data, field) => {
  return data.reduce((groups, item) => {
    const key = item[field] || 'Unknown';
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
};

/**
 * Calculate statistics for numerical data
 * @param {Array} data - Data array
 * @param {string} field - Field to calculate stats for
 * @returns {Object} Statistics object
 */
export const calculateStats = (data, field) => {
  if (!data.length) return { total: 0, average: 0, min: 0, max: 0, count: 0 };

  const values = data.map((item) => Number(item[field]) || 0);
  const total = values.reduce((sum, val) => sum + val, 0);
  const average = total / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  return {
    total,
    average: Math.round(average * 100) / 100,
    min,
    max,
    count: data.length,
  };
};

/**
 * Prepare data for charts
 * @param {Array} data - Source data
 * @param {string} xField - X-axis field
 * @param {string} yField - Y-axis field
 * @param {string} chartType - Chart type
 * @returns {Array} Chart data
 */
export const prepareChartData = (data, xField, yField, chartType = 'bar') => {
  if (chartType === 'pie' || chartType === 'donut') {
    const grouped = groupBy(data, xField);
    return Object.entries(grouped).map(([key, items]) => ({
      label: key,
      value: items.length,
      count: items.length,
    }));
  }

  if (chartType === 'line' || chartType === 'area') {
    const grouped = groupBy(data, xField);
    return Object.entries(grouped)
      .map(([key, items]) => ({
        x: key,
        y: yField ? calculateStats(items, yField).total : items.length,
        date: key,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // Bar chart
  const grouped = groupBy(data, xField);
  return Object.entries(grouped).map(([key, items]) => ({
    category: key,
    value: yField ? calculateStats(items, yField).total : items.length,
    count: items.length,
  }));
};

/**
 * Search and filter data
 * @param {Array} data - Data array
 * @param {string} searchTerm - Search term
 * @param {Array} searchFields - Fields to search in
 * @param {Object} filters - Additional filters
 * @returns {Array} Filtered data
 */
export const searchAndFilter = (
  data,
  searchTerm = '',
  searchFields = [],
  filters = {}
) => {
  let filteredData = [...data];

  // Apply search
  if (searchTerm && searchFields.length > 0) {
    const term = searchTerm.toLowerCase();
    filteredData = filteredData.filter((item) =>
      searchFields.some((field) =>
        String(item[field] || '')
          .toLowerCase()
          .includes(term)
      )
    );
  }

  // Apply filters
  Object.entries(filters).forEach(([field, value]) => {
    if (value && value !== 'all') {
      if (Array.isArray(value)) {
        filteredData = filteredData.filter((item) =>
          value.includes(item[field])
        );
      } else {
        filteredData = filteredData.filter((item) => item[field] === value);
      }
    }
  });

  return filteredData;
};

/**
 * Export data to CSV format
 * @param {Array} data - Data to export
 * @param {Array} columns - Column configuration
 * @param {string} filename - File name
 */
export const exportToCSV = (data, columns, filename = 'report.csv') => {
  if (!data.length) return;

  const headers = columns.map((col) => col.label || col.field);
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      columns
        .map((col) => {
          const value = row[col.field] || '';
          // Escape commas and quotes
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export data to JSON format
 * @param {Array} data - Data to export
 * @param {string} filename - File name
 */
export const exportToJSON = (data, filename = 'report.json') => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], {
    type: 'application/json;charset=utf-8;',
  });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Generate report summary statistics
 * @param {Array} data - Source data
 * @param {string} type - Report type
 * @returns {Object} Summary statistics
 */
export const generateReportSummary = (data, type) => {
  const summary = {
    totalRecords: data.length,
    dateRange: null,
    keyMetrics: {},
  };

  switch (type) {
    case 'registration':
      const activeMembers = data.filter(
        (item) => item.status === 'active'
      ).length;
      const pendingMembers = data.filter(
        (item) => item.status === 'pending'
      ).length;
      summary.keyMetrics = {
        activeMembers,
        pendingMembers,
        conversionRate:
          data.length > 0 ? Math.round((activeMembers / data.length) * 100) : 0,
      };
      break;

    case 'attendance':
      const totalDuration = data.reduce(
        (sum, item) => sum + (item.duration || 0),
        0
      );
      const avgDuration =
        data.length > 0 ? Math.round(totalDuration / data.length) : 0;
      const uniqueMembers = new Set(data.map((item) => item.memberId)).size;
      summary.keyMetrics = {
        totalSessions: data.length,
        uniqueMembers,
        avgDuration,
        totalHours: Math.round(totalDuration / 60),
      };
      break;

    case 'payment':
      const completedPayments = data.filter(
        (item) => item.status === 'completed'
      );
      const totalRevenue = completedPayments.reduce(
        (sum, item) => sum + (item.amount || 0),
        0
      );
      const pendingAmount = data
        .filter((item) => item.status === 'pending')
        .reduce((sum, item) => sum + (item.amount || 0), 0);
      summary.keyMetrics = {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        pendingAmount: Math.round(pendingAmount * 100) / 100,
        completedPayments: completedPayments.length,
        pendingPayments: data.filter((item) => item.status === 'pending')
          .length,
      };
      break;

    default:
      break;
  }

  return summary;
};

/**
 * Validate report filters
 * @param {Object} filters - Filter object
 * @returns {Object} Validation result
 */
export const validateFilters = (filters) => {
  const errors = {};

  if (filters.timePeriod === 'custom') {
    if (!filters.customStartDate) {
      errors.customStartDate = 'Start date is required for custom range';
    }
    if (!filters.customEndDate) {
      errors.customEndDate = 'End date is required for custom range';
    }
    if (
      filters.customStartDate &&
      filters.customEndDate &&
      new Date(filters.customStartDate) > new Date(filters.customEndDate)
    ) {
      errors.customEndDate = 'End date must be after start date';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Format currency values
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return '--';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Format percentage values
 * @param {number} value - Value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '--';
  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Get relative date label
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
