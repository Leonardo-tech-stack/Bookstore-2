import axios from "axios";

export const mainApiJson = axios.create({
  baseURL: "https://api-ecommerce-livraria.onrender.com",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const mainApiMultipart = axios.create({
  baseURL: "https://api-ecommerce-livraria.onrender.com",
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" },
});

export const noHeader = axios.create({
  baseURL: "https://api-ecommerce-livraria.onrender.com",
  withCredentials: true,
});

export const getImageUrl = (filename: string) =>
  `${noHeader.defaults.baseURL}/images/${filename}`;