// import axios from "axios";

// const mainApiJson = axios.create({
//   baseURL: process.env.REACT_APP_BASE_API_URL,
//   withCredentials: true,
//   headers: { "Content-Type": "application/json" },
// });

// const mainApiMultipart = axios.create({
//   baseURL: process.env.REACT_APP_BASE_API_URL,
//   withCredentials: true,
//   headers: { "Content-Type": "multipart/form-data" },
// });

// export { mainApiJson, mainApiMultipart };
// const baseApi = axios.create({
//     headers : {
//         "Content-Type" : "application/json",
//     }
// });

// export default baseApi;

import axios from "axios";

const mainApiJson = axios.create({
  baseURL: 'https://api-ecommerce-livraria.onrender.com',
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const mainApiMultipart = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" },
});

export { mainApiJson, mainApiMultipart };
