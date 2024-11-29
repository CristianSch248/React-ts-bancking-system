import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Definição da interface para depósitos
interface Deposit {
  id: string;
  valor: number;
  status: string;
  userId: string;
}

// Interface para as props do componente
interface AdminDashboardProps {
  logout: () => void; // Função de logout
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ logout }) => {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Função para buscar depósitos pendentes
  const fetchPendingDeposits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/deposits/pending');
      setDeposits(response.data);
    } catch (err: any) {
      console.error('Erro ao buscar depósitos pendentes:', err);
      setError('Erro ao carregar depósitos pendentes.');
    } finally {
      setLoading(false);
    }
  };

  // Função para aprovar um depósito
  const handleApprove = async (deposit: Deposit) => {
    setActionLoading(deposit.id);
    setError(null);
    try {
      const updatedDeposit = { ...deposit, status: 'Aprovado' };
      await axios.put('http://localhost:3000/deposits/approve', updatedDeposit);
      setDeposits((prev) => prev.filter((d) => d.id !== deposit.id));
    } catch (err: any) {
      console.error('Erro ao aprovar depósito:', err);
      setError('Erro ao aprovar depósito.');
    } finally {
      setActionLoading(null);
    }
  };

  // Função para rejeitar um depósito
  const handleReject = async (deposit: Deposit) => {
    setActionLoading(deposit.id);
    setError(null);
    try {
      const updatedDeposit = { ...deposit, status: 'Rejeitado' };
      await axios.put('http://localhost:3000/deposits/reject', updatedDeposit);
      setDeposits((prev) => prev.filter((d) => d.id !== deposit.id));
    } catch (err: any) {
      console.error('Erro ao rejeitar depósito:', err);
      setError('Erro ao rejeitar depósito.');
    } finally {
      setActionLoading(null);
    }
  };

  // Chamada inicial para buscar depósitos pendentes
  useEffect(() => {
    fetchPendingDeposits();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Admin Dashboard</h2>
      <button
        onClick={logout}
        style={{
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Carregando depósitos...</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
          }}
        >
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Usuário</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Valor</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => (
              <tr key={deposit.id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{deposit.id}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{deposit.userId}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{deposit.valor}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{deposit.status}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleApprove(deposit)}
                    disabled={actionLoading === deposit.id}
                    style={{
                      marginRight: '10px',
                      padding: '5px 10px',
                      backgroundColor: '#4CAF50',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                    }}
                  >
                    {actionLoading === deposit.id ? 'Processando...' : 'Aprovar'}
                  </button>
                  <button
                    onClick={() => handleReject(deposit)}
                    disabled={actionLoading === deposit.id}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#f44336',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                    }}
                  >
                    {actionLoading === deposit.id ? 'Processando...' : 'Rejeitar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
