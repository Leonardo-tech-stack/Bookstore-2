import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductAPI from '../../../types/productAPI';
import { noHeader } from '../../../services/mainAPI/config';
import { Lista, Excluir, Tabela, Linha1, Linha2, TbTitulo, Unidade } from './styles';
import Modal from '../../../components/Modal';

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductAPI[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10);
  const [filteredProducts, setFilteredProducts] = useState<ProductAPI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    setFilteredProducts(currentProducts);
  }, [currentPage, products, productsPerPage]);

  const handleDeleteProduct = (id: number) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir o produto?');

    if (confirmDelete) {
      noHeader
        .delete(`/product/${id}`)
        .then(response => {
          if (response.status === 204) {
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            alert('Sucesso');
            window.location.reload(); 
          } else {
            console.error('Failed to delete product');
          }
        })
        .catch(error => console.error(error));
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
      {isLoading ? ( 
        <div>Aguarde, carregando produtos...</div>
      ) : (
        <>
          <Modal />
          <Lista>
            <h2>Lista de Produtos</h2>
            <Tabela>
              <Linha1>
                <TbTitulo className="t-img"></TbTitulo>
                <TbTitulo className="t-nome">Nome</TbTitulo>
                <TbTitulo className="t-valor">Valor (R$)</TbTitulo>
                {/* <TbTitulo>Descrição</TbTitulo> */}
                <TbTitulo className="t-quantidade">Quantidade no estoque</TbTitulo>
                <TbTitulo className="t-ações">Ações</TbTitulo>
              </Linha1>

              {filteredProducts.map((product: ProductAPI) => (
                <Linha2 key={product.id}>
                  <Unidade className="img">
                    <img src={product.image} />
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
                  <Unidade className="quantidade">
                    <p>{product.inventory}</p>
                  </Unidade>
                  <Unidade>
                    {/* <Link to={`/edit-product/${product.id}`}>
                      <button>Editar</button>
                    </Link> */}
                    <button title="Desabilitado">Editar</button>
                    <Excluir className="btn-excluir" onClick={() => handleDeleteProduct(product.id)}>
                      Excluir
                    </Excluir>
                  </Unidade>
                </Linha2>
              ))}
            </Tabela>
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
