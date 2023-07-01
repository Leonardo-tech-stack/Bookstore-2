import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { mainApiJson, noHeader } from '../../services/mainAPI/config';
import ProductAPI from '../../types/productAPI';
import { Div, Description } from './styles';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<ProductAPI | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    noHeader.get(`/product/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => {
        console.error('Erro ao carregar o produto:', error);
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
    // const userEmail = "...";
  
    if (productId) {
      const parsedProductId = parseInt(productId);
      const body = {
        // userEmail,
        productId: parsedProductId,
        quantity
      };
  
      mainApiJson.post('/cart/add', body)
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

  return (
    <div>
      {product ? (
        <Div>
          <div className='img'>
            {/* <img src={getImageUrl(product.image)} alt={product.name} /> */}
            <img src={getImageUrl(product.image)} />
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
            <p><strong>Preço:</strong> R$ {product.price}</p>
            {/* <p>Categoria: {product.categories}</p> */}
            {/* <p>Quantidade em estoque: {product.inventory}</p> */}
            <label>
              <strong>Quantidade:</strong>
              <select value={quantity} onChange={handleQuantityChange}>
                {renderQuantityOptions()}
              </select>
            </label>
            <div>
              <button className="add" title="Desabilitado" onClick={handleAddToCart}>Adicionar ao carrinho</button>
            </div>
          </div>
        </Div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default ProductPage;