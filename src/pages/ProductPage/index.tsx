import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { mainApiJson, noHeader } from '../../services/mainAPI/config';
import ProductAPI from '../../types/productAPI';
import { Div, Description } from './styles';
import { Loading } from '../../styles/loading'; 
import Book from '../../assets/images/Book-1.png'

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductAPI | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);

    noHeader.get(`/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar o produto:', error);
        setIsLoading(false);
      });
  }, [productId]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(event.target.value));
  };

  const renderQuantityOptions = () => {
    const options = [];

    for (let i = 1; i <= (product?.inventory || 1); i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }

    return options;
  };

  const getImageUrl = (filename: string) => {
    return `/images/${filename}`;
  };

  const handleAddToCart = () => {
    if (productId) {
      const parsedProductId = parseInt(productId);
      const body = {
        productId: parsedProductId,
        quantity
      };
  
      mainApiJson.post('/client/cart/add', body)
        .then(response => {
          console.log(productId)
          alert('Adicionado ao carrinho');
        })
        .catch(error => {
          alert('Erro ao adicionar o produto ao carrinho');
          console.error('Erro ao adicionar o produto ao carrinho:', error);
        });
    }
  };

  const toggleFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div>
      {isLoading ? (
        <Loading>
          <BarLoader color="#000" loading={isLoading} />
        </Loading>
      ) : (
        <Div>
          <div className='img'>
            {/* <img src={getImageUrl(product?.image || '')} alt={product?.name || ''} /> */}
            <img src={getImageUrl(product?.image || '')} />
          </div>
          
          <div className='string'>
            <h1>{product?.name}</h1>

            <Description showFullDescription={showFullDescription}>
              {product?.description}
            </Description>

            {product?.description.length && product?.description.length > 100 && (
              <button className="hide" onClick={toggleFullDescription}>
                {showFullDescription ? 'Mostrar menos' : 'Mostrar mais'}
              </button>
            )}

            <p>
              <strong>Preço:</strong> R$ {product?.price}
            </p>

            <label>
              <strong>Quantidade: </strong>
              <select value={quantity} onChange={handleQuantityChange}>
                {renderQuantityOptions()}
              </select>
            </label>

            <div>
              <button className="add" title="Desabilitado" onClick={handleAddToCart}>
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </Div>
      )}
    </div>
  );
};

export default ProductPage;