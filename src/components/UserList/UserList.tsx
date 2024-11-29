import React, { useEffect, useState } from 'react';
import { userService } from '../../services/userService';

interface User {
  id: string;
  username: string;
  balance: number;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers();
        setUsers(data);
      } catch (err) {
        setError('Erro ao buscar usuários.');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - Saldo: {user.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
