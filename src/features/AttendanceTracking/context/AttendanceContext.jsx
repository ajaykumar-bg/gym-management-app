import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import {
  ATTENDANCE_STATUS,
  MOCK_MEMBERS,
  MOCK_ATTENDANCE_RECORDS,
  TIME_PERIODS,
  PAGINATION_DEFAULTS,
} from '../constants/attendanceConstants';
import {
  generateAttendanceId,
  calculateDuration,
  filterByTimePeriod,
  getAttendanceStats,
  validateCheckIn,
  validateCheckOut,
} from '../utils/attendanceUtils';

// Initial state
const initialState = {
  // Data
  members: MOCK_MEMBERS,
  attendanceRecords: MOCK_ATTENDANCE_RECORDS,

  // UI State
  loading: false,
  error: null,

  // Filters
  filters: {
    timePeriod: TIME_PERIODS.TODAY,
    customStartDate: null,
    customEndDate: null,
    memberSearch: '',
    status: 'all',
  },

  // Pagination
  pagination: {
    page: 0,
    pageSize: PAGINATION_DEFAULTS.PAGE_SIZE,
    total: 0,
  },

  // Dialogs
  dialogs: {
    checkIn: false,
    checkOut: false,
    viewDetails: false,
  },

  // Selected records
  selectedRecord: null,
  selectedMember: null,

  // Statistics
  stats: null,
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',

  // Data actions
  SET_ATTENDANCE_RECORDS: 'SET_ATTENDANCE_RECORDS',
  ADD_ATTENDANCE_RECORD: 'ADD_ATTENDANCE_RECORD',
  UPDATE_ATTENDANCE_RECORD: 'UPDATE_ATTENDANCE_RECORD',
  DELETE_ATTENDANCE_RECORD: 'DELETE_ATTENDANCE_RECORD',

  // Filter actions
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',

  // Pagination actions
  SET_PAGINATION: 'SET_PAGINATION',

  // Dialog actions
  OPEN_DIALOG: 'OPEN_DIALOG',
  CLOSE_DIALOG: 'CLOSE_DIALOG',
  CLOSE_ALL_DIALOGS: 'CLOSE_ALL_DIALOGS',

  // Selection actions
  SET_SELECTED_RECORD: 'SET_SELECTED_RECORD',
  SET_SELECTED_MEMBER: 'SET_SELECTED_MEMBER',

  // Stats actions
  SET_STATS: 'SET_STATS',
};

// Reducer function
const attendanceReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case actionTypes.SET_ATTENDANCE_RECORDS:
      return { ...state, attendanceRecords: action.payload };

    case actionTypes.ADD_ATTENDANCE_RECORD:
      return {
        ...state,
        attendanceRecords: [...state.attendanceRecords, action.payload],
      };

    case actionTypes.UPDATE_ATTENDANCE_RECORD:
      return {
        ...state,
        attendanceRecords: state.attendanceRecords.map((record) =>
          record.id === action.payload.id
            ? { ...record, ...action.payload }
            : record
        ),
      };

    case actionTypes.DELETE_ATTENDANCE_RECORD:
      return {
        ...state,
        attendanceRecords: state.attendanceRecords.filter(
          (record) => record.id !== action.payload
        ),
      };

    case actionTypes.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 0 }, // Reset page when filters change
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

    case actionTypes.SET_SELECTED_RECORD:
      return { ...state, selectedRecord: action.payload };

    case actionTypes.SET_SELECTED_MEMBER:
      return { ...state, selectedMember: action.payload };

    case actionTypes.SET_STATS:
      return { ...state, stats: action.payload };

    default:
      return state;
  }
};

// Context creation
const AttendanceContext = createContext();

