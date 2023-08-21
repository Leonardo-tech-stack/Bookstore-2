import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { noHeader, mainApiJson } from '../../services/mainAPI/config';
import ProductAPI from '../../types/productAPI';
import Category from '../../types/Category';
import { NFound } from './styles';
import { Div, Description } from '../ProductPage/styles';
import { Loading } from '../../styles/loading';
import Book from '../../assets/images/Book-1.png'
import Swal from 'sweetalert2';

const SearchResultsPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<ProductAPI[]>([]);
  const { productId } = useParams<{ productId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductAPI | null>(null);
  const [selectedQuantities, setSelectedQuantities] = useState<{ [productId: string]: number }>({});
  const [productDescriptionVisibility, setProductDescriptionVisibility] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

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
    const updatedQuantities = {
      ...selectedQuantities,
      [productId.toString()]: Number(event.target.value),
    };
    setSelectedQuantities(updatedQuantities);

    const updatedProducts = searchResults.map((p) => {
      if (p.id === productId) {
        return { ...p, quantity: updatedQuantities[productId.toString()] };
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
    const quantity = selectedQuantities[productId] || 1;

    if (productId) {
      const body = {
        productId: productId,
        quantity: quantity,
      };
      mainApiJson.post('/client/cart/add', body)
        .then(response => {
          Swal.fire({
            icon: 'success',
            text: 'Adicionado com sucesso.',
            timer: 1000,
          });
        })
        .catch(error => {
          console.error('Erro ao adicionar o produto ao carrinho:', error);
          if (error.response && (error.response.status === 401)) {
            Swal.fire({
              icon: 'info',
              text: 'Faça login para continuar.',
              timer: 2000,
            }).then(() => {
              navigate('/login');
            });
          }
        });
    }
  };

  const toggleDescriptionVisibility = (productId: string) => {
    setProductDescriptionVisibility((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
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
            <div key={product.id}>
              <Div>
                <div className='img'>
                  {/* <img src={getImageUrl(product.image)} alt={product.name} /> */}
                  <img src={getImageUrl(product.image)} />
                  {/* <img src={Book} /> */}
                </div>

                <div className='string'>
                  <h1>{product.name}</h1>

                  <Description showFullDescription={productDescriptionVisibility[product.id.toString()]}>
                    {product.description}
                  </Description>

                  {product.description.length > 100 && (
                    <button className="hide" onClick={() => toggleDescriptionVisibility(product.id.toString())}>
                      {productDescriptionVisibility[product.id.toString()] ? 'Mostrar menos' : 'Mostrar mais'}
                    </button>
                  )}

                  {product?.categories && product.categories.length > 0 && (
                    <p>
                      <strong>Categoria(s):</strong> {product.categories.map((category: Category) => category.name).join(', ')}
                    </p>
                  )}

                  <p>
                    <strong>Preço:</strong> R$ {product.price}
                  </p>

                  <label>
                    <strong>Quantidade: </strong>
                    <select
                      value={selectedQuantities[product.id.toString()] || product.quantity}
                      onChange={(event) => handleQuantityChange(event, product.id)}
                    >
                      {renderQuantityOptions(product.id)}
                    </select>
                  </label>

                  <div>
                    <button className="add" onClick={() => handleAddToCart(product.id.toString())}>Adicionar ao carrinho</button>
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
