import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { FiArrowDownCircle } from 'react-icons/fi'; 
import { noHeader, getImageUrl } from '../../services/mainAPI/config';
import ProductAPI from '../../types/productAPI';
import Category from '../../types/Category';
import Sobre from '../../components/About';
import { Products, Limiter } from './styles';
import { Loading } from '../../styles/loading';
import Book from '../../assets/images/Book-1.png';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductAPI[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductAPI[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(6);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isInfiniteScroll, setIsInfiniteScroll] = useState<boolean>(false); 

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = selectedCategory !== ""
      ? products.filter((product) => {
          return product.categories && product.categories.some(
            (category) => {
              if (typeof category === 'string') {
                return category === selectedCategory;
              } else {
                return category && category['name'] === selectedCategory;

              }
            }
          );
        })
      : products;

      if (isInfiniteScroll) {
        const newProducts = currentProducts.slice(0, currentPage * productsPerPage);
        setFilteredProducts(chunk(newProducts, 3));
      } else {
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const slicedProducts = currentProducts.slice(
          indexOfFirstProduct,
          indexOfLastProduct
        );
        setFilteredProducts(chunk(slicedProducts, 3));
      }
    }, [currentPage, products, productsPerPage, selectedCategory, isInfiniteScroll]);

    useEffect(() => {
      
      const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
        ) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      };
  
      if (isInfiniteScroll) {
        window.addEventListener('scroll', handleScroll);
      }
  
      return () => {
        if (isInfiniteScroll) {
          window.removeEventListener('scroll', handleScroll);
        }
      };
    }, [isInfiniteScroll]);
  
    useEffect(() => {
      const handleResize = () => {
        setIsInfiniteScroll(window.innerWidth <= 768);
      };
  
      handleResize(); 
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await noHeader.get('/product');
      const data = response.data;
      setProducts(data);
      setTotalPages(Math.ceil(data.length / productsPerPage));
      setCurrentPage(1);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await noHeader.get('/category');
      const data = response.data;
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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
          <div className='filter'>
            <p>Filtrar: </p>
            <select
              value={selectedCategory}
              onChange={(e) => {
                const category = e.target.value;
                setSelectedCategory(category);
              }}
            >
              <option value="">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {filteredProducts.map((row, rowIndex) => (
            <ul key={rowIndex}>
              {row.map((product) => (
                <li key={product.id}>
                  <div className="products-container">
                    <Link to={`/product/${product.id}`}>
                      {/* <img
                        src={product.images && product.images.length > 0 ? getImageUrl(product.images[0].filename) : Book}
                        alt={`Imagem do produto ${product.name}`}
                      /> */}
                      <img src={Book}></img>
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
        {!isInfiniteScroll && (
          <div className="page-numbers">
            {getPageNumbers()}
          </div>
        )}

        {isInfiniteScroll && (
          <div className="scroll-down-icon">
            <FiArrowDownCircle size={45} onClick={() => window.scrollTo(0, document.body.scrollHeight)} />
          </div>
        )}
      </Limiter>
    </div>
  );
};

export default ProductList;