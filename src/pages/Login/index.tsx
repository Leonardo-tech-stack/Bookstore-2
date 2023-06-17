import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { mainApiJson } from "./mainApi/config";
import { Logar, Form, H1, Main } from "./styles";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://api-ecommerce-livraria.onrender.com/user/login',
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const accessToken = response.data.accessToken;

      localStorage.setItem('accessToken', accessToken);

      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      console.log(axios.defaults.headers);
    } catch (error) {
      console.error('Erro ao efetuar login:', error);
    }
  };

  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div>
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
        </Form>
      </Main>
    </div>
  );
}

export default Login;
