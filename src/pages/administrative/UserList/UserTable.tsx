import React from 'react';
import User from '../../../types/User';

interface UserTableProps {
  title: string;
  users: User[];
  showRoleColumn: boolean;
  handleDeleteUser: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  title,
  users,
  showRoleColumn,
  handleDeleteUser,
}) => (
  <div className='flex'>
    <div>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            {showRoleColumn && <th className='role'></th>}
            <th className='actions'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
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
    </div>
  </div>
);

export default UserTable;
