import React, { useEffect, useState } from 'react';
import { Service } from '../../services/service';
import './Acquisitions.css';

interface AcquisitionsProps {
  navigateToDashboard: () => void;
}

const Acquisitions: React.FC<AcquisitionsProps> = ({ navigateToDashboard }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [compras, setCompras] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchAcquisitions(storedUserId);
    } else {
      setError('Usuário não autenticado. Por favor, faça login.');
    }
  }, []);

  const handleCreateAcquisition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('Usuário não autenticado. Por favor, faça login.');
      return;
    }

    try {
      const response = await Service.createAcquisition(userId, { descricao, valor });
      setSuccessMessage(response.message);
      setDescricao('');
      setValor('');
      fetchAcquisitions(userId);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao cadastrar compra.');
    }
  };

  const fetchAcquisitions = async (userId: string) => {
    try {
      const acquisitions = await Service.getAcquisitions(userId);
      setCompras(acquisitions || []);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao buscar compras.');
    }
  };

  return (
    <div className="acquisitions-container">
      <h1 className="acquisitions-title">Gerenciamento de Compras</h1>

      <button className="acquisitions-back-button" onClick={navigateToDashboard}>
        Voltar à Dashboard
      </button>

      <div className="acquisitions-form-section">
        <h2>Cadastrar Nova Compra</h2>
        <form onSubmit={handleCreateAcquisition}>
          <div className="acquisitions-field">
            <label>Descrição:</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição"
              className="acquisitions-input"
            />
          </div>
          <div className="acquisitions-field">
            <label>Valor:</label>
            <input
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Digite o valor"
              className="acquisitions-input"
            />
          </div>
          <button type="submit" className="acquisitions-submit-button">
            Cadastrar Compra
          </button>
        </form>
        {successMessage && <p className="acquisitions-success">{successMessage}</p>}
        {error && <p className="acquisitions-error">{error}</p>}
      </div>

      <div className="acquisitions-list-section">
        <h2>Compras do Usuário</h2>
        {compras.length === 0 ? (
          <p className="acquisitions-empty">Nenhuma compra encontrada.</p>
        ) : (
          <ul className="acquisitions-list">
            {compras.map((compra, index) => (
              <li key={index} className="acquisitions-list-item">
                <strong>Descrição:</strong> {compra.descricao} <br />
                <strong>Valor:</strong> R$ {compra.valor}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Acquisitions;
