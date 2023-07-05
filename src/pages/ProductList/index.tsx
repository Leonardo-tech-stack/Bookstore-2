import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { noHeader } from '../../services/mainAPI/config';
import ProductAPI from '../../types/productAPI';
import Sobre from '../../components/About';
import { Products, Limiter } from './styles';
import { Loading } from '../../styles/loading';
import Book from '../../assets/images/Book-1.png'

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductAPI[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductAPI[][]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(6);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    setFilteredProducts(chunk(currentProducts, 3)); // Divide os produtos em grupos de 3 elementos
  }, [currentPage, products, productsPerPage]);

  const fetchProducts = async (searchQuery?: string) => {
    try {
      setIsLoading(true);
      let response;
      if (searchQuery) {
        response = await noHeader.get(`/product/search/${searchQuery}`);
      } else {
        response = await noHeader.get('/product');
      }
      const data = response.data;
      setProducts(data);
      setCurrentPage(1);
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
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

  // Função auxiliar para dividir um array em grupos de tamanho específico
  const chunk = <T extends unknown>(arr: T[], size: number): T[][] => {
    const chunkedArr: T[][] = [];
    let index = 0;

    while (index < arr.length) {
      chunkedArr.push(arr.slice(index, index + size));
      index += size;
    }

    return chunkedArr;
  };

  return (
    <div>
      <Sobre />

      {isLoading ? (
        <Loading>
          <BarLoader color="#000" loading={isLoading} />
        </Loading>
      ) : (
        <Products>
          {filteredProducts.map((row, rowIndex) => (
            <ul key={rowIndex}>
              {row.map((product) => (
                <li key={product.id}>
                  <div className="products-container">
                    <Link to={`/product/${product.id}`}>
                      <img src={Book} />
                      <h1 className="name">
                        <strong>{product.name}</strong>
                      </h1>
                      <p><strong>Preço: </strong>R${product.price}</p>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </Products>
      )}

      <Limiter>
        <div className="page-numbers">
          {getPageNumbers()}
        </div>
      </Limiter>
    </div>
  );
};

export default ProductList;
