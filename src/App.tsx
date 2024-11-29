import React, { useState } from 'react';
import Acquisitions from './components/Acquisitions/Acquisitions';
import AdminDashboard from './components/AdminDashboard/AdminDashboard'; // Dashboard do administrador
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
      <h1>Gerenciamento de Usuários</h1>
      {currentScreen === 'login' && (
        <Login
          onLoginSuccess={navigateToDashboard}
          navigateToAdminDashboard={navigateToAdminDashboard} // Navegação para a dashboard do administrador
          navigateToCreateUser={navigateToCreateUser}
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
      {currentScreen === 'adminDashboard' && (
        <AdminDashboard logout={logout} /> // Dashboard do administrador
      )}
      {currentScreen === 'acquisitions' && (
        <Acquisitions navigateToDashboard={navigateToDashboard} />
      )}
      {currentScreen === 'deposits' && <Deposits navigateToDashboard={navigateToDashboard} />}
    </div>
  );
};

export default App;
