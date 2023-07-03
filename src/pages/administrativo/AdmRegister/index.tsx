import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { mainApiJson } from '../../../services/mainAPI/config';
import Adm from '../../../assets/images/adm.png'
import { Flex, Div, Title, Form } from './styles';
import Modal from '../../../components/Modal';

const AdminRegistrationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const data = {
      name,
      email,
      password,
    };
  
    try {
      const response = await mainApiJson.post('/admin', data);
  
      if (response.status === 201) {
        alert('Administrador cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar administrador!');
      }
    } catch (error: any) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert('Faça login como administrador');
      } else {
        console.error('Erro de conexão', error);
      }
    }
  };  

  return (
    <div>
      <Modal />
      <Flex>
        <div>
          <img src={Adm} ></img>
        </div>
        <Div>
          <Form onSubmit={handleSubmit}>
            <Title>Cadastro de Administrador</Title>
            <div>
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" placeholder="nome" required={true} onChange={handleNameChange} />
            </div>
            <div>
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" placeholder="e-mail" required={true} onChange={handleEmailChange} />
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" placeholder="senha" required={true} onChange={handlePasswordChange} />
            </div>
            <button type="submit">Cadastrar</button>
          </Form>
        </Div>
      </Flex>
    </div>
  );
};

export default AdminRegistrationPage;
