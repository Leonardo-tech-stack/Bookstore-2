import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { noHeader } from '../../services/mainAPI/config';
import { Div, Li, Logout, Login, ArrowButton, ModalContent } from './styles';

ReactModal.setAppElement('#root');

const Modal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let back = '<'

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await noHeader.get("/user/logout");

      if (response.status === 200) {
        console.log('Logout feito com sucesso');
        navigate ('/');
      } else {
        alert ('erro else')
      }
    } catch (error) {
      console.log('Erro na requisição:', error);
      alert ('erro catch')
    }
  };

  return (
    <Div>
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
                  <Login onClick={() => navigate('/Login')}>
                    Login
                  </Login>
                </div>
                <div>
                  <Logout onClick={handleLogout}>
                    Logout
                  </Logout>
                </div>
              </Li>
            </ul>
          </nav>
        </ModalContent>
      </ReactModal>
    </Div>
  );
}

export default Modal;
