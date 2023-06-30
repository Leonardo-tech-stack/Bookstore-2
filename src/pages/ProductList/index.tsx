import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { noHeader } from '../../services/mainAPI/config';
import ProductAPI from '../../types/productAPI';
import NavbarNavigation from '../../components/Navbar/NavbarNavigatio';
import { Products, Limiter } from './styles';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductAPI[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductAPI[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(5);

  const getImageUrl = (filename: string) => {
    return `/images/${filename}`;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    setFilteredProducts(currentProducts);
  }, [currentPage, products, productsPerPage]);

  const fetchProducts = async (searchQuery?: string) => {
    try {
      let response;
      if (searchQuery) {
        response = await noHeader.get(`/product/search/${searchQuery}`);
      } else {
        response = await noHeader.get('/product');
      }
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };  

  const totalPages = Math.ceil(products.length / productsPerPage);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
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
      <h2>Product List</h2>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <Products>
              <Link to={`/product/${product.id}`}>
                {/* <img src={getImageUrl(product.image)} alt={product.name} /> */}
                <img src={getImageUrl(product.image)} />
                <h1>{product.name}</h1>
                <p>Preço: R${product.price}</p>
                {/* <p>Categoria: {product.categories}</p> */}
              </Link>
            </Products>
          </li>
        ))}
      </ul>
      <Limiter>
        <div className="page-numbers">
            {getPageNumbers()}
        </div>
      </Limiter>
    </div>
  );
};

export default ProductList;
