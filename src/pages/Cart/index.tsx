import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainApiJson, noHeader } from '../../services/mainAPI/config';
import CartItem from '../../types/CartItem';
import CuponBar from '../../components/Bars/CuponBar/CuponBar';
import Footer from '../../components/Footer/Footer';
import Swal from 'sweetalert2';
import Book from '../../assets/images/Book-1.png';
import { BarLoader } from 'react-spinners';
import { Loading } from '../../styles/loading';
import { Body, Titulo, Vazio, Voltar, DivFlex, Div, Detalhes, Ul } from './styles';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    noHeader
      .get('/client/cart')
      .then((response) => {
        const products = response.data.products.map(async (item: any) => {
          try {
            const productResponse = await mainApiJson
              .get(`/product/${item.productId}`);
            return productResponse.data;
          } catch (error) {
            console.error('Erro ao obter informações do produto:', error);
            return null;
          }
        });

        Promise.all(products)
          .then((productData) => {
            const updatedCartItems = response.data.products.map((item: any, index: number) => {
              return {
                quantity: item.quantity,
                product: productData[index],
              };
            });

            setCartItems(updatedCartItems);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Erro ao obter informações do produto:', error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error('Erro ao carregar o carrinho:', error);
        setIsLoading(false);
      });
  }, []);

  const handleFinalizarCompra = () => {
    const body = {
      products: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    mainApiJson
      .post('/client/order', body)
      .then((response) => {

        setCartItems([]);

        Swal.fire({
          icon: 'success',
          text: 'Pedido finalizado com sucesso!',
          timer: 2000,
        }).then(() => {
          navigate('/pedidos');
        });
      })
      .catch((error) => {
        console.error('Erro ao gerar pedido:', error);
      });
  };

  const handleRemoveFromCart = (productId: number) => {

    const body = {
      productId,
    };

    mainApiJson
      .post('client/cart/remove', body)
      .then((response) => {
        setCartItems(cartItems.filter((item) => item.product.id !== productId));
        console.error(response.data);
      })
      .catch((error) => {
        console.error('Erro ao remover o produto do carrinho:', error);
      });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {

    const body = {
      productId,
      quantity: newQuantity,
    };

    mainApiJson
      .post('client/cart/add', body)
      .then((response) => {
       
      })
      .catch((error) => {
        console.error('Erro ao atualizar a quantidade do produto:', error);
      });
  };

  const handleDecreaseQuantity = (productId: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product.id === productId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    handleUpdateQuantity(productId, updatedCartItems.find((item) => item.product.id === productId)?.quantity || 1);
  };

  const handleIncreaseQuantity = (productId: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product.id === productId && item.quantity < item.product.inventory) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    handleUpdateQuantity(productId, updatedCartItems.find((item) => item.product.id === productId)?.quantity || 1);
  };

  return (
    <Body>
      {isLoading ? (
        <Loading>
          <BarLoader color="#000" loading={isLoading} />
        </Loading>
      ) : (
        <div>
          {cartItems.length > 0 ? (
            <>
              <Titulo>
                <h2>Carrinho</h2>
              </Titulo>
              <Voltar>
                <a href="/lista-de-produtos">Não está pronto para finalizar a compra? Continue comprando</a>
              </Voltar>
              <DivFlex>
                <div>
                  {cartItems.map((item, index) => (
                    <Div key={index}>
                      <Ul>
                        <li>
                          <div>
                            <img src={Book} />
                          </div>

                          <div className="strings">
                            <p><strong>Produto: </strong>{item.product.name}</p>
                            <p><strong>Preço: </strong>${item.product.price}</p>
                            <p>
                              <strong>Quantidade: </strong>
                              <button className="less" onClick={() => handleDecreaseQuantity(item.product.id)}>-</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => handleIncreaseQuantity(item.product.id)}>+</button>
                            </p>
                          </div>
                        </li>
                      </Ul>

                      <div className="remove">
                        <button onClick={() => handleRemoveFromCart(item.product.id)}>X Remover</button>
                      </div>
                    </Div>
                  ))}
                </div>
              
                <Detalhes>
                  <div className="details"> 
                    <h3>Detalhes do pedido</h3>
                    <CuponBar onSearch={Footer} />
                    <p>Itens no Carrinho: ({cartItems.reduce((total, item) => total + item.quantity, 0)})</p>
                    <b>Total: <span>$ {cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)}</span></b>
                  </div>

                  <div className="checkout">
                    <button onClick={handleFinalizarCompra}>Finalizar pedido</button>
                  </div>
                </Detalhes>
              </DivFlex>

            </>
          ) : (
            <Vazio>
              <div>
                <p>Carrinho Vazio</p>
              </div>
              <a href="/lista-de-produtos">
                <button>Ir às compras agora</button>
              </a>
            </Vazio>
          )}
        </div>
      )}
    </Body>
  );
};

export default CartPage;
