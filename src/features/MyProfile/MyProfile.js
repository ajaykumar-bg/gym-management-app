import React from 'react';
import { Box, Typography } from '@mui/material';
import { useUser } from '../../context/UserContext';
import MemberProfile from '../MemberManagement/components/MemberProfile';
import { MOCK_MEMBERS } from '../MemberManagement/member.constants';

const MyProfile = () => {
  const { user } = useUser();

  // Find the current user's member profile
  // In a real app, this would come from an API call
  const memberProfile = MOCK_MEMBERS.find(
    (member) => member.email === user.email
  ) || {
    id: user.id,
    firstName: user.name.split(' ')[0] || user.name,
    lastName: user.name.split(' ')[1] || '',
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-01',
    address: '123 Main St, City, ST 12345',
    membershipType: 'basic',
    status: 'active',
    joinDate: '2024-01-01',
    emergencyContact: {
      name: 'Emergency Contact',
      phone: '+1 (555) 987-6543',
      relationship: 'Family',
    },
    physicalInfo: {
      height: 175,
      weight: 70,
    },
    healthInfo: {
      bloodGroup: 'Not specified',
      allergies: [],
      medicalConditions: [],
      medications: [],
    },
    fitnessGoals: 'General fitness and wellness',
    medicalConditions: 'None',
    preferredWorkoutTime: 'morning',
    hasPersonalTrainer: false,
    lastVisit: new Date().toISOString().split('T')[0],
    totalVisits: 45,
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        My Profile
      </Typography>

      <MemberProfile
        member={memberProfile}
        onBack={null} // Hide back button for member's own profile
        onEdit={null} // Members cannot edit their own profile through this view
        onDelete={null} // Members cannot delete their own profile
        isOwnProfile={true}
      />
    </Box>
  );
};

export default MyProfile;
