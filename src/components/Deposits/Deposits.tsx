import axios from 'axios';
import React, { useState } from 'react';

interface DepositsProps {
  navigateToDashboard: () => void;
}

const Deposits: React.FC<DepositsProps> = ({ navigateToDashboard }) => {
  const [valor, setValor] = useState('');
  const [status ] = useState('Pendente');
  const [userId ] = useState<string | null>(sessionStorage.getItem('userId'));
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreateDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('Usuário não autenticado. Por favor, faça login.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/deposits', {
        valor: parseFloat(valor),
        status,
        userId,
      });

      setSuccessMessage('Depósito cadastrado com sucesso!');
      setValor('');
      setError(null);
      console.log('Depósito criado:', response.data);
    } catch (err: any) {
      console.error('Erro ao criar depósito:', err);
      setError(err.response?.data?.message || 'Erro ao cadastrar depósito.' + err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Cadastro de Depósitos</h1>

      {/* Botão para voltar à Dashboard */}
      <button
        onClick={navigateToDashboard}
        style={{
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Voltar à Dashboard
      </button>

      {/* Formulário para cadastro de depósito */}
      <form onSubmit={handleCreateDeposit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Valor:</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Digite o valor"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Cadastrar Depósito
        </button>
      </form>

      {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default Deposits;
