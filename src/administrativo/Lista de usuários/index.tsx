import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';

type User = {
  name: string;
  email: string;
//   role
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api-ecommerce-livraria.onrender.com/user');
        if (response.ok) {
          const data = await response.json();
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
     {/* <Header userLoggedIn={true} /> */}

      <h1>Lista de Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            <strong>Nome:</strong> {user.name}, <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;