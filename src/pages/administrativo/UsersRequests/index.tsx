import React, { useState, useEffect } from "react";
import { noHeader } from "../../../services/mainAPI/config";
import User from "../../../types/User";
import { Order } from "../../../types/Order";
import Modal from "../../../components/Modal";
import OrderModal from "../../../components/RequestsModal";
import { Loading } from "../../../styles/loading";
import { Title, Div, Pages } from "./styles";
import { BarLoader } from "react-spinners";
import OrderDetailsModal from "../../../components/OrderDetailsModal";
import Swal from "sweetalert2";

const OrderList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<{ [key: number]: User }>({});
  const [selectedUserOrders, setSelectedUserOrders] = useState<Order[]>([]);
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(10);
  const [isEmptyList, setIsEmptyList] = useState<boolean>(false);


  useEffect(() => {
    noHeader
      .get("/admin/order")
      .then((response) => {
        setOrders(response.data);
        setIsLoading(false);
        setIsEmptyList(response.data.length === 0);
      })
      .catch(error => {
        console.error(error);
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
          Swal.fire({
            icon: 'error',
            title: 'Erro na requisição',
            text: 'Faça login como administrador',
            timer: 2000,
          });
        }
      });
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      for (const order of orders) {
        if (!users[order.userId]) {
          try {
            const response = await noHeader.get(`/admin/user/${order.userId}`);
            setUsers((prevUsers) => ({
              ...prevUsers,
              [order.userId]: response.data,
            }));
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        }
      }
    };

    fetchUserDetails();
  }, [orders]);

  const handleUserClick = (userId: number) => {
    setSelectedUserOrders(orders.filter((order) => order.userId === userId));
    const userName = users[userId]?.name || "Usuário Desconhecido";
    setSelectedUserName(userName);
  };

  const handleOrderDetailsClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedOrder(null);
    setIsDetailsModalOpen(false);
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const getPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={currentPage === i ? 'current-page' : ''}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <Modal />
      <Title>Lista de Pedidos</Title>
      <Div>
        {isLoading ? (
          <Loading>
            <BarLoader color="#000" loading={isLoading} />
          </Loading>
        ) : (
          isEmptyList ? (
            <p>Nenhum pedido por enquanto.</p>
          ) : (
          <table>
            <thead>
              <tr>
                <th>ID do Pedido</th>
                <th>Nome do Usuário</th>
                <th>Valor Total ($)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td
                    className="user"
                    title="Mostrar pedidos do cliente"
                    onClick={() => handleUserClick(order.userId)}
                  >
                    {users[order.userId]?.name || "Carregando..."}
                  </td>
                  <td>${order.totalValue}</td>
                  <td>
                    <button onClick={() => handleOrderDetailsClick(order)}>Ver detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </Div>
      <OrderModal
        isOpen={Boolean(selectedUserOrders.length)}
        onRequestClose={() => setSelectedUserOrders([])}
        selectedUserOrders={selectedUserOrders}
        userName={selectedUserName}
      />
      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onRequestClose={closeDetailsModal}
        selectedOrder={selectedOrder}
        users={users} 
      />
      <Pages>
        <div className="page-numbers">
          {getPageNumbers()} 
        </div>
      </Pages>
    </div>
  );
};

export default OrderList;
