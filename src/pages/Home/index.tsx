import React, { useEffect, useState } from 'react';
import ProductAPI from '../../types/productAPI';
import NavbarNavigation from '../../components/Navbar/NavbarNavigatio';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductAPI[]>([]);

  useEffect(() => {
    fetch('https://api-ecommerce-livraria.onrender.com/product')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <NavbarNavigation />
      <h1>Lista de Produtos</h1>
      {products.map(product => (
        <div key={product.id}>
          <a href={`/product/${product.id}`}>
            {/* <img src={`https://api-ecommerce-livraria.onrender.com/images/${product.image}`} alt={product.name} /> */}
            <h2>{product.name}</h2>
            <p>Preço: R${product.price}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
