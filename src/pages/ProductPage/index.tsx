import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductAPI from '../../types/productAPI';
import NavbarNavigation from '../../components/Navbar/NavbarNavigatio';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<ProductAPI | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://api-ecommerce-livraria.onrender.com/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => {
        console.error('Erro ao carregar o produto:', error);
      });
  }, [productId]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(event.target.value));
  };

  const renderQuantityOptions = () => {
    const options = [];

    for (let i = 1; i <= (product?.inventory || 1); i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }

    return options;
  };

  return (
    <div>
      <NavbarNavigation />
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Preço: R${product.price}</p>
          <p>Categoria: {product.categories}</p>
          <p>Quantidade em estoque: {product.inventory}</p>
          <label>
            Quantidade:
            <select value={quantity} onChange={handleQuantityChange}>
              {renderQuantityOptions()}
            </select>
          </label>
          <button>Adicionar ao carrinho</button>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default ProductPage;
