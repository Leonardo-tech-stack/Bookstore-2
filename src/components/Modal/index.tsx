import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { noHeader } from '../../services/mainAPI/config';
import ReactModal from 'react-modal';
import { Li, Logout, Login, ArrowButton, ModalContent } from './styles';

ReactModal.setAppElement('#root');

const Modal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  let back = '<';

  useEffect(() => {
    if (isLoggedOut) {
      navigate('/login');
    }
  }, [isLoggedOut, navigate]);

  const logout = async () => {
    try {
      await noHeader.get('/user/logout');
      setIsLoggedOut(true);
    
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('Ocorreu um erro ao fazer logout');
    }
  };      

  return (
    <div>
      <ArrowButton
        className="arrow-button"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        {isModalOpen ? '' : 'Painel administrativo >>>'}
      </ArrowButton>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content"
        closeTimeoutMS={200}
      >
        <ModalContent isOpen={isModalOpen}>
          <button className="back" onClick={() => setIsModalOpen(false)}>
            {back}
          </button>
          <nav>
            <ul>
              <Li>
                <Link to="/">ChapterOne</Link>
                <Link to="/homeadm">Produtos</Link>
                <Link to="/lista-de-pedidos">Pedidos</Link>
                <Link to="/lista-de-usuarios">Usuários</Link>
                <Link to="/cadastroadm">Cadastrar novo adm</Link>
                <Link to="/cadastro-de-produto">Cadastrar Produto</Link>
                <div>
                  <Login onClick={() => navigate('/login')}>
                    Login
                  </Login>
                </div>
                {/* <div>
                  <Logout onClick={logout}>Sair</Logout>
                </div> */}
              </Li>
            </ul>
          </nav>
        </ModalContent>
      </ReactModal>
    </div>
  );
};

export default Modal;
