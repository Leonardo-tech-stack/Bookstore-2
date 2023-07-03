import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { mainApiJson } from "../../services/mainAPI/config";
import { Body, Main } from '../Login/styles';
import { Form, Cadastrar } from "./styles";

export default function CadastroCliente() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  async function criarCadastro(e: FormEvent) {
    try {
      e.preventDefault();
      const res = await mainApiJson.post("/user", {
        name,
        email,
        password,
      });
      if (res.status === 201) {
        alert("Usuário cadastrado");
      }
    } catch (error: any | AxiosError) {
      alert(error.response.data);
    }
  }

  return (
    <Body>
      <Main>
        <Form onSubmit={(e) => criarCadastro(e)}>
          <h1>Cadastro</h1>
          <div className="form-control">
            <label className="form-label">Nome: </label>
            <input
              name="name"
              type="text"
              placeholder="nome"
              required={true}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="form-label">E-mail: </label>
            <input
              name="email"
              type="email"
              placeholder="e-mail"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="form-label">Senha: </label>
            <input
              name="password"
              type="password"
              placeholder="senha"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="form-label">Confi.: </label>
            <input
              name="confirm-password"
              type="password"
              placeholder="confirme sua senha"
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Cadastrar type="submit" disabled={password !== confirmPassword}>
            Cadastrar
          </Cadastrar>
        </Form>
      </Main>
    </Body>
  );
}