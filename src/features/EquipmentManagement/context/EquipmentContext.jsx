/**
 * Equipment Management Context
 * Centralized state management for Equipment Management feature
 */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { MOCK_EQUIPMENT } from '../equipment.constants';
import {
  filterEquipment,
  sortEquipment,
  validateEquipmentData,
  generateEquipmentId,
} from '../equipment.utils';

const EquipmentContext = createContext(undefined);

const INITIAL_FORM_DATA = {
  name: '',
  category: '',
  manufacturer: '',
  model: '',
  serialNumber: '',
  purchaseDate: '',
  purchasePrice: '',
  warrantyExpiry: '',
  status: 'operational',
  maintenanceSchedule: 'monthly',
  location: '',
  notes: '',
};

export const EquipmentProvider = ({ children }) => {
  // Core state
  const [equipment, setEquipment] = useState(MOCK_EQUIPMENT);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  // Filter and sort state
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  // Computed values
  const filteredAndSortedEquipment = useMemo(() => {
    const filtered = filterEquipment(equipment, {
      category: filterCategory,
      status: filterStatus,
    });
    return sortEquipment(filtered, orderBy, order);
  }, [equipment, filterCategory, filterStatus, orderBy, order]);

  const equipmentStats = useMemo(
    () => ({
      total: equipment.length,
      operational: equipment.filter((eq) => eq.status === 'operational').length,
      maintenance: equipment.filter((eq) => eq.status === 'maintenance').length,
      repair: equipment.filter((eq) => eq.status === 'repair').length,
      outOfOrder: equipment.filter((eq) => eq.status === 'out-of-order').length,
    }),
    [equipment]
  );

  // Form actions
  const openCreateForm = useCallback(() => {
    setSelectedEquipment(null);
    setFormData(INITIAL_FORM_DATA);
    setShowForm(true);
  }, []);

  const openEditForm = useCallback((equipmentItem) => {
    setSelectedEquipment(equipmentItem);
    setFormData({
      name: equipmentItem.name,
      category: equipmentItem.category,
      manufacturer: equipmentItem.manufacturer,
      model: equipmentItem.model,
      serialNumber: equipmentItem.serialNumber,
      purchaseDate: equipmentItem.purchaseDate,
      purchasePrice: equipmentItem.purchasePrice.toString(),
      warrantyExpiry: equipmentItem.warrantyExpiry,
      status: equipmentItem.status,
      maintenanceSchedule: equipmentItem.maintenanceSchedule,
      location: equipmentItem.location,
      notes: equipmentItem.notes || '',
    });
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setSelectedEquipment(null);
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const updateFormData = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Equipment CRUD operations
  const saveEquipment = useCallback(() => {
    if (!validateEquipmentData(formData)) {
      return false;
    }

    const equipmentData = {
      ...formData,
      id: selectedEquipment?.id || generateEquipmentId(),
      purchasePrice: parseFloat(formData.purchasePrice),
      addedDate:
        selectedEquipment?.addedDate || new Date().toISOString().split('T')[0],
      lastMaintenance: selectedEquipment?.lastMaintenance,
      nextMaintenance: selectedEquipment?.nextMaintenance,
    };

    if (selectedEquipment) {
      setEquipment((prev) =>
        prev.map((eq) => (eq.id === selectedEquipment.id ? equipmentData : eq))
      );
    } else {
      setEquipment((prev) => [...prev, equipmentData]);
    }

    closeForm();
    return true;
  }, [formData, selectedEquipment, closeForm]);

  const deleteEquipment = useCallback((equipmentId) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      setEquipment((prev) => prev.filter((eq) => eq.id !== equipmentId));
      return true;
    }
    return false;
  }, []);

  // Filter and sort actions
  const handleRequestSort = useCallback(
    (property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [orderBy, order]
  );

  const clearFilters = useCallback(() => {
    setFilterCategory('all');
    setFilterStatus('all');
    setOrderBy('name');
    setOrder('asc');
  }, []);

  const contextValue = {
    // State
    equipment: filteredAndSortedEquipment,
    selectedEquipment,
    showForm,
    formData,
    filterCategory,
    filterStatus,
    orderBy,
    order,
    equipmentStats,

    // Actions
    openCreateForm,
    openEditForm,
    closeForm,
    updateFormData,
    saveEquipment,
    deleteEquipment,

    // Filter actions
    setFilterCategory,
    setFilterStatus,
    handleRequestSort,
    clearFilters,
  };

  return (
    <EquipmentContext.Provider value={contextValue}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => {
  const context = useContext(EquipmentContext);

  if (context === undefined) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }

  return context;
};

export default EquipmentContext;
