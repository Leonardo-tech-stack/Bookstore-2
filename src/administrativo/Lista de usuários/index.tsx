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
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  const [clientUsers, setClientUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await mainApiJson.get('/user');
        if (response.status === 200) {
          const data = response.data;
          const adminUsersData = data.filter((user: User) => user.role === 'admin');
          const clientUsersData = data.filter((user: User) => user.role === 'client');
          setAdminUsers(adminUsersData);
          setClientUsers(clientUsersData);
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
      <h2>Administradores</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {adminUsers.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clientUsers.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
