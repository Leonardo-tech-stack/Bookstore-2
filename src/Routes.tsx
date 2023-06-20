import { Routes as RouterRoutes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "../src/pages/ProductPage/index";
// import ProductList from "./components/Products/ProductList";
// import Cart from "./components/Cart/index";
// import Sucesso from "./pages/Sucesso";
import Login from "../src/pages/Login";
import Cadastro from "../src/pages/Cadastro/cliente";
import UserData from "./pages/UserData";
import HomeAdmin from "./administrativo/Home Admin/index";
import UserList from "./administrativo/Lista de usuários";
import RegisterAdm from "../src/administrativo/Cadastro de adm/index";
import RegisterProduct from "../src/administrativo/Cadastro de produto/index";
import EditProduct from "./administrativo/EditProductPage/index";

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/homeadm" element={<HomeAdmin />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/dados-de-usuarios" element={<UserList />} />
      {/* <Route path="/produtos" element={<ProductList />} />
      <Route path="/carrinho" element={<Cart />} /> 
      <Route path="/sucesso" element={<Sucesso />} /> */}
      <Route path="/Login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/user/{email}" element={<UserData />} />
      <Route path="/Cadastroadm" element={<RegisterAdm />} />
      <Route path="/Cadastro-de-produto" element={<RegisterProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/lista-de-usuarios" element={<UserList />} />
    </RouterRoutes>
  );
}
