import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainApiJson } from '../../../services/mainAPI/config';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Adm from '../../../assets/images/adm.png'
import { Flex, Div, Title, Form } from './styles';
import Modal from '../../../components/Modal';
import Swal from 'sweetalert2';

const AdminRegistrationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      const response = await mainApiJson.post('/admin/register', data);
    
      if (response.status === 201) {
        toastr.success('Administrador cadastrado com sucesso!', '', {
          timeOut: 2000,
          onHidden: () => {
            window.location.reload();
          }
        });
      } else {
        toastr.error('Erro ao cadastrar administrador!', '', {
          timeOut: 2000,
        });
      }
    } catch (error: any) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        Swal.fire({
          icon: 'error',
          title: 'Erro na requisição',
          text: 'Faça login como administrador',
          timer: 2000,
        });
        navigate('/login');
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
          <img src={Adm} />
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
            <div className='button'>
              <button type="submit">Cadastrar</button>
            </div>
          </Form>
        </Div>
      </Flex>
    </div>
  );
};

export default AdminRegistrationPage;
