import React, { Suspense } from 'react';
import { Container, CircularProgress, Box } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './components/Login';
import Navbar from './components/Navbar';

// Lazy load feature components
const Dashboard = React.lazy(() => import('./features/Dashboard'));
const MemberManagement = React.lazy(() =>
  import('./features/MemberManagement')
);
const TrainerManagement = React.lazy(() =>
  import('./features/TrainerManagement')
);
const EquipmentManagement = React.lazy(() =>
  import('./features/EquipmentManagement')
);
const WorkoutPlanManagement = React.lazy(() =>
  import('./features/WorkoutPlanManagement')
);
const MembershipManagement = React.lazy(() =>
  import('./features/MembershipManagement')
);
const MyProfile = React.lazy(() => import('./features/MyProfile'));
const RoleConfiguration = React.lazy(() =>
  import('./features/RoleConfiguration')
);

const Exercises = React.lazy(() => import('./features/Exercises'));
const DietPlanManagement = React.lazy(() =>
  import('./features/DietPlanManagement')
);

const Settings = React.lazy(() => import('./features/Settings'));

// Loading fallback component
const LoadingFallback = () => (
  <Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    minHeight='60vh'
  >
    <CircularProgress size={40} />
  </Box>
);

function AppRoutes() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/*'
            element={
              <>
                <Navbar />
                <Container maxWidth={false} sx={{ padding: 2 }}>
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path='/' element={<Dashboard />} />
                      <Route path='/members' element={<MemberManagement />} />
                      <Route path='/trainers' element={<TrainerManagement />} />
                      <Route
                        path='/equipment'
                        element={<EquipmentManagement />}
                      />
                      <Route
                        path='/workout-plans'
                        element={<WorkoutPlanManagement />}
                      />
                      <Route
                        path='/membership-packages'
                        element={<MembershipManagement />}
                      />
                      <Route path='/my-profile' element={<MyProfile />} />
                      <Route
                        path='/role-configuration'
                        element={<RoleConfiguration />}
                      />
                      <Route path='/settings' element={<Settings />} />
                      <Route path='/exercises' element={<Exercises />} />
                      <Route
                        path='/diet-plans'
                        element={<DietPlanManagement />}
                      />
                      <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>
                  </Suspense>
                </Container>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
