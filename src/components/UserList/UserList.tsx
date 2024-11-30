import React, { useEffect, useState } from 'react';
import { Service } from '../../services/service';

interface User {
  id: string;
  username: string;
  balance: number;
}

const UserList: React.FC = React.memo(() => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await Service.getUsers();
        setUsers(data);
      } catch (err) {
        setError('Erro ao buscar usuários.');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const UserItem: React.FC<User> = React.memo(({ id, username, balance }) => (
    <li key={id}>
      {username} - Saldo: {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
    </li>
  ));

  return (
    <div className="user-list-container">
      <h1 className="user-list-title">Lista de Usuários</h1>
      {error && <p className="user-list-error">{error}</p>}
      <ul className="user-list">
        {users.map((user) => (
          <UserItem key={user.id} {...user} />
        ))}
      </ul>
    </div>
  );
});

export default UserList;
