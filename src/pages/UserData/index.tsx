import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { noHeader } from '../../services/mainAPI/config';
import Header from '../../components/Header';

interface User {
  name: string;
  password: string;
  email: string;
}

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await noHeader.get('/user/{email}', {
          headers: {
            Authorization: `Bearer ${getTokenFromCookies()}`,
          },
        });
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUser();
  }, []);

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('token=')) {
        return cookie.substring('token='.length);
      }
    }
    return '';
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div>
        <h1>Sua conta - aguardando API...</h1>
        <p>Nome: {user.name}</p>
        <p>Senha: {user.password}</p>
        <p>E-mail: {user.email}</p>
      </div>
    </div>
  );
};

export default UserPage;