// Provider component
export const AttendanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(attendanceReducer, initialState);

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

  const setSelectedRecord = useCallback((record) => {
    dispatch({ type: actionTypes.SET_SELECTED_RECORD, payload: record });
  }, []);

  const setSelectedMember = useCallback((member) => {
    dispatch({ type: actionTypes.SET_SELECTED_MEMBER, payload: member });
  }, []);

  // Update stats function
  const updateStats = useCallback(() => {
    const filteredRecords = filterByTimePeriod(
      state.attendanceRecords,
      state.filters.timePeriod,
      state.filters.customStartDate,
      state.filters.customEndDate
    );

    const stats = getAttendanceStats(filteredRecords);
    dispatch({ type: actionTypes.SET_STATS, payload: stats });
  }, [state.attendanceRecords, state.filters]);

  // Business logic functions
  const checkInMember = useCallback(
    async (memberData) => {
      setLoading(true);
      setError(null);

      try {
        // Validate input
        const validation = validateCheckIn(memberData);
        if (!validation.isValid) {
          throw new Error(Object.values(validation.errors).join(', '));
        }

        // Check if member is already checked in
        const existingActiveRecord = state.attendanceRecords.find(
          (record) =>
            record.memberId === memberData.memberId &&
            record.status === ATTENDANCE_STATUS.CHECKED_IN
        );

        if (existingActiveRecord) {
          throw new Error('Member is already checked in');
        }

        // Find member details
        const member = state.members.find((m) => m.id === memberData.memberId);
        if (!member) {
          throw new Error('Member not found');
        }

        // Create attendance record
        const newRecord = {
          id: generateAttendanceId(),
          memberId: member.id,
          memberName: member.name,
          membershipId: member.membershipId,
          checkInTime: memberData.checkInTime || new Date().toISOString(),
          checkOutTime: null,
          duration: null,
          status: ATTENDANCE_STATUS.CHECKED_IN,
          date: new Date().toISOString().split('T')[0],
          notes: memberData.notes || '',
        };

        dispatch({
          type: actionTypes.ADD_ATTENDANCE_RECORD,
          payload: newRecord,
        });

        // Update stats
        updateStats();

        closeDialog('checkIn');
        return newRecord;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [
      state.attendanceRecords,
      state.members,
      setLoading,
      setError,
      updateStats,
      closeDialog,
    ]
  );

  const checkOutMember = useCallback(
    async (recordId, checkOutData) => {
      setLoading(true);
      setError(null);

      try {
        // Find the attendance record
        const record = state.attendanceRecords.find((r) => r.id === recordId);
        if (!record) {
          throw new Error('Attendance record not found');
        }

        if (record.status !== ATTENDANCE_STATUS.CHECKED_IN) {
          throw new Error('Member is not currently checked in');
        }

        // Validate check-out data
        const validation = validateCheckOut({
          checkInTime: record.checkInTime,
          checkOutTime: checkOutData.checkOutTime || new Date().toISOString(),
        });

        if (!validation.isValid) {
          throw new Error(Object.values(validation.errors).join(', '));
        }

        const checkOutTime =
          checkOutData.checkOutTime || new Date().toISOString();
        const duration = calculateDuration(record.checkInTime, checkOutTime);

        // Update record
        const updatedRecord = {
          ...record,
          checkOutTime,
          duration,
          status: ATTENDANCE_STATUS.COMPLETED,
          notes: checkOutData.notes || record.notes,
        };

        dispatch({
          type: actionTypes.UPDATE_ATTENDANCE_RECORD,
          payload: updatedRecord,
        });

        // Update stats
        updateStats();

        closeDialog('checkOut');
        return updatedRecord;
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [state.attendanceRecords, setLoading, setError, updateStats, closeDialog]
  );

  const deleteAttendanceRecord = useCallback(
    async (recordId) => {
      setLoading(true);
      setError(null);

      try {
        const record = state.attendanceRecords.find((r) => r.id === recordId);
        if (!record) {
          throw new Error('Attendance record not found');
        }

        dispatch({
          type: actionTypes.DELETE_ATTENDANCE_RECORD,
          payload: recordId,
        });

        // Update stats
        updateStats();
      } catch (error) {
        setError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [state.attendanceRecords, setLoading, setError, updateStats]
  );

  // Get filtered and paginated records
  const getFilteredRecords = useCallback(() => {
    let filteredRecords = [...state.attendanceRecords];

    // Apply time period filter
    filteredRecords = filterByTimePeriod(
      filteredRecords,
      state.filters.timePeriod,
      state.filters.customStartDate,
      state.filters.customEndDate
    );

    // Apply member search filter
    if (state.filters.memberSearch) {
      const searchTerm = state.filters.memberSearch.toLowerCase();
      filteredRecords = filteredRecords.filter(
        (record) =>
          record.memberName.toLowerCase().includes(searchTerm) ||
          record.membershipId.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (state.filters.status !== 'all') {
      filteredRecords = filteredRecords.filter(
        (record) => record.status === state.filters.status
      );
    }

    // Sort by check-in time (most recent first)
    filteredRecords.sort(
      (a, b) => new Date(b.checkInTime) - new Date(a.checkInTime)
    );

    return filteredRecords;
  }, [state.attendanceRecords, state.filters]);

  // Initialize stats on load
  React.useEffect(() => {
    updateStats();
  }, [updateStats]);

  // Context value
  const value = {
    // State
    ...state,

    // Computed values
    filteredRecords: getFilteredRecords(),

    // Actions
    setLoading,
    setError,
    setFilters,
    resetFilters,
    setPagination,
    openDialog,
    closeDialog,
    closeAllDialogs,
    setSelectedRecord,
    setSelectedMember,

    // Business logic
    checkInMember,
    checkOutMember,
    deleteAttendanceRecord,
    updateStats,
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

// Custom hook for using the context
export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};
