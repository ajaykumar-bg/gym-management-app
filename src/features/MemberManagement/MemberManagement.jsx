import React, { useState } from 'react';
import { Box, Snackbar, Alert, Typography } from '@mui/material';
import { useUser } from '../../context/UserContext';
import MemberList from './components/MemberList';
import MemberProfile from './components/MemberProfile';
import MemberForm from './components/MemberForm';
import { MOCK_MEMBERS } from './member.constants';

const MemberManagement = () => {
  const { user, permissions } = useUser();
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'profile', 'edit', 'add'
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Check permissions
  const canManageMembers = permissions.canManageMembers;
  const isAdmin = user.role === 'admin';
  const isTrainer = user.role === 'trainer';

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleViewMember = (member) => {
    setSelectedMember(member);
    setViewMode('profile');
  };

  const handleEditMember = (member) => {
    if (!canManageMembers) {
      showSnackbar('You do not have permission to edit members', 'error');
      return;
    }
    setSelectedMember(member);
    setViewMode('edit');
  };

  const handleAddMember = () => {
    if (!canManageMembers) {
      showSnackbar('You do not have permission to add members', 'error');
      return;
    }
    setSelectedMember(null);
    setViewMode('add');
  };

  const handleDeleteMember = (memberId) => {
    if (!isAdmin) {
      showSnackbar('Only administrators can delete members', 'error');
      return;
    }

    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter((m) => m.id !== memberId));
      showSnackbar('Member deleted successfully', 'success');
    }
  };

  const handleBackToList = () => {
    setSelectedMember(null);
    setViewMode('list');
  };

  // Filter members based on role
  const getFilteredMembers = () => {
    if (isAdmin) {
      return members; // Admin can see all members
    } else if (isTrainer) {
      // Trainer can only see their assigned members
      return members.filter((member) => member.trainerId === user.id);
    } else {
      // Members can only see their own profile (handled differently in member portal)
      return members.filter((member) => member.id === user.id);
    }
  };

  const filteredMembers = getFilteredMembers();

  if (!permissions.canViewDashboard) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant='h6' color='error'>
          Access Denied
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          You do not have permission to access member management.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {viewMode === 'list' && (
        <MemberList
          members={filteredMembers}
          onViewMember={handleViewMember}
          onEditMember={handleEditMember}
          onDeleteMember={handleDeleteMember}
          onAddMember={handleAddMember}
        />
      )}

      {viewMode === 'profile' && selectedMember && (
        <MemberProfile
          member={selectedMember}
          onEdit={handleEditMember}
          onClose={handleBackToList}
        />
      )}

      {/* Member Form for 'edit' and 'add' modes */}
      {(viewMode === 'edit' || viewMode === 'add') && (
        <MemberForm
          open={true}
          onClose={handleBackToList}
          member={viewMode === 'edit' ? selectedMember : null}
          onSave={(memberData) => {
            if (viewMode === 'edit') {
              // Update existing member
              setMembers(
                members.map((m) => (m.id === memberData.id ? memberData : m))
              );
              showSnackbar('Member updated successfully');
            } else {
              // Add new member
              setMembers([...members, memberData]);
              showSnackbar('Member added successfully');
            }
            handleBackToList();
          }}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MemberManagement;
