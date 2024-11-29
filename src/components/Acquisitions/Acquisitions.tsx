import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface AcquisitionsProps {
  navigateToDashboard: () => void; // Função para voltar à Dashboard
}

const Acquisitions: React.FC<AcquisitionsProps> = ({ navigateToDashboard }) => {
  const [descricao, setDescricao] = useState(''); // Descrição da compra
  const [valor, setValor] = useState(''); // Valor da compra
  const [compras, setCompras] = useState<any[]>([]); // Lista de compras
  const [error, setError] = useState<string | null>(null); // Erros
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Mensagem de sucesso
  const [userId, setUserId] = useState<string | null>(null); // ID do usuário (obtido da sessão)

  // Obtém o ID do usuário da sessão no momento do carregamento do componente
  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchAcquisitions(storedUserId); // Buscar compras automaticamente
    } else {
      setError('Usuário não autenticado. Por favor, faça login.');
    }
  }, []);

  // Função para cadastrar uma nova compra
  const handleCreateAcquisition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('Usuário não autenticado. Por favor, faça login.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/acquisitions/${userId}`, {
        descricao,
        valor,
      });
      setSuccessMessage(response.data.message);
      setDescricao('');
      setValor('');
      fetchAcquisitions(userId); // Atualizar a lista de compras após cadastro
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao cadastrar compra.');
    }
  };

  // Função para buscar todas as compras do usuário
  const fetchAcquisitions = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/acquisitions/${userId}`);
      setCompras(response.data.compras || []);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Erro ao buscar compras.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Gerenciamento de Compras</h1>

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

      {/* Sessão de Cadastro */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Cadastrar Nova Compra</h2>
        <form onSubmit={handleCreateAcquisition}>
          <div style={{ marginBottom: '10px' }}>
            <label>Descrição:</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Valor:</label>
            <input
              type="text"
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
            Cadastrar Compra
          </button>
        </form>
        {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>

      {/* Sessão de Listagem */}
      <div>
        <h2>Compras do Usuário</h2>
        {compras.length === 0 ? (
          <p>Nenhuma compra encontrada.</p>
        ) : (
          <ul>
            {compras.map((compra, index) => (
              <li key={index}>
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
