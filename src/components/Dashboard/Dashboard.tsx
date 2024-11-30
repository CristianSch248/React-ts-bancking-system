import React from 'react';
import './Dashboard.css';

interface DashboardProps {
  logout: () => void;
  navigateToAcquisitions: () => void;
  navigateToDeposits: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  logout,
  navigateToAcquisitions,
  navigateToDeposits,
}) => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Bem-vindo à Dashboard</h1>
      <p className="dashboard-subtitle">Você está autenticado com sucesso!</p>
      <div className="dashboard-buttons">
        <button className="dashboard-button acquisitions-button" onClick={navigateToAcquisitions}>
          Gerenciar Compras
        </button>
        <button className="dashboard-button deposits-button" onClick={navigateToDeposits}>
          Gerenciar Depósitos
        </button>
        <button className="dashboard-button logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
