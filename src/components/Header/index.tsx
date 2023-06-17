import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header1, Li, Logout, Login } from './styles';

type HeaderProps = {
  open: boolean;
  // setOpen: (open: boolean) => void;
  userLoggedIn: boolean;
};
const Header: React.FC = () => {
// const Header: React.FC<HeaderProps> = ({ userLoggedIn }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('https://api-ecommerce-livraria.onrender.com/user/logout', {
        method: 'GET',
      });

      if (response.ok) {
        // alert('Fez logout');
        navigate ('/');
      }
       else {
        const errorData = await response.json();
        console.log('Erro ao fazer logout:', errorData.message);
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
