import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { noHeader } from '../../pages/Login/mainApi/config';
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
              <a href="/" className="text-white font-bold">
                Bookstore
              </a>
              <button className="text-white font-bold" onClick={() => navigate('/homeadm')}>
                Painel
              </button>
              <button className="text-white font-bold" onClick={() => navigate('/lista-de-usuarios')}>
                Usuários
              </button>
              <button className="text-white font-bold" onClick={() => navigate('/Cadastroadm')}>
                Cadastrar novo adm
              </button>
              <button className="text-white font-bold" onClick={handleAddProduct}>
                Cadastrar Produto
              </button>
            </Li>
        </ul>
      </nav>
      <div>
          <Login className="text-white font-bold" onClick={() => navigate('/Login')}>
            Login
          </Login>
        </div>
        <div>
          <Logout className="text-white font-bold" onClick={handleLogout}>
            Logout
          </Logout>
        </div>
    </Header1>
  );
  }

export default Header;
