import axios from "axios";
import { mainApiJson } from "./config";

export const getUserData = (email: string) => {
    return mainApiJson.get(`/user/{email}`);
  };
  
  // Endpoint para atualizar os dados do usuário
  export const updateUserData = (email: string, data: { name: string, password: string }) => {
    return mainApiJson.put(`/user/{email}`, data);
  };