import React, { useState, useEffect } from "react";
import { getUserData, updateUserData } from "./endpoint";

const UserPage = () => {
  const [userData, setUserData] = useState<{ name: string, email: string } | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtém os dados do usuário
        const email = "email_do_usuario"; // Substitua pelo email do usuário logado
        const response = await getUserData(email);
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao obter os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateUserData = async () => {
    try {
      // Atualiza os dados do usuário
      const email = "email_do_usuario"; // Substitua pelo email do usuário logado
      const data = { name, password };
      await updateUserData(email, data);
      console.log("Dados do usuário atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
    }
  };

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Dados do Usuário</h1>
      <div>
        <label>Nome:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={userData.email} disabled />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleUpdateUserData}>Atualizar</button>
    </div>
  );
};

export default UserPage;
