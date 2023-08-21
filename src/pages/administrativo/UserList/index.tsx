import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { mainApiJson } from '../../../services/mainAPI/config';
import User from '../../../types/User';
import Modal from '../../../components/Modal';
import { H1, Search, Tabelas, Administradores, Clientes, Paginas, Paginas2 } from './styles';
import { Loading } from '../../../styles/loading';
import Swal from 'sweetalert2';

const UserList: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  const [clientUsers, setClientUsers] = useState<User[]>([]);
  const [currentAdminPage, setCurrentAdminPage] = useState<number>(1);
  const [currentClientPage, setCurrentClientPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const usersPerPage = 5;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showRoleColumn, setShowRoleColumn] = useState<boolean>(false);
  const [activeTable, setActiveTable] = useState<"admin" | "client" | "both">("admin");
  const navigate = useNavigate();

  const filterUsersByName = (users: User[], query: string) => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await mainApiJson.get('/admin/user');
        if (response.status === 200) {
          const data = response.data;
          const adminUsersData = data.filter((user: User) => user.role === 'admin');
          const clientUsersData = data.filter((user: User) => user.role === 'client');
          const filteredAdminUsers = filterUsersByName(adminUsersData, searchQuery);
          const filteredClientUsers = filterUsersByName(clientUsersData, searchQuery);
        
          setAdminUsers(filteredAdminUsers);
          setClientUsers(filteredClientUsers);
          setIsLoading(false);
        } else {
          
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro na requisição',
          text: 'Faça login como administrador',
          timer: 2000,
        });
        navigate('/login');
      }
    };

    fetchUsers();
  }, [searchQuery]);

  useEffect(() => {
    const handleWindowResize = () => {
      setShowRoleColumn(window.innerWidth >= 320 && window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleDeleteUser = (userId: string) => {
    Swal.fire({
      icon: 'question',
      title: 'Tem certeza que deseja excluir este usuário?',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userId);
      }
    });
  };

  const deleteUser = async (userId: string) => {
    try {
      await mainApiJson.delete(`/admin/user/${userId}`);
      setAdminUsers(adminUsers.filter((user) => user.id !== userId));
      Swal.fire({
        icon: 'success',
        title: 'Usuário excluído',
        text: 'O usuário foi excluído com sucesso.',
        timer: 2000,
      });
    } catch (error) {
      
      Swal.fire({
        icon: 'error',
        title: 'Erro na exclusão do usuário',
        text: 'Ocorreu um erro ao excluir o usuário. Por favor, tente novamente.',
        timer: 2000,
      });
    }
  };

  const indexOfLastAdminUser = currentAdminPage * usersPerPage;
  const indexOfFirstAdminUser = indexOfLastAdminUser - usersPerPage;
  const currentAdminUsers = adminUsers.slice(indexOfFirstAdminUser, indexOfLastAdminUser);

  const indexOfLastClientUser = currentClientPage * usersPerPage;
  const indexOfFirstClientUser = indexOfLastClientUser - usersPerPage;
  const currentClientUsers = clientUsers.slice(indexOfFirstClientUser, indexOfLastClientUser);

  const adminTotalPages = Math.ceil(adminUsers.length / usersPerPage);
  const clientTotalPages = Math.ceil(clientUsers.length / usersPerPage);

  const changeAdminPage = (page: number) => {
    setCurrentAdminPage(page);
  };

  const changeClientPage = (page: number) => {
    setCurrentClientPage(page);
  };

  const getPageNumbers = (totalPages: number, currentPage: number, onPageChange: (page: number) => void) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? 'current-page' : ''}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="page-numbers">
        {pageNumbers}
      </div>
    );
  };

  const toggleActiveTable = (table: "admin" | "client") => {
    setActiveTable(table);
  };

  return (
    <div>
      <Modal />
      {isLoading ? (
        <Loading>
          <BarLoader color="#000" loading={isLoading} />
        </Loading>  
      ) : (
        <>
          <H1>Lista de Usuários</H1>

          <Search>               
            <div className='trade'>
              <select value={activeTable} onChange={(e) => setActiveTable(e.target.value as "admin" | "client")}>
                <option value="both">Ambos</option>
                <option value="admin">Administradores</option>
                <option value="client">Clientes</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Pesquisar por nome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
          />
          </Search>

          <Tabelas
            isMobile={window.innerWidth >= 320 && window.innerWidth <= 768}
            showRoleColumn={true} 
          >

            {activeTable === "both" && (
              <>
               <div>
                  <Administradores>
                    <table>
                      <thead>
                        <h2>Administradores</h2>
                        <tr>
                          <th>Nome</th>
                          <th>Email</th>
                          {showRoleColumn && <th className='role'></th>}
                          <th className='actions'>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentAdminUsers.map((user) => (
                          <tr key={user.email}>
                            <td className="name">{user.name}</td>
                            <td className="email">{user.email}</td>
                            {showRoleColumn && <td className="role">{user.role}</td>}
                            <td>
                              <button onClick={() => handleDeleteUser(user.id)}>Excluir Usuário</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Administradores>
                  <Paginas>
                    {getPageNumbers(adminTotalPages, currentAdminPage, changeAdminPage)}
                  </Paginas>
                </div>
                <div>
                  <Clientes>
                    <table>
                      <thead>
                        <h2>Clientes</h2>
                        <tr>
                          <th>Nome</th>
                          <th>Email</th>
                          {showRoleColumn && <th className='role'></th>}
                        </tr>
                      </thead>
                      <tbody>
                        {currentClientUsers.map((user) => (
                          <tr key={user.email}>
                            <td className="name">{user.name}</td>
                            <td className="email">{user.email}</td>
                            {showRoleColumn && <td>{user.role}</td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Clientes>
                  <Paginas>
                    {getPageNumbers(clientTotalPages, currentClientPage, changeClientPage)}
                  </Paginas>
                </div>
              </>
            )}

            {activeTable === "admin" && (
              <>
                <Administradores>
                  <table>
                    <thead>
                      <h2>Administradores</h2>
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        {showRoleColumn && <th className='role'></th>}
                        <th className='actions'>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAdminUsers.map((user) => (
                        <tr key={user.email}>
                          <td className="name">{user.name}</td>
                          <td className="email">{user.email}</td>
                          {showRoleColumn && <td className="role">{user.role}</td>}
                          <td>
                            <button onClick={() => handleDeleteUser(user.id)}>Excluir Usuário</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Administradores>
              </>
            )}

            {activeTable === "client" && (
              <>
                <Clientes>
                  <table>
                    <thead>
                      <h2>Clientes</h2>
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        {showRoleColumn && <th className='role'></th>}
                      </tr>
                    </thead>
                    <tbody>
                      {currentClientUsers.map((user) => (
                        <tr key={user.email}>
                          <td className="name">{user.name}</td>
                          <td className="email">{user.email}</td>
                          {showRoleColumn && <td>{user.role}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Clientes>
              </>
            )}
          </Tabelas>
          <Paginas2>
            {activeTable === "admin" && (
              <div className='page-numbers'>
                {getPageNumbers(adminTotalPages, currentAdminPage, changeAdminPage)}
              </div>
            )}

            {activeTable === "client" && (
              <div className='page-numbers'>
                {getPageNumbers(clientTotalPages, currentClientPage, changeClientPage)}
              </div>
            )}
          </Paginas2>
        </>
      )}
    </div>
  );
};

export default UserList;
