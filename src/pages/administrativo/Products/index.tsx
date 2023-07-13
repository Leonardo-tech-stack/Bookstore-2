import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import ProductAPI from '../../../types/productAPI';
import { noHeader } from '../../../services/mainAPI/config';
import { Lista, Excluir, Tabela, Linha1, Linha2, TbTitulo, Unidade, NEncontrado } from './styles';
import Modal from '../../../components/Modal';
import { Loading } from '../../../styles/loading';
import Book from '../../../assets/images/Book-1.png';
import Swal from 'sweetalert2';

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductAPI[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);
  const [filteredProducts, setFilteredProducts] = useState<ProductAPI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await noHeader.get('/product');
      const data = response.data;
      setProducts(data);
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const getImageUrl = (filename: string) => {
    return `/images/${filename}`;
  };

  const handleDeleteProduct = (id: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Tem certeza que deseja excluir o produto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
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
                window.location.reload();
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
            }
          });
      }
    });
  }; 

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    setFilteredProducts(currentProducts);
  }, [currentPage, products, productsPerPage]);
  
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
      // setFilteredProducts(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching products:', error);
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
  
  return (
    <div>
      {isLoading ? ( 
        <Loading>
          <BarLoader color="#000" loading={isLoading} />
        </Loading>
      ) : (
        <>
          <Modal />
          <Lista>
            <h2>Lista de Produtos</h2>

            <div className="search">
              <Link to={`/cadastro-de-produto`}>
                <button>Adicionar produtos</button>
              </Link>
              <div>
                <input
                  type="text"
                  placeholder="Pesquisar por nome"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
                <button className="searchBtn" onClick={handleSearch}>Pesquisar</button>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <Tabela>
                <Linha1>
                  <TbTitulo className="t-img"></TbTitulo>
                  <TbTitulo className="t-nome">Nome</TbTitulo>
                  <TbTitulo className="t-valor">Valor (R$)</TbTitulo>
                  {/* <TbTitulo>Descrição</TbTitulo> */}
                  {/* <TbTitulo>Categoria</TbTitulo> */}
                  <TbTitulo className="t-quantidade">Quantidade em estoque</TbTitulo>
                  <TbTitulo className="t-ações">Ações</TbTitulo>
                </Linha1>

                {filteredProducts.map((product: ProductAPI) => (
                  <Linha2 key={product.id}>
                    <Unidade className="img">
                    <img src={getImageUrl(product.image)} />
                    </Unidade>
                    <Unidade className="nome">
                      <h1>{product.name}</h1>
                    </Unidade>
                    <Unidade className="valor">
                      <p>{product.price}</p>
                    </Unidade>
                    {/* <Unidade>
                      <p>Descrição: {product.description}</p>
                    </Unidade> */}
                    {/* <Unidade>
                      <p>{product.categories}</p>
                    </Unidade> */}
                    <Unidade className="quantidade">
                      <p>{product.inventory}</p>
                    </Unidade>
                    <Unidade>
                      <Link to={`/edit-product/${product.id}`}>
                          <button>Editar</button>
                      </Link>
                      {/* <button title="Desabilitado">Editar</button> */}
                      <Excluir className="btn-excluir" onClick={() => handleDeleteProduct(product.id)}>
                        Excluir
                      </Excluir>
                    </Unidade>
                  </Linha2>
                ))}
              </Tabela>
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
