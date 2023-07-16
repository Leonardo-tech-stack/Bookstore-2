import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      alert('sucesso')
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      alert('catch')
    }
  };

  return (
    <div>
      <ArrowButton
        // isOpen={isModalOpen}
        className="arrow-button"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        {isModalOpen ? '' : 'Painel administrativo >>>'}
      </ArrowButton>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content"
        // overlayClassName="modal-overlay"
        closeTimeoutMS={200}
      >
        <ModalContent isOpen={isModalOpen}>
          <button className="back" onClick={() => setIsModalOpen(false)}>
            {back}
          </button>
          <nav>
            <ul>
              <Li>
                <a href="/">ChapterOne</a>
                <a href="/homeadm">Produtos</a>
                <a href="/lista-de-usuarios">Usuários</a>
                <a href="/cadastroadm">Cadastrar novo adm</a>
                <a href="/cadastro-de-produto">Cadastrar Produto</a>
                <div>
                  <Login onClick={() => navigate('/login')}>
                    Login
                  </Login>
                </div>
                <div>
                  <Logout onClick={logout}>Sair</Logout>
                </div>
              </Li>
            </ul>
          </nav>
        </ModalContent>
      </ReactModal>
    </div>
  );
};

export default Modal;
