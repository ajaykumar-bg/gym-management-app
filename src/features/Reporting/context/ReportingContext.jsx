import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import {
  REPORT_TYPES,
  TIME_PERIODS,
  REPORT_STATUS,
  MOCK_REGISTRATION_DATA,
  MOCK_ATTENDANCE_DATA,
  MOCK_PAYMENT_DATA,
  MOCK_TRAINER_DATA,
  REPORT_TEMPLATES,
  PAGINATION_DEFAULTS,
} from '../constants/reportingConstants';
import {
  getDateRange,
  filterByDateRange,
  searchAndFilter,
  generateReportSummary,
  validateFilters,
} from '../utils/reportingUtils';

// Initial state
const initialState = {
  // Data
  registrationData: MOCK_REGISTRATION_DATA,
  attendanceData: MOCK_ATTENDANCE_DATA,
  paymentData: MOCK_PAYMENT_DATA,
  trainerData: MOCK_TRAINER_DATA,

  // Current report
  currentReport: null,
  reportData: [],
  reportSummary: null,

  // UI State
  loading: false,
  error: null,

  // Filters
  filters: {
    reportType: REPORT_TYPES.REGISTRATION,
    timePeriod: TIME_PERIODS.THIS_MONTH,
    customStartDate: null,
    customEndDate: null,
    searchTerm: '',
    additionalFilters: {},
  },

  // Pagination
  pagination: {
    page: 0,
    pageSize: PAGINATION_DEFAULTS.PAGE_SIZE,
    total: 0,
  },

  // Dialogs
  dialogs: {
    export: false,
    filters: false,
    reportDetails: false,
  },

  // Export settings
  exportSettings: {
    format: 'csv',
    includeCharts: true,
    columns: [],
  },

  // Generated reports
  generatedReports: [],
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',

  // Report actions
  SET_CURRENT_REPORT: 'SET_CURRENT_REPORT',
  SET_REPORT_DATA: 'SET_REPORT_DATA',
  SET_REPORT_SUMMARY: 'SET_REPORT_SUMMARY',
  ADD_GENERATED_REPORT: 'ADD_GENERATED_REPORT',

  // Filter actions
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',

  // Pagination actions
  SET_PAGINATION: 'SET_PAGINATION',

  // Dialog actions
  OPEN_DIALOG: 'OPEN_DIALOG',
  CLOSE_DIALOG: 'CLOSE_DIALOG',
  CLOSE_ALL_DIALOGS: 'CLOSE_ALL_DIALOGS',

  // Export actions
  SET_EXPORT_SETTINGS: 'SET_EXPORT_SETTINGS',
};

// Reducer function
const reportingReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case actionTypes.SET_CURRENT_REPORT:
      return { ...state, currentReport: action.payload };

    case actionTypes.SET_REPORT_DATA:
      return { ...state, reportData: action.payload };

    case actionTypes.SET_REPORT_SUMMARY:
      return { ...state, reportSummary: action.payload };

    case actionTypes.ADD_GENERATED_REPORT:
      return {
        ...state,
        generatedReports: [action.payload, ...state.generatedReports],
      };

    case actionTypes.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 0 },
      };

    case actionTypes.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
        pagination: { ...state.pagination, page: 0 },
      };

    case actionTypes.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };

    case actionTypes.OPEN_DIALOG:
      return {
        ...state,
        dialogs: { ...state.dialogs, [action.payload]: true },
      };

    case actionTypes.CLOSE_DIALOG:
      return {
        ...state,
        dialogs: { ...state.dialogs, [action.payload]: false },
      };

    case actionTypes.CLOSE_ALL_DIALOGS:
      return {
        ...state,
        dialogs: Object.keys(state.dialogs).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {}),
      };

    case actionTypes.SET_EXPORT_SETTINGS:
      return {
        ...state,
        exportSettings: { ...state.exportSettings, ...action.payload },
      };

    default:
      return state;
  }
};

// Context creation
const ReportingContext = createContext();

