import React, { useState } from 'react';
import Acquisitions from './components/Acquisitions/Acquisitions';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CreateUser from './components/CreateUser/CreateUser';
import Dashboard from './components/Dashboard/Dashboard';
import Deposits from './components/Deposits/Deposits';
import Login from './components/Login/Login';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<
    'login' | 'createUser' | 'dashboard' | 'adminDashboard' | 'acquisitions' | 'deposits'
  >('login');

  const navigateToCreateUser = () => setCurrentScreen('createUser');
  const navigateToLogin = () => setCurrentScreen('login');
  const navigateToDashboard = () => setCurrentScreen('dashboard');
  const navigateToAdminDashboard = () => setCurrentScreen('adminDashboard');
  const navigateToAcquisitions = () => setCurrentScreen('acquisitions');
  const navigateToDeposits = () => setCurrentScreen('deposits');
  const logout = () => setCurrentScreen('login');

  return (
    <div>
      <h1>Banking System</h1>
      {currentScreen === 'login' && (
        <Login
          onLoginSuccess={navigateToDashboard}
          navigateToAdminDashboard={navigateToAdminDashboard}
          navigateToCreateUser={navigateToCreateUser}
          navigateToDashboard={navigateToDashboard}
        />
      )}
      {currentScreen === 'createUser' && <CreateUser navigateToLogin={navigateToLogin} />}
      {currentScreen === 'dashboard' && (
        <Dashboard
          logout={logout}
          navigateToAcquisitions={navigateToAcquisitions}
          navigateToDeposits={navigateToDeposits}
        />
      )}
      {currentScreen === 'adminDashboard' && <AdminDashboard logout={logout} />}
      {currentScreen === 'acquisitions' && (
        <Acquisitions navigateToDashboard={navigateToDashboard} />
      )}
      {currentScreen === 'deposits' && <Deposits navigateToDashboard={navigateToDashboard} />}
    </div>
  );
};

export default App;
