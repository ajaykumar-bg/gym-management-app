import React from 'react';
import { Box } from '@mui/material';
import { useUser } from '../../context/UserContext';
import { MemberProvider, useMember } from './context';
import {
  MemberStats,
  MemberViewRouter,
  PermissionGuard,
  NotificationSnackbar,
} from './components';

// Member Management Content Component (wrapped by provider)
const MemberManagementContent = () => {
  const { user, permissions } = useUser();
  const {
    // State
    selectedMember,
    viewMode,
    snackbar,
    memberStats,

    // Actions
    viewMember,
    editMember,
    addMember,
    backToList,
    saveMember,
    deleteMember,
    hideSnackbar,

    // Utility functions
    getFilteredMembers,
  } = useMember();

  const filteredMembers = getFilteredMembers(user);

  return (
    <PermissionGuard permissions={permissions}>
      <Box sx={{ p: 3 }}>
        {/* Member Statistics - Show only for list view */}
        {viewMode === 'list' && <MemberStats stats={memberStats} />}

        {/* View Router */}
        <MemberViewRouter
          viewMode={viewMode}
          selectedMember={selectedMember}
          filteredMembers={filteredMembers}
          user={user}
          permissions={permissions}
          onViewMember={viewMember}
          onEditMember={editMember}
          onDeleteMember={deleteMember}
          onAddMember={addMember}
          onBackToList={backToList}
          onSaveMember={saveMember}
        />

        {/* Notification Snackbar */}
        <NotificationSnackbar snackbar={snackbar} onClose={hideSnackbar} />
      </Box>
    </PermissionGuard>
  );
};

// Main Member Management Component with Provider
const MemberManagement = () => {
  return (
    <MemberProvider>
      <MemberManagementContent />
    </MemberProvider>
  );
};

export default MemberManagement;
