import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { mainApiJson } from '../../pages/Login/mainApi/config';

type User = {
  name: string;
  email: string;
  role: string;
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await mainApiJson.get('/user');
        if (response.status === 200) {
          const data = response.data;
          setUsers(data);
        } else {
          console.log('Erro ao obter a lista de usuários');
        }
      } catch (error) {
        console.log('Erro na requisição:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Header />

      <h1>Lista de Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            <strong>Nome:</strong> {user.name}, <strong>Email:</strong> {user.email}, <strong>Role:</strong> {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
