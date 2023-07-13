import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { noHeader, mainApiJson } from '../../services/mainAPI/config';
import ProductAPI from '../../types/productAPI';
import { NFound } from './styles';
import { Div, Description } from '../ProductPage/styles';
import { Loading } from '../../styles/loading';
import Book from '../../assets/images/Book-1.png'

const SearchResultsPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<ProductAPI[]>([]);
  const { productId } = useParams<{ productId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductAPI | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const searchTerm = new URLSearchParams(location.search).get('query');

    if (searchTerm) {
      setIsLoading(true);
      performSearch(searchTerm);
    }
  }, [location]);

  const performSearch = async (searchTerm: string) => {

    try {
      const response = await noHeader.get<ProductAPI[]>(`/product/search/${searchTerm}`);
      setSearchResults(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Search failed', error);
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>, productId: number) => {
    const updatedProducts = searchResults.map((p) => {
      if (p.id === productId) {
        return { ...p, quantity: Number(event.target.value) };
      }
      return p;
    });
    setSearchResults(updatedProducts);
  };

  const renderQuantityOptions = (productId: number) => {
    const product = searchResults.find((p) => p.id === productId);
    const options = [];

    for (let i = 1; i <= (product?.inventory || 1); i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }

    return options;
  };

  const getImageUrl = (filename: string) => {
    return `/images/${filename}`;
  };

  const handleAddToCart = (productId: string) => {
    // const userEmail = "...";
    
    if (productId) {
      const body = {
        // userEmail,
        productId: productId,
        quantity: product?.quantity || 1
      };
    
      mainApiJson.post('/client/cart/add', body)
        .then(response => {
          alert('adicionado')
        })
        .catch(error => {
          alert('catch')
          console.error('Erro ao adicionar o produto ao carrinho:', error);
        });
    }
  };    

  const toggleFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleProductClick = (clickedProduct: ProductAPI) => {
    setProduct(clickedProduct);
  };

  return (
    <div>
      {isLoading ? (
        <Loading>
          <BarLoader color="#000" loading={isLoading} />
        </Loading>
        ) : (
          searchResults.length === 0 ? (
            <NFound>
              <p className='n-1'>Não temos nenhum produto com esse nome :(</p>
              <p className='n-2'>
                Talvez encontre algo parecido
                <a href="/lista-de-produtos">
                  <strong> aqui!</strong>
                </a>
              </p>
            </NFound>
          ) : (
          searchResults.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product)}>
              <Div>
                <div className='img'>
                  {/* <img src={getImageUrl(product.image)} alt={product.name} /> */}
                  <img src={getImageUrl(product.image)} />
                  {/* <img src={Book} /> */}
                </div>

                <div className='string'>
                  <h1>{product.name}</h1>

                  <Description showFullDescription={showFullDescription}>
                    {product.description}
                  </Description>

                  {product.description.length > 100 && (
                    <button className="hide" onClick={toggleFullDescription}>
                      {showFullDescription ? 'Mostrar menos' : 'Mostrar mais'}
                    </button>
                  )}

                  <p>
                    <strong>Preço:</strong> R$ {product.price}
                  </p>
                  {/* <p>Categoria: {product.categories}</p> */}
                  {/* <p>Quantidade em estoque: {product.inventory}</p> */}
                  <label>
                    <strong>Quantidade: </strong>
                    <select value={product.quantity} onChange={(event) => handleQuantityChange(event, product.id)}>
                      {renderQuantityOptions(product.id)}
                    </select>
                  </label>

                  <div>
                    <button className="add" title="Desabilitado" onClick={() => handleAddToCart(product.id.toString())}>Adicionar ao carrinho</button>
                  </div>
                </div>
              </Div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default SearchResultsPage;
