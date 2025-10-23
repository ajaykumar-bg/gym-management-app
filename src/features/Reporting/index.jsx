import React from 'react';
import { ReportingProvider } from './context/ReportingContext';
import ReportManagement from './components/ReportManagement';

const Reporting = () => {
  return (
    <ReportingProvider>
      <ReportManagement />
    </ReportingProvider>
  );
};

export default Reporting;
