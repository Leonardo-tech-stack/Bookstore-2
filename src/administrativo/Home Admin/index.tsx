import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductAPI from '../../types/productAPI';
import Header from '../../components/Header';
import { List, Ul, Excluir } from './styles';

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductAPI[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductAPI[]>([]);

  useEffect(() => {
    fetch('https://api-ecommerce-livraria.onrender.com/product')
      .then(response => response.json())
      .then((data: ProductAPI[]) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleDeleteProduct = (id: number) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir o produto?');

    if (confirmDelete) {
      fetch(`https://api-ecommerce-livraria.onrender.com/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
          } else {
            console.error('Failed to delete product');
          }
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <Header />
     {/* <Header userLoggedIn={true} /> */}

      <List>
        <h2>Lista de Produtos</h2>
        <Ul>
          {filteredProducts.map((product: ProductAPI) => (
            <li key={product.id}>
              {/* <img src={`https://api-ecommerce-livraria.onrender.com/images/${product.image}`} /> */}
              <h1>{product.name}</h1> 
              <p>Valor: R$ {product.price}</p>
              <p>Descrição: {product.description}</p>
              <p>Quantidade no estoque: {product.inventory}</p>
              <Link to={`/edit-product/${product.id}`}>
                <button>Editar</button>
              </Link>
              <Excluir className="btn-excluir" onClick={() => handleDeleteProduct(product.id)}>Excluir</Excluir>
            </li>
          ))}
        </Ul>
      </List>
    </div>
  );
}

export default App;