// Provider component
export const ReportingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reportingReducer, initialState);

  // Action creators
  const setLoading = useCallback((loading) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: actionTypes.SET_ERROR, payload: error });
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({ type: actionTypes.SET_FILTERS, payload: filters });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: actionTypes.RESET_FILTERS });
  }, []);

  const setPagination = useCallback((pagination) => {
    dispatch({ type: actionTypes.SET_PAGINATION, payload: pagination });
  }, []);

  const openDialog = useCallback((dialogName) => {
    dispatch({ type: actionTypes.OPEN_DIALOG, payload: dialogName });
  }, []);

  const closeDialog = useCallback((dialogName) => {
    dispatch({ type: actionTypes.CLOSE_DIALOG, payload: dialogName });
  }, []);

  const closeAllDialogs = useCallback(() => {
    dispatch({ type: actionTypes.CLOSE_ALL_DIALOGS });
  }, []);

  const setExportSettings = useCallback((settings) => {
    dispatch({ type: actionTypes.SET_EXPORT_SETTINGS, payload: settings });
  }, []);

  // Get source data based on report type
  const getSourceData = useCallback(
    (reportType) => {
      switch (reportType) {
        case REPORT_TYPES.REGISTRATION:
          return state.registrationData;
        case REPORT_TYPES.ATTENDANCE:
          return state.attendanceData;
        case REPORT_TYPES.PAYMENT:
          return state.paymentData;
        case REPORT_TYPES.TRAINER_PERFORMANCE:
          return state.trainerData;
        default:
          return [];
      }
    },
    [
      state.registrationData,
      state.attendanceData,
      state.paymentData,
      state.trainerData,
    ]
  );

  // Generate report
  const generateReport = useCallback(
    async (reportConfig = null) => {
      setLoading(true);
      setError(null);

      try {
        const config = reportConfig || state.filters;

        // Validate filters
        const validation = validateFilters(config);
        if (!validation.isValid) {
          throw new Error(Object.values(validation.errors).join(', '));
        }

        // Get source data
        const sourceData = getSourceData(config.reportType);

        // Apply date range filter
        let filteredData = sourceData;
        if (config.timePeriod !== 'all') {
          const { startDate, endDate } = getDateRange(
            config.timePeriod,
            config.customStartDate,
            config.customEndDate
          );

          const dateField = getDateFieldForReportType(config.reportType);
          filteredData = filterByDateRange(
            filteredData,
            dateField,
            startDate,
            endDate
          );
        }

        // Apply search and additional filters
        const searchFields = getSearchFieldsForReportType(config.reportType);
        filteredData = searchAndFilter(
          filteredData,
          config.searchTerm,
          searchFields,
          config.additionalFilters
        );

        // Generate summary
        const summary = generateReportSummary(filteredData, config.reportType);

        // Create report object
        const report = {
          id: Date.now(),
          type: config.reportType,
          title: REPORT_TEMPLATES[config.reportType]?.title || 'Report',
          generatedAt: new Date().toISOString(),
          filters: { ...config },
          dataCount: filteredData.length,
          status: REPORT_STATUS.COMPLETED,
        };

        dispatch({ type: actionTypes.SET_CURRENT_REPORT, payload: report });
        dispatch({ type: actionTypes.SET_REPORT_DATA, payload: filteredData });
        dispatch({ type: actionTypes.SET_REPORT_SUMMARY, payload: summary });
        dispatch({ type: actionTypes.ADD_GENERATED_REPORT, payload: report });

        return { report, data: filteredData, summary };
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [state.filters, getSourceData, setError, setLoading]
  );

  // Helper function to get date field for report type
  const getDateFieldForReportType = (reportType) => {
    switch (reportType) {
      case REPORT_TYPES.REGISTRATION:
        return 'registrationDate';
      case REPORT_TYPES.ATTENDANCE:
        return 'date';
      case REPORT_TYPES.PAYMENT:
        return 'paymentDate';
      default:
        return 'date';
    }
  };

  // Helper function to get search fields for report type
  const getSearchFieldsForReportType = (reportType) => {
    switch (reportType) {
      case REPORT_TYPES.REGISTRATION:
        return ['memberName', 'email', 'membershipType'];
      case REPORT_TYPES.ATTENDANCE:
        return ['memberName', 'sessionType'];
      case REPORT_TYPES.PAYMENT:
        return ['memberName', 'invoiceNumber', 'paymentMethod'];
      case REPORT_TYPES.TRAINER_PERFORMANCE:
        return ['trainerName', 'specialization'];
      default:
        return [];
    }
  };

  // Get filtered and paginated data
  const getFilteredData = useCallback(() => {
    return state.reportData;
  }, [state.reportData]);

  // Get paginated data
  const getPaginatedData = useCallback(() => {
    const startIndex = state.pagination.page * state.pagination.pageSize;
    const endIndex = startIndex + state.pagination.pageSize;
    return state.reportData.slice(startIndex, endIndex);
  }, [state.reportData, state.pagination]);

  // Update pagination total when data changes
  React.useEffect(() => {
    if (state.reportData.length !== state.pagination.total) {
      dispatch({
        type: actionTypes.SET_PAGINATION,
        payload: { total: state.reportData.length },
      });
    }
  }, [state.reportData.length, state.pagination.total]);

  // Auto-generate report when filters change
  React.useEffect(() => {
    if (state.filters.reportType) {
      generateReport();
    }
  }, [state.filters.reportType, state.filters.timePeriod, generateReport]);

  // Context value
  const value = {
    // State
    ...state,

    // Computed values
    filteredData: getFilteredData(),
    paginatedData: getPaginatedData(),
    reportTemplates: REPORT_TEMPLATES,

    // Actions
    setLoading,
    setError,
    setFilters,
    resetFilters,
    setPagination,
    openDialog,
    closeDialog,
    closeAllDialogs,
    setExportSettings,

    // Business logic
    generateReport,
    getSourceData,
  };

  return (
    <ReportingContext.Provider value={value}>
      {children}
    </ReportingContext.Provider>
  );
};

// Custom hook for using the context
export const useReporting = () => {
  const context = useContext(ReportingContext);
  if (!context) {
    throw new Error('useReporting must be used within a ReportingProvider');
  }
  return context;
};
