/**
 * Member Management Context
 * Centralized state management for Member Management feature
 */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { MOCK_MEMBERS } from '../member.constants';
import {
  filterMembersByRole,
  validateMemberData,
  generateMemberId,
} from '../member.utils';

const MemberContext = createContext(undefined);

export const MemberProvider = ({ children }) => {
  // Core state
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [selectedMember, setSelectedMember] = useState(null);

  // UI state
  const [viewMode, setViewMode] = useState('list'); // 'list', 'profile', 'edit', 'add'
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
  const viewMember = useCallback((member) => {
    setSelectedMember(member);
    setViewMode('profile');
  }, []);

  const editMember = useCallback(
    (member, canManageMembers) => {
      if (!canManageMembers) {
        showSnackbar('You do not have permission to edit members', 'error');
        return;
      }
      setSelectedMember(member);
      setViewMode('edit');
    },
    [showSnackbar]
  );

  const addMember = useCallback(
    (canManageMembers) => {
      if (!canManageMembers) {
        showSnackbar('You do not have permission to add members', 'error');
        return;
      }
      setSelectedMember(null);
      setViewMode('add');
    },
    [showSnackbar]
  );

  const backToList = useCallback(() => {
    setSelectedMember(null);
    setViewMode('list');
  }, []);

  // Member CRUD operations
  const saveMember = useCallback(
    (memberData) => {
      if (!validateMemberData(memberData)) {
        showSnackbar('Please fill in all required fields', 'error');
        return false;
      }

      if (viewMode === 'edit') {
        // Update existing member
        setMembers((prev) =>
          prev.map((m) => (m.id === memberData.id ? memberData : m))
        );
        showSnackbar('Member updated successfully');
      } else {
        // Add new member
        const newMember = {
          ...memberData,
          id: memberData.id || generateMemberId(),
        };
        setMembers((prev) => [...prev, newMember]);
        showSnackbar('Member added successfully');
      }

      backToList();
      return true;
    },
    [viewMode, showSnackbar, backToList]
  );

  const deleteMember = useCallback(
    (memberId, isAdmin) => {
      if (!isAdmin) {
        showSnackbar('Only administrators can delete members', 'error');
        return false;
      }

      if (window.confirm('Are you sure you want to delete this member?')) {
        setMembers((prev) => prev.filter((m) => m.id !== memberId));
        showSnackbar('Member deleted successfully', 'success');
        return true;
      }
      return false;
    },
    [showSnackbar]
  );

  // Computed values
  const getFilteredMembers = useCallback(
    (user) => {
      return filterMembersByRole(members, user);
    },
    [members]
  );

  const memberStats = useMemo(
    () => ({
      total: members.length,
      active: members.filter((m) => m.membershipInfo.status === 'active')
        .length,
      inactive: members.filter((m) => m.membershipInfo.status === 'inactive')
        .length,
      suspended: members.filter((m) => m.membershipInfo.status === 'suspended')
        .length,
      expired: members.filter((m) => m.membershipInfo.status === 'expired')
        .length,
    }),
    [members]
  );

  const contextValue = {
    // State
    members,
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

    // Snackbar actions
    showSnackbar,
    hideSnackbar,

    // Utility functions
    getFilteredMembers,
  };

  return (
    <MemberContext.Provider value={contextValue}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => {
  const context = useContext(MemberContext);

  if (context === undefined) {
    throw new Error('useMember must be used within a MemberProvider');
  }

  return context;
};

export default MemberContext;
