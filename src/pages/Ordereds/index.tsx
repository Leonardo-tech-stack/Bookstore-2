import React, { useEffect, useState } from 'react';
import { noHeader } from '../../services/mainAPI/config';
import { BarLoader } from 'react-spinners';
import ProductAPI from '../../types/productAPI';
import { Loading } from '../../styles/loading';
import Book from '../../assets/images/Book-1.png'
import { Body, Title, Pedidos, Margin, Vazio } from './styles';
import Swal from 'sweetalert2';

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductAPI[]>([]);

  useEffect(() => {
    setIsLoading(true);

    noHeader
      .get('/client/order')
      .then((response) => {
        setOrders(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar os pedidos:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchProductDetails = async (productId: number) => {
      try {
        const response = await noHeader.get(`/product/${productId}`);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      }
    };

    const getProductDetails = async () => {
      const detailsPromises = orders.flatMap((order: any) =>
        order.products.map((product: any) =>
          fetchProductDetails(product.productId)
        )
      );

      const productDetails = await Promise.all(detailsPromises);
      setProductDetails(productDetails);
    };

    getProductDetails();
  }, [orders]);

  const handleCancelOrder = (orderId: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja cancelar o pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        noHeader
          .delete(`/client/order/${orderId}`)
          .then((response) => {
            Swal.fire({
              icon: 'info',
              title: 'Pedido cancelado',
              timer: 2000,
              showConfirmButton: true,
              showCancelButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showLoaderOnConfirm: true,
            }).then(() => {
              window.location.reload();
            });
            setOrders(orders.filter((order: any) => order.id !== orderId));
          })
          .catch((error) => {
            console.error('Erro ao cancelar o pedido:', error);
          });
      }
    });
  };

  return (
    <div>
      {isLoading ? (
        <Loading>
          <BarLoader color="#000" loading={isLoading} />
        </Loading>
      ) : (
        <Body>
          {orders.length > 0 && (  
            <Title>
              <h2>Meus Pedidos</h2>
            </Title>
          )}

          <Pedidos>
            {orders.length > 0 ? (
              orders.map((order: any) => (
                <div className="all" key={order.id}>
                  <div className='info'>
                    <p>
                      <strong>ID do Pedido: {order.id}</strong>
                    </p>
                    {/* <p>
                      <strong>Cupom: </strong>
                      {order.couponId}
                    </p> */}
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((product: any) => {
                        const details = productDetails.find(
                          (details: ProductAPI) =>
                            details.id === product.productId
                        );
                        return (
                          <tr key={product.productId}>
                            <td className='img'><img src={Book} /></td>
                            <td className='name'>{details?.name}</td>
                            <td className='price'>R${details?.price}</td>
                            <td className='quantity'>{product.quantity}</td>
                          </tr>              
                        );
                      })}
                    </tbody>
                    <tfoot>
                      {/* <tr>
                        <td>
                          <p>
                            <strong>Cupom: </strong>
                            {order.couponId}
                          </p>
                        </td>
                      </tr> */}
                      <tr>
                        <td>
                          <b>Total</b>
                        </td>
                        <td>
                          <b>R${order.totalValue}</b>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  
                  <div className='cancel'>
                    <button onClick={() => handleCancelOrder(order.id)}>
                      Cancelar Pedido
                    </button>
                  </div>
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
        </Body>
      )}
    </div>
  );
};

export default OrderPage;
