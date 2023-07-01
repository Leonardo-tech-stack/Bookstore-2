import React, { useEffect, useState } from 'react';
import { mainApiJson, noHeader } from '../../services/mainAPI/config';
import ProductAPI from '../../types/productAPI';
import { Titulo, Div } from './styles';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<ProductAPI[]>([]);

  useEffect(() => {
    noHeader.get('/cart/{id}')
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar o carrinho:', error);
      });
  }, []);

  const handleRemoveFromCart = (productId: number) => {
    const body = {
      productId
    };

    mainApiJson.post('/cart/remove', body)
      .then((response) => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
        console.error(response.data)
      })
      .catch((error) => {
        console.error('Erro ao remover o produto do carrinho:', error);
      });
  };

  return (
    <div>
      <Titulo>
        <h2>Carrinho</h2>
      </Titulo>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>Produto: {item.name}</p>
              {/* Use item.quantity instead of item.quantity */}
              {/* <p>Quantidade: {item.quantity}</p> */}
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remover do carrinho
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <Div>
          {/* <p>O carrinho está vazio.</p> */}
          <p>Em breve...</p>
        </Div>
      )}
    </div>
  );
};

export default CartPage;
