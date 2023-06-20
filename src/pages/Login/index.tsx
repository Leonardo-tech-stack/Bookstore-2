import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mainApiJson } from "../Login/mainApi/config";
import Header from "../../components/Header";
import { Logar, Form, H1, Main } from "./styles";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await mainApiJson.post("/user/login", {
        email,
        password,
      });
      console.log(response.data);
      alert("logado com sucesso");
      navigate('/cadastroadm')
    } catch (error) {
      alert("Algo deu errado");
    }
  };
  return (
    <div>
      <Header />
      <Main className="container-card">
        <H1>Login</H1>
        <Form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <Logar type="submit">
              Logar
            </Logar>
          </div>
          {/* <div className="mb-3">
            <Button type="submit">
              Cadastrar
            </Button>
          </div> */}
        </Form>
      </Main>
    </div>
  );
}