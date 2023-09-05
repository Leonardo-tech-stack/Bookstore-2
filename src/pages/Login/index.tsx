import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mainApiJson } from "../../services/mainAPI/config";
import { Body, Logar, Register, Form, H2, Validation, Main } from "./styles";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setEmail(storedUserId);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("userId", email);
    } else {
      localStorage.removeItem("userId");
    }
  }, [rememberMe, email]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const loginData = {
        email,
        password,
        rememberMe,
      };
  
      await mainApiJson.post("/user/login", loginData);
      navigate("/");
    } catch (error) {
      setIsInvalidLogin(true);
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
          <H2>Login</H2>
          {isInvalidLogin && (
            <Validation>
              Cadastro não encontrado. Verifique suas credenciais ou
              <a href="/cadastro"> crie uma conta.</a>
            </Validation>
          )}
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
          <div className="checkbox">
            <div>
              <input
                type="checkbox"
                className="remember"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <label>Lembre-me</label>
            </div>
            {/* <a className="esqueceu-a-senha" title="Desabilitado">esqueceu a senha?</a> */}
          </div>
          <div>
            {isLoading ? (
              <p className="loading"><strong>Realizando login...</strong></p>
            ) : (
              <Logar>
                <button type="submit">Logar</button>
              </Logar>
            )}
          </div>
        </Form>
        <Register>
          <p>
            Ou crie uma <button type="button" onClick={redirectToCadastro}>conta</button>
          </p>
        </Register>
      </Main>
    </Body>
  );
}
