import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { noHeader } from '../../services/mainAPI/config';
import { Header1, Li, Logout, Login } from './styles';

const Header: React.FC = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await noHeader.get("/user/logout");

      if (response.status === 200) {
        console.log('Logout feito com sucesso');
        navigate ('/');
      }
       else {
        alert ('erro else')
      }
    } catch (error) {
      console.log('Erro na requisição:', error);
      alert ('erro catch')
    }
  };

  const handleAddProduct = () => {
    window.location.href = '/Cadastro-de-produto';
  };

  return (
    <Header1>
      <nav>
        <ul>
          <Li>
            <a href="/">
              Bookstore
            </a>
            <a href="/homeadm">
              Painel
            </a>
            <a href="/lista-de-usuarios">
              Usuários
            </a>
            <a href="/cadastroadm">
              Cadastrar novo adm
            </a>
            <button onClick={handleAddProduct}>
              Cadastrar Produto
            </button>
          </Li>
        </ul>
      </nav>
      <div>
          <Login onClick={() => navigate('/Login')}>
            Login
          </Login>
        </div>
        <div>
          <Logout onClick={handleLogout}>
            Logout
          </Logout>
        </div>
    </Header1>
  );
  }

export default Header;
