import React from 'react';
import { AttendanceProvider } from './context/AttendanceContext';
import AttendanceManagement from './components/AttendanceManagement';

const AttendanceTracking = () => {
  return (
    <AttendanceProvider>
      <AttendanceManagement />
    </AttendanceProvider>
  );
};

export default AttendanceTracking;
