import axios from "axios";
import { mainApiJson, noHeader } from "./config";

interface UsuarioPayload {
  email: string;
  password: string;
}

export const getUserData = (email: string) => {
  return mainApiJson.get(`/user/{email}`);
};
  
  // Endpoint para atualizar os dados do usuário
export const updateUserData = (email: string, data: { name: string, password: string }) => {
  return mainApiJson.put(`/user/{email}`, data);
};

export function loginUsuario(payload: UsuarioPayload) {
  return noHeader.post("/user/login", payload);
}

export function cadastroUsuario(payload: UsuarioPayload) {
  return mainApiJson.post("/user", payload);
}