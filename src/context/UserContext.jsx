import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // Mock user data - in real app this would come from authentication
  const [user, setUser] = useState({
    id: '1',
    name: 'Ajay Girija',
    email: 'ajay.girija@company.com',
    role: 'admin', // 'admin', 'trainer', or 'member'
  });

  // Define permissions based on role
  const permissions = {
    admin: {
      canViewDashboard: true,
      canViewMembers: true,
      canManageMembers: true,
      canViewTrainers: true,
      canManageTrainers: true,
      canViewEquipment: true,
      canManageEquipment: true,
      canViewPackages: true,
      canManagePackages: true,
      canManageClasses: true,
      canManageMemberships: true,
      canManagePayments: true,
      canAccessRoleConfiguration: true,
      canManageUsers: true,
      canViewAllReports: true,
      canViewAnalytics: true,
      canViewFinancials: true,
      canViewWorkouts: true,
      canManageWorkouts: true,
      canViewExercises: true,
      canCreateWorkoutTemplates: true,
    },
    trainer: {
      canViewDashboard: true,
      canViewMembers: true, // Can view assigned members
      canManageMembers: true, // Can manage basic info of assigned members
      canViewTrainers: true, // Can view other trainers
      canManageTrainers: false,
      canViewEquipment: true,
      canManageEquipment: true,
      canViewPackages: true, // Can view membership packages for member enrollment
      canManagePackages: false,
      canManageClasses: true,
      canManageMemberships: false,
      canManagePayments: false,
      canAccessRoleConfiguration: false,
      canManageUsers: false,
      canViewAllReports: false,
      canViewAnalytics: true,
      canViewFinancials: false,
      canViewWorkouts: true,
      canManageWorkouts: true,
      canViewExercises: true,
      canCreateWorkoutTemplates: true,
    },
    member: {
      canViewDashboard: true,
      canViewMembers: false, // Can only view their own profile
      canManageMembers: false,
      canViewTrainers: true, // Can view trainer profiles for selection
      canManageTrainers: false,
      canViewEquipment: false, // Can only view equipment availability
      canManageEquipment: false, // Can only view equipment availability
      canViewPackages: true, // Can view available membership packages
      canManagePackages: false,
      canManageClasses: false, // Can only book/view classes
      canManageMemberships: false, // Can only view their own membership
      canManagePayments: false, // Can only view their own payment history
      canAccessRoleConfiguration: false,
      canManageUsers: false,
      canViewAllReports: false,
      canViewAnalytics: false,
      canViewFinancials: false,
      canViewWorkouts: true,
      canManageWorkouts: true,
      canViewExercises: true,
      canCreateWorkoutTemplates: false,
    },
  };

  const userPermissions = permissions[user.role] || permissions.member;

  const switchRole = (newRole) => {
    setUser((prev) => ({ ...prev, role: newRole }));
  };

  const value = {
    user,
    permissions: userPermissions,
    switchRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
