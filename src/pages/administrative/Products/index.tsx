import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import ProductAPI from '../../../types/productAPI';
import Category from '../../../types/Category';
import { noHeader, getImageUrl } from '../../../services/mainAPI/config';
import { Lista, Table, Tr, Tr2, Th, Td, NEncontrado } from './styles';
import Modal from '../../../components/Modal';
import { Loading } from '../../../styles/loading';
import Book from '../../../assets/images/Book-1.png';
import Swal from 'sweetalert2';

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductAPI[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(10); 
  const [filteredProducts, setFilteredProducts] = useState<ProductAPI[]>([]);
  const [originalProducts, setOriginalProducts] = useState<ProductAPI[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    setProductsPerPage(window.innerWidth >= 320 && window.innerWidth <= 480 ? 6 : 10);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await noHeader.get('/product');
      const data = response.data;
      setProducts(data);
      setOriginalProducts(data); 
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
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

  const handleDeleteProduct = (id: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Tem certeza que deseja excluir o produto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        noHeader
          .delete(`/admin/product/${id}`)
          .then(response => {
            if (response.status === 204) {
              setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
              Swal.fire({
                icon: 'success',
                title: 'Produto deletado com sucesso!',
                timer: 2000,
                showConfirmButton: true,
                showCancelButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showLoaderOnConfirm: true,
              }).then(() => {
                // window.location.reload();
              });
            } else {
              console.error('Failed to delete product');
            }
          })
          .catch(error => {
            console.error(error);
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
              Swal.fire({
                icon: 'error',
                title: 'Erro na requisição',
                text: 'Faça login como administrador',
                timer: 2000,
              });
              navigate('/login');
            }
          });
      }
    });
  }; 

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
      : products.slice(indexOfFirstProduct, indexOfLastProduct);
    setFilteredProducts(currentProducts);
  }, [currentPage, products, productsPerPage, selectedCategory]);

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

  const handleSearch = async () => {
    try {
      const response = await noHeader.get(`/product/search/${searchTerm}`);
      const data = response.data;
      setProducts(data);
      setSelectedCategory("");
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching products:', error);
      setProducts(originalProducts); 
    }
  };  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleEditProduct = (productId: number) => {
    navigate(`/edit-product/${productId}`);
  };  
  
  return (
    <div>
      <Modal />
      {isLoading ? ( 
        <Loading>
          <BarLoader color="#000" loading={isLoading} />
        </Loading>
      ) : (
        <>
          <Lista>

            <div className="search">
              
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Pesquisar por nome"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <button className="searchBtn" onClick={handleSearch}>Pesquisar</button>
              </div>

              <div className='filter'>
                <p>Filtrar por categoria: </p>
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

              <Link className="register" to={`/cadastro-de-produto`}>
                <button>Adicionar produtos</button>
              </Link>
            </div>

            {filteredProducts.length > 0 ? (
              <Table>
                <tbody>
                  <tr className="t-titulo">
                    <Th colSpan={5}>
                      <h2>Lista de produtos</h2>
                    </Th>
                  </tr>
                  <Tr>
                    <Th className="t-img"></Th>
                    <Th className="t-nome">Nome</Th>
                    <Th className="t-valor">Valor (R$)</Th>
                    <Th className="t-quantidade">Quantidade em estoque</Th>
                    <Th className="t-ações">Ações</Th>
                  </Tr>

                  {filteredProducts.map((product: ProductAPI) => (
                    <Tr2 key={product.id}>
                      <Td className="img">
                        <img src={getImageUrl(product.image)} />
                        {/* <img
                          src={product.images && product.images.length > 0 ? getImageUrl(product.images[0].filename) : Book}
                          alt={``}
                        /> */}
                      </Td>
                      <Td className="nome">
                        <h1>{product.name}</h1>
                      </Td>
                      <Td className="valor">
                        <p>{product.price}</p>
                      </Td>
                      <Td className="quantidade">
                        <p>{product.inventory}</p>
                      </Td>
                      <Td>
                        <div className="ações">
                          <FaEdit className="btn-editar" title="Editar" onClick={() => handleEditProduct(product.id)} />
                          <FaTrash className="btn-excluir" title="Excluir" onClick={() => handleDeleteProduct(product.id)} />
                        </div>
                      </Td>
                    </Tr2>
                  ))}
                </tbody>
              </Table>
            ) : (
              <NEncontrado>Nenhum produto encontrado.</NEncontrado>
            )}
            <div className="page-numbers">
              {getPageNumbers()}
            </div>
          </Lista>
        </>
      )}
    </div>
  );
}

export default App;
