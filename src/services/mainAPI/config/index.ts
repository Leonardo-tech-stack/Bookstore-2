import axios from "axios";

const mainApiJson = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const mainApiMultipart = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" },
});

const noHeader = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  withCredentials: true,
});


export { mainApiJson, mainApiMultipart, noHeader };
