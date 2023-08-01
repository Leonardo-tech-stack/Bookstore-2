import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainApiJson, noHeader } from '../../services/mainAPI/config';
import User from '../../types/User';
import { Flex, Form, Title, Div, Alternate } from './styles';
import Swal from 'sweetalert2';

const UserPage: React.FC = () => {
  const [userData, setUserData] = useState<User>({
    id: '',
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await noHeader.get('/client/user');
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao obter os dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await mainApiJson.put('/client/user', userData);
      Swal.fire({
        icon: 'success',
        text: 'Dados atualizados com sucesso!',
        timer: 2000,
      });
    } catch (error: any) {
      console.error('Erro ao atualizar os dados do usuário:', error);
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'info',
          text: 'Faça login para continuar.',
          timer: 2000,
        }).then(() => {
          navigate('/login');
        });
      }
    }
  };

  const handleDeleteConfirmation = () => {
    setConfirmDelete(true);
    setShowUpdateButton(false); 
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(false);
    setShowUpdateButton(true); 
  };

  const handleDeleteUser = async () => {
    try {
      await noHeader.delete('/client/user');
      Swal.fire({
        icon: 'info',
        text: 'Cadastro excluído',
        timer: 2000,
      }).then(() => {
        navigate('/login');
      });
    } catch (error: any) {
      console.error('Erro ao excluir o usuário:', error);
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'info',
          text: 'Faça login para continuar.',
          timer: 2000,
        }).then(() => {
          navigate('/login');
        });
      }
    }
  };

  return (
    <div>
      <Flex>
        <Div>
          <Form onSubmit={handleFormSubmit}>
            <Title>Meus dados</Title>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </div>
            <Alternate>
              <div className="button">
                {showUpdateButton && (
                  <button className="update" type="submit">Atualizar Dados</button>
                )}

                {confirmDelete ? (
                  <div>
                    <p>Tem certeza de que deseja excluir o cadastro?</p>
                    <Alternate>
                      <button onClick={handleDeleteUser}>Sim</button>
                      <button onClick={handleDeleteCancel}>Não</button>
                    </Alternate>
                  </div>
                ) : (
                  <button className="delete" onClick={handleDeleteConfirmation}>Excluir Cadastro</button>
                )}
              </div>
            </Alternate>
          </Form>
        </Div>
      </Flex>
    </div>
  );
};

export default UserPage;
