import React, { useEffect, useState } from 'react';
import { Service } from '../../services/service';
import './AdminDashboard.css';

interface Deposit {
  id: string;
  valor: number;
  status: string;
  userId: string;
}

interface AdminDashboardProps {
  logout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ logout }) => {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPendingDeposits = async () => {
    setLoading(true);
    setError(null);
    try {
      const deposits = await Service.fetchPendingDeposits();
      setDeposits(deposits);
    } catch (err: any) {
      console.error('Erro ao buscar depósitos pendentes:', err);
      setError('Erro ao carregar depósitos pendentes.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (deposit: Deposit) => {
    setActionLoading(deposit.id);
    setError(null);
    try {
      await Service.approveDeposit(deposit);
      setDeposits((prev) => prev.filter((d) => d.id !== deposit.id));
    } catch (err: any) {
      console.error('Erro ao aprovar depósito:', err);
      setError('Erro ao aprovar depósito.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (deposit: Deposit) => {
    setActionLoading(deposit.id);
    setError(null);
    try {
      await Service.rejectDeposit(deposit);
      setDeposits((prev) => prev.filter((d) => d.id !== deposit.id));
    } catch (err: any) {
      console.error('Erro ao rejeitar depósito:', err);
      setError('Erro ao rejeitar depósito.');
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchPendingDeposits();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>
      <button className="admin-dashboard-logout" onClick={logout}>
        Logout
      </button>

      {error && <p className="admin-dashboard-error">{error}</p>}

      {loading ? (
        <p className="admin-dashboard-loading">Carregando depósitos...</p>
      ) : (
        <table className="admin-dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuário</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => (
              <tr key={deposit.id}>
                <td>{deposit.id}</td>
                <td>{deposit.userId}</td>
                <td>{deposit.valor}</td>
                <td>{deposit.status}</td>
                <td>
                  <button
                    className="admin-dashboard-button approve"
                    onClick={() => handleApprove(deposit)}
                    disabled={actionLoading === deposit.id}
                  >
                    {actionLoading === deposit.id ? 'Processando...' : 'Aprovar'}
                  </button>
                  <button
                    className="admin-dashboard-button reject"
                    onClick={() => handleReject(deposit)}
                    disabled={actionLoading === deposit.id}
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
