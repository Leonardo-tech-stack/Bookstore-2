import { Routes as RouterRoutes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HomeAdmin from "./administrativo/Home Admin/index"
import ProductPage from "../src/pages/ProductPage/index";
// import ProductList from "./components/Products/ProductList";
// import Cart from "./components/Cart/index";
// import Sucesso from "./pages/Sucesso";
import Login from "../src/pages/Login";
import RegisterAdm from "../src/administrativo/Cadastro de adm/index";
import RegisterProduct from "../src/administrativo/Cadastro de produto/index";
import EditProductPage from "./administrativo/EditProductPage/index";
import UserList from "./administrativo/Lista de usuários";

export default function Routes() {
    return (
        <RouterRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/homeadm" element={<HomeAdmin />} />
            <Route path="/product/:productId" element={<ProductPage />}/>
            {/* <Route path="/produtos" element={<ProductList />} />
            <Route path="/carrinho" element={<Cart />} /> 
            <Route path="/sucesso" element={<Sucesso />} /> */}
            <Route path="/Login" element={<Login />}/>
            <Route path="/Cadastroadm" element={<RegisterAdm />}/>
            <Route path="/Cadastro-de-produto" element={<RegisterProduct />}/>
            <Route path="/edit-product/:id" element={<EditProductPage />}/>
            <Route path="/lista-de-usuarios" element={<UserList />}/>
        </RouterRoutes>
    );
}
