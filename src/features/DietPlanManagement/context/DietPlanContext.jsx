/**
 * Diet Plan Management Context
 * Centralized state management for the Diet Plan Management feature
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import dietPlansData from '../constants/dietPlans.json';
import assignmentsData from '../constants/dietPlanAssignments.json';
import membersData from '../constants/members.json';
import {
  sortAssignmentsByPriority,
  filterAssignments,
} from '../utils/dietPlanUtils';
import ProgressModal from '../components/ProgressModal';

// Create the context
const DietPlanContext = createContext(undefined);

// Initial state
const INITIAL_FILTERS = {
  searchTerm: '',
  planType: 'all',
  status: 'all',
  assignedTrainer: 'all',
  difficulty: 'all',
};

/**
 * Diet Plan Provider Component
 */
export const DietPlanProvider = ({ children }) => {
  // State
  const [dietPlans, setDietPlans] = useState(dietPlansData);
  const [assignments, setAssignments] = useState(assignmentsData);
  const [members] = useState(membersData);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [isAssignPlanOpen, setIsAssignPlanOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Computed values
  const filteredAssignments = useMemo(() => {
    let filtered = [...assignments];

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filterAssignments(filtered, filters.searchTerm);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(
        (assignment) => assignment.status === filters.status
      );
    }

    // Apply trainer filter
    if (filters.assignedTrainer !== 'all') {
      filtered = filtered.filter(
        (assignment) => assignment.assignedBy === filters.assignedTrainer
      );
    }

    // Apply plan type filter (requires joining with diet plans)
    if (filters.planType !== 'all') {
      const planIds = dietPlans
        .filter((plan) => plan.type === filters.planType)
        .map((plan) => plan.id);
      filtered = filtered.filter((assignment) =>
        planIds.includes(assignment.dietPlanId)
      );
    }

    // Apply difficulty filter (requires joining with diet plans)
    if (filters.difficulty !== 'all') {
      const planIds = dietPlans
        .filter((plan) => plan.difficulty === filters.difficulty)
        .map((plan) => plan.id);
      filtered = filtered.filter((assignment) =>
        planIds.includes(assignment.dietPlanId)
      );
    }

    // Sort by priority
    return sortAssignmentsByPriority(filtered);
  }, [assignments, dietPlans, filters]);

  const activeAssignments = useMemo(() => {
    return assignments.filter((assignment) => assignment.status === 'active');
  }, [assignments]);

  const completedAssignments = useMemo(() => {
    return assignments.filter(
      (assignment) => assignment.status === 'completed'
    );
  }, [assignments]);

  // Filter actions
  const updateFilter = useCallback((filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  }, []);

  const updateSearchTerm = useCallback((searchTerm) => {
    setFilters((prev) => ({
      ...prev,
      searchTerm,
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  // Diet Plan actions
  const createDietPlan = useCallback(
    async (planData) => {
      setLoading(true);
      try {
        // Simulate API call
        const newPlan = {
          ...planData,
          id: `dp${String(dietPlans.length + 1).padStart(3, '0')}`,
          createdAt: new Date().toISOString(),
          isActive: true,
        };

        setDietPlans((prev) => [newPlan, ...prev]);
        setIsCreatePlanOpen(false);
        return newPlan;
      } catch (error) {
        console.error('Error creating diet plan:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [dietPlans.length]
  );

  const updateDietPlan = useCallback(async (planId, updates) => {
    setLoading(true);
    try {
      setDietPlans((prev) =>
        prev.map((plan) =>
          plan.id === planId ? { ...plan, ...updates } : plan
        )
      );
      return true;
    } catch (error) {
      console.error('Error updating diet plan:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDietPlan = useCallback(async (planId) => {
    setLoading(true);
    try {
      setDietPlans((prev) => prev.filter((plan) => plan.id !== planId));
      return true;
    } catch (error) {
      console.error('Error deleting diet plan:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Assignment actions
  const assignDietPlan = useCallback(
    async (assignmentData) => {
      setLoading(true);
      try {
        const newAssignment = {
          ...assignmentData,
          id: `assignment${String(assignments.length + 1).padStart(3, '0')}`,
          assignedDate: new Date().toISOString(),
          status: 'active',
          progress: {
            completedDays: 0,
            totalDays: assignmentData.duration || 30,
            adherence: 0,
            weightChange: 0,
            measurements: {},
          },
          lastUpdated: new Date().toISOString(),
        };

        setAssignments((prev) => [newAssignment, ...prev]);
        setIsAssignPlanOpen(false);
        return newAssignment;
      } catch (error) {
        console.error('Error assigning diet plan:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [assignments.length]
  );

  const updateAssignment = useCallback(async (assignmentId, updates) => {
    setLoading(true);
    try {
      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.id === assignmentId
            ? {
                ...assignment,
                ...updates,
                lastUpdated: new Date().toISOString(),
              }
            : assignment
        )
      );
      return true;
    } catch (error) {
      console.error('Error updating assignment:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProgress = useCallback(async (assignmentId, progressData) => {
    setLoading(true);
    try {
      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.id === assignmentId
            ? {
                ...assignment,
                progress: { ...assignment.progress, ...progressData },
                lastUpdated: new Date().toISOString(),
              }
            : assignment
        )
      );
      return true;
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelAssignment = useCallback(
    async (assignmentId) => {
      setLoading(true);
      try {
        await updateAssignment(assignmentId, { status: 'cancelled' });
        return true;
      } catch (error) {
        console.error('Error cancelling assignment:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [updateAssignment]
  );

  // Modal actions
  const openCreatePlan = useCallback(() => {
    setIsCreatePlanOpen(true);
  }, []);

  const closeCreatePlan = useCallback(() => {
    setIsCreatePlanOpen(false);
    setSelectedPlan(null);
  }, []);

  const openAssignPlan = useCallback((plan = null) => {
    setSelectedPlan(plan);
    setIsAssignPlanOpen(true);
  }, []);

  const closeAssignPlan = useCallback(() => {
    setIsAssignPlanOpen(false);
    setSelectedPlan(null);
  }, []);

  const openProgressModal = useCallback((assignment) => {
    setSelectedAssignment(assignment);
    setIsProgressModalOpen(true);
  }, []);

  const closeProgressModal = useCallback(() => {
    setIsProgressModalOpen(false);
    setSelectedAssignment(null);
  }, []);

  // Utility functions
  const getDietPlanById = useCallback(
    (planId) => {
      return dietPlans.find((plan) => plan.id === planId) || null;
    },
    [dietPlans]
  );

  const getMemberById = useCallback(
    (memberId) => {
      return members.find((member) => member.id === memberId) || null;
    },
    [members]
  );

  const getAssignmentsByMember = useCallback(
    (memberId) => {
      return assignments.filter(
        (assignment) => assignment.memberId === memberId
      );
    },
    [assignments]
  );

  const getAssignmentsByPlan = useCallback(
    (planId) => {
      return assignments.filter(
        (assignment) => assignment.dietPlanId === planId
      );
    },
    [assignments]
  );

  // Context value
  const contextValue = {
    // State
    dietPlans,
    assignments,
    members,
    filteredAssignments,
    activeAssignments,
    completedAssignments,
    filters,
    selectedPlan,
    selectedAssignment,
    isCreatePlanOpen,
    isAssignPlanOpen,
    isProgressModalOpen,
    loading,

    // Filter actions
    updateFilter,
    updateSearchTerm,
    clearAllFilters,

    // Diet plan actions
    createDietPlan,
    updateDietPlan,
    deleteDietPlan,

    // Assignment actions
    assignDietPlan,
    updateAssignment,
    updateProgress,
    cancelAssignment,

    // Modal actions
    openCreatePlan,
    closeCreatePlan,
    openAssignPlan,
    closeAssignPlan,
    openProgressModal,
    closeProgressModal,

    // Utility functions
    getDietPlanById,
    getMemberById,
    getAssignmentsByMember,
    getAssignmentsByPlan,
  };

  return (
    <DietPlanContext.Provider value={contextValue}>
      {children}
      <ProgressModal
        open={isProgressModalOpen}
        onClose={closeProgressModal}
        assignment={selectedAssignment}
      />
    </DietPlanContext.Provider>
  );
};

/**
 * Custom hook to use the Diet Plan Context
 */
export const useDietPlan = () => {
  const context = useContext(DietPlanContext);

  if (context === undefined) {
    throw new Error('useDietPlan must be used within a DietPlanProvider');
  }

  return context;
};

export default DietPlanContext;
