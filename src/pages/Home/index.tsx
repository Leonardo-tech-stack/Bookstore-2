import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarNavigation from '../../components/Navbar/NavbarNavigatio';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/product');
        const productsData: Product[] = response.data;

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const getImageUrl = (filename: string) => {
    return `/images/${filename}`;
  };

  return (
    <div>
      <NavbarNavigation />
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <a href={`/product/${product.id}`}>
            {/* <img src={getImageUrl(product.image)} alt={product.name} /> */}
            <img src={getImageUrl(product.image)} />
            <h1>{product.name}</h1>
            <p>Price: ${product.price}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
