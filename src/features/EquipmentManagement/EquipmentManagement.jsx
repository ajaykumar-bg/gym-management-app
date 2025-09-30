import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { EquipmentProvider, useEquipment } from './context';
import {
  EquipmentStats,
  EquipmentFilters,
  EquipmentTable,
  EquipmentFormDialog,
} from './components';

// Equipment Management Content Component (wrapped by provider)
const EquipmentManagementContent = () => {
  const {
    // State
    equipment,
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
  } = useEquipment();

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h4' component='h1'>
          Equipment Management
        </Typography>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={openCreateForm}
        >
          Add Equipment
        </Button>
      </Box>

      {/* Equipment Statistics */}
      <EquipmentStats stats={equipmentStats} />

      {/* Filters */}
      <EquipmentFilters
        filterCategory={filterCategory}
        filterStatus={filterStatus}
        onCategoryChange={setFilterCategory}
        onStatusChange={setFilterStatus}
      />

      {/* Equipment Table */}
      <EquipmentTable
        equipment={equipment}
        orderBy={orderBy}
        order={order}
        onRequestSort={handleRequestSort}
        onEdit={openEditForm}
        onDelete={deleteEquipment}
      />

      {/* Equipment Form Dialog */}
      <EquipmentFormDialog
        open={showForm}
        selectedEquipment={selectedEquipment}
        formData={formData}
        onClose={closeForm}
        onSave={saveEquipment}
        onFormDataChange={updateFormData}
      />
    </Box>
  );
};

// Main Equipment Management Component with Provider
const EquipmentManagement = () => {
  return (
    <EquipmentProvider>
      <EquipmentManagementContent />
    </EquipmentProvider>
  );
};

export default EquipmentManagement;
