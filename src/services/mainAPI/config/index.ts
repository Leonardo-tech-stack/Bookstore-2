import axios from "axios";

const mainApiJson = axios.create({
  baseURL: 'https://api-ecommerce-livraria.onrender.com',
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const mainApiMultipart = axios.create({
  baseURL: 'https://api-ecommerce-livraria.onrender.com',
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" },
});

const noHeader = axios.create({
  baseURL: 'https://api-ecommerce-livraria.onrender.com',
  withCredentials: true,
});


export { mainApiJson, mainApiMultipart, noHeader };
