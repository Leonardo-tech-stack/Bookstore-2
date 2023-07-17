import React, { useEffect, useState } from 'react';
import { mainApiJson, noHeader } from '../../services/mainAPI/config';
import { BarLoader } from 'react-spinners';
import { Vazio } from '../Cart/styles';
import { Loading } from '../../styles/loading';
import { Pedidos, Margin } from './styles';

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    noHeader
      .get('/client/order/user')
      .then((response) => {
        setOrders(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar os pedidos:', error);
        setIsLoading(false);
      });
  }, []);

  const handleCancelOrder = (orderId: number) => {
    noHeader
      .delete(`/client/order/${orderId}`)
      .then((response) => {
        console.log('Pedido cancelado:', response.data);
        // Atualizar a lista de pedidos após o cancelamento
        setOrders(orders.filter((order: any) => order.id !== orderId));
      })
      .catch((error) => {
        console.error('Erro ao cancelar o pedido:', error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <Loading>
          <BarLoader color="#000" loading={isLoading} />
        </Loading>
      ) : (
        <Pedidos>
          
          {orders.length > 0 ? (
            orders.map((order: any) => (
              <div key={order.id}>
                <h2>Meus Pedidos</h2>
                <p>ID do Pedido: {order.id}</p>
                <p>Usuário: {order.userEmail}</p>
                <p>Status: {order.status}</p>
                <button onClick={() => handleCancelOrder(order.id)}>
                  Cancelar Pedido
                </button>
              </div>
            ))
          ) : (
            <Margin>
              <Vazio>
                <div>
                  <p>Você não possui pedidos</p>
                </div>
                <a href="/lista-de-produtos">
                  <button>Ir às compras agora</button>
                </a>
              </Vazio>
            </Margin>
          )}
        </Pedidos>
      )}
    </div>
  );
};

export default OrderPage;
