// src/components/Dashboard/Dashboard.tsx
import React from 'react';

interface DashboardProps {
  logout: () => void;
  navigateToAcquisitions: () => void; // Navegar para compras
  navigateToDeposits: () => void; // Navegar para depósitos
}

const Dashboard: React.FC<DashboardProps> = ({
  logout,
  navigateToAcquisitions,
  navigateToDeposits,
}) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Bem-vindo à Dashboard</h1>
      <p>Você está autenticado com sucesso!</p>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={navigateToAcquisitions}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Gerenciar Compras
        </button>
        <button
          onClick={navigateToDeposits}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28A745',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Gerenciar Depósitos
        </button>
        <button
          onClick={logout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#FF0000',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
