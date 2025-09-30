/**
 * Trainer Management Context
 * Centralized state management for Trainer Management feature
 */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { MOCK_TRAINERS } from '../trainer.constants';
import {
  filterTrainersByRole,
  validateTrainerData,
  generateTrainerId,
} from '../trainer.utils';

const TrainerContext = createContext(undefined);

export const TrainerProvider = ({ children }) => {
  // Core state
  const [trainers, setTrainers] = useState(MOCK_TRAINERS);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  // UI state
  const [view, setView] = useState('list'); // 'list', 'profile'
  const [showForm, setShowForm] = useState(false);
  const [formTrainer, setFormTrainer] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Snackbar actions
  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  // Navigation actions
  const viewTrainer = useCallback((trainer) => {
    setSelectedTrainer(trainer);
    setView('profile');
  }, []);

  const backToList = useCallback(() => {
    setSelectedTrainer(null);
    setView('list');
  }, []);

  const openAddForm = useCallback(() => {
    setFormTrainer(null);
    setShowForm(true);
  }, []);

  const openEditForm = useCallback((trainer) => {
    setFormTrainer(trainer);
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setFormTrainer(null);
  }, []);

  // Trainer CRUD operations
  const saveTrainer = useCallback(
    (trainerData) => {
      if (!validateTrainerData(trainerData)) {
        showSnackbar('Please fill in all required fields', 'error');
        return false;
      }

      if (formTrainer) {
        // Edit existing trainer
        setTrainers((prev) =>
          prev.map((trainer) =>
            trainer.id === trainerData.id ? trainerData : trainer
          )
        );
        showSnackbar('Trainer updated successfully');
      } else {
        // Add new trainer
        const newTrainer = {
          ...trainerData,
          id: trainerData.id || generateTrainerId(),
        };
        setTrainers((prev) => [...prev, newTrainer]);
        showSnackbar('Trainer added successfully');
      }

      closeForm();
      return true;
    },
    [formTrainer, showSnackbar, closeForm]
  );

  const deleteTrainer = useCallback(
    (trainerId) => {
      if (window.confirm('Are you sure you want to delete this trainer?')) {
        setTrainers((prev) =>
          prev.filter((trainer) => trainer.id !== trainerId)
        );
        showSnackbar('Trainer deleted successfully');

        // If the deleted trainer was selected, go back to list
        if (selectedTrainer?.id === trainerId) {
          backToList();
        }
        return true;
      }
      return false;
    },
    [selectedTrainer, showSnackbar, backToList]
  );

  // Computed values
  const getFilteredTrainers = useCallback(
    (user) => {
      return filterTrainersByRole(trainers, user);
    },
    [trainers]
  );

  const trainerStats = useMemo(
    () => ({
      total: trainers.length,
      active: trainers.filter((t) => t.status === 'active').length,
      inactive: trainers.filter((t) => t.status === 'inactive').length,
      onLeave: trainers.filter((t) => t.status === 'on-leave').length,
      totalCapacity: trainers.reduce((sum, t) => sum + (t.maxClients || 0), 0),
      currentLoad: trainers.reduce(
        (sum, t) => sum + (t.currentClients || 0),
        0
      ),
    }),
    [trainers]
  );

  const contextValue = {
    // State
    trainers,
    selectedTrainer,
    view,
    showForm,
    formTrainer,
    snackbar,
    trainerStats,

    // Actions
    viewTrainer,
    backToList,
    openAddForm,
    openEditForm,
    closeForm,
    saveTrainer,
    deleteTrainer,

    // Snackbar actions
    showSnackbar,
    hideSnackbar,

    // Utility functions
    getFilteredTrainers,
  };

  return (
    <TrainerContext.Provider value={contextValue}>
      {children}
    </TrainerContext.Provider>
  );
};

export const useTrainer = () => {
  const context = useContext(TrainerContext);

  if (context === undefined) {
    throw new Error('useTrainer must be used within a TrainerProvider');
  }

  return context;
};

export default TrainerContext;
