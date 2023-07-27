import { AxiosError } from "axios";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mainApiJson } from "../../services/mainAPI/config";
import { Body, Main } from '../Login/styles';
import { DivForm, Cadastrar } from "./styles";
import Swal from "sweetalert2";

export default function CadastroCliente() {
  const [passwordError, setPasswordError] = useState<string>("");

  const navigate = useNavigate();

  async function criarCadastro(values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    try {
      const { name, email, password } = values;
      const res = await mainApiJson.post("/user/signin", {
        name,
        email,
        password,
      });
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          text: "Cadastro concluído",
          timer: 1000,
        }).then(() => {
          navigate('/login')
        });
      }
    } catch (error: any | AxiosError) {
      alert(error.response.data);
    }
  }

  return (
    <Body>
      <Main>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            const errors: any = {};
            if (!values.name) {
              errors.name = "O nome é obrigatório";
            } else if (values.name.trim().split(" ").length < 2) {
              errors.name = "Insira o nome completo.";
            }

            if (!values.email) {
              errors.email = "O email é obrigatório";
            } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
              errors.email = "Insira um email válido";
            }

            if (values.password !== values.confirmPassword) {
              errors.confirmPassword = "As senhas não coincidem.";
            }
            return errors;
          }}
          onSubmit={(values) => criarCadastro(values)}
        >
          {({ errors }) => (
            <DivForm>
              <Form>
                <h2>Cadastro</h2>
                <div className="form-control">
                  <label className="form-label">Nome: </label>
                  <Field type="text" name="name" placeholder="nome" required />
                </div>
                  {errors.name && (
                    <div className="error-message" style={{ color: "red" }}>
                      {errors.name}
                    </div>
                  )}
                <div className="form-control">
                  <label className="form-label">E-mail: </label>
                  <Field type="email" name="email" placeholder="e-mail" />
                </div>
                <div className="error-message" style={{ color: "red" }}>
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className="form-control">
                  <label className="form-label">Senha: </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="senha"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="form-label">Confirme: </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirm"
                    placeholder="confirme sua senha"
                    required
                  />
                </div>
                {errors.confirmPassword && (
                  <div className="error-message" style={{ color: "red" }}>
                    {errors.confirmPassword}
                  </div>
                )}
                <Cadastrar type="submit">Cadastrar</Cadastrar>
              </Form>
            </DivForm>
          )}
        </Formik>
      </Main>
    </Body>
  );
}
