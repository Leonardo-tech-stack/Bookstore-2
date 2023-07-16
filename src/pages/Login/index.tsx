import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mainApiJson } from "../../services/mainAPI/config";
import { Body, Logar, Cadastrar, Form, H1, Main } from "./styles";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const loginData = {
        email,
        password,
        rememberMe,
      };

      const response = await mainApiJson.post("/user/login", loginData);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      alert("Algo deu errado");
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <Body>
      <Main className="container-card">
        <Form onSubmit={submit}>
          <H1>Login</H1>
          <div className="form-control">
            <label className="form-label">E-mail: </label>
            <input
              type="text"
              value={email}
              required={true}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="form-label">Senha: </label>
            <input
              type="password"
              value={password}
              required={true}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <input
              type="checkbox"
              className="remember"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <label>Lembre-me</label>
            <a className="esqueceu-a-senha" title="Desabilitado">esqueceu a senha?</a>
          </div>
          <div>
            {isLoading ? (
              <p className="loading"><strong>Realizando login...</strong></p>
            ) : (
              <Logar type="submit">Logar</Logar>
            )}
          </div>
        </Form>
        <Cadastrar>
          <p>
            Ou crie uma <button type="button" onClick={redirectToCadastro}>conta</button>
          </p>
        </Cadastrar>
      </Main>
    </Body>
  );
}
