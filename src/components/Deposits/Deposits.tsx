import React, { useState } from 'react';
import { Service } from '../../services/service';
import './Deposits.css';

interface DepositsProps {
  navigateToDashboard: () => void;
}

const Deposits: React.FC<DepositsProps> = ({ navigateToDashboard }) => {
  const [valor, setValor] = useState('');
  const [status] = useState('Pendente');
  const [userId] = useState<string | null>(sessionStorage.getItem('userId'));
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreateDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('Usuário não autenticado. Por favor, faça login.');
      return;
    }

    try {
      const createDepositDto = {
        valor: parseFloat(valor),
        status,
        userId,
      };
      const response = await Service.createDeposit(createDepositDto);

      setSuccessMessage('Depósito cadastrado com sucesso!');
      setValor('');
      setError(null);
      console.log('Depósito criado:', response);
    } catch (err: any) {
      console.error('Erro ao criar depósito:', err);
      setError(err.response?.data?.message || 'Erro ao cadastrar depósito.');
    }
  };

  return (
    <div className="deposits-container">
      <h1 className="deposits-title">Cadastro de Depósitos</h1>

      <button className="deposits-back-button" onClick={navigateToDashboard}>
        Voltar à Dashboard
      </button>

      <form className="deposits-form" onSubmit={handleCreateDeposit}>
        <div className="deposits-field">
          <label className="deposits-label">Valor:</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Digite o valor"
            className="deposits-input"
          />
        </div>
        <button type="submit" className="deposits-submit-button">
          Cadastrar Depósito
        </button>
      </form>

      {successMessage && <p className="deposits-success">{successMessage}</p>}
      {error && <p className="deposits-error">{error}</p>}
    </div>
  );
};

export default Deposits;
