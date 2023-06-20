import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mainApiMultipart } from '../../pages/Login/mainApi/config';
import ProductAPI from '../../types/productAPI';
import Header from '../../components/Header';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductAPI>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    inventory: 0,
    categories: [],
    image: null,
  });
  
  useEffect(() => {
    mainApiMultipart.get(`/product/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch product:', error);
      });
  }, [id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setProduct(prevProduct => ({
      ...prevProduct,
      image: file instanceof File ? file : null,
    }));
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', String(product.price));
    formData.append('description', product.description);
    formData.append('inventory', String(product.inventory));
    formData.append('categories', String(product.categories));
    if (product.image) {
      formData.append('image', product.image);
    }

    mainApiMultipart.put(`/product/${id}`, formData)
      .then(() => {
        alert('sucesso');
        navigate('/');
      })
      .catch(error => {
        console.error('Failed to update product:', error);
      });
  };

  return (
    <div>
      <Header />
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="price">Preço:</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea id="description" name="description" value={product.description} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="inventory">Quantidade no estoque:</label>
          <input type="number" id="inventory" name="inventory" value={product.inventory} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="categories">Categoria:</label>
          <textarea id="categories" name="categories" value={product.categories} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="image">Imagem:</label>
          <input type="file" id="image" name="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditProductPage;
