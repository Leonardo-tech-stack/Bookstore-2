import { Routes as RouterRoutes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductPage from "../src/pages/ProductPage/index";
import SearchResultsPage from "./pages/SearchResults";
import Cart from "./pages/Cart/index";
import Ordereds from "./pages/Ordereds";
import Login from "../src/pages/Login";
import Register from "./pages/Register";
import UserData from "./pages/UserData";
import HomeAdmin from "./pages/administrative/Products";
import UserList from "./pages/administrative/UserList";
import RegisterAdm from "./pages/administrative/AdmRegister";
import RegisterProduct from "./pages/administrative/ProductRegister/index";
import EditProduct from "./pages/administrative/EditProductPage/index";
import UsersRequests from "./pages/administrative/UsersRequests";
import Contact from "./pages/Contact";

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/lista-de-produtos" element={<ProductList />} /> 
      <Route path="/homeadm" element={<HomeAdmin />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/pedidos" element={<Ordereds />} />
      <Route path="/dados-de-usuarios" element={<UserList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/meus-dados" element={<UserData />} />
      <Route path="/cadastroadm" element={<RegisterAdm />} />
      <Route path="/cadastro-de-produto" element={<RegisterProduct />} />
      <Route path="/edit-product/:product_id" element={<EditProduct />} />
      <Route path="/lista-de-pedidos" element={<UsersRequests />} />
      <Route path="/lista-de-usuarios" element={<UserList />} />
      <Route path="/contato" element={<Contact />} />
    </RouterRoutes>
  );
}
