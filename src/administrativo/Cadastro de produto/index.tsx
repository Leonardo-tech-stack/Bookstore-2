import React, { useState } from 'react';
import Header from '../../components/Header';
import { mainApiMultipart } from '../../pages/Login/mainApi/config';
import { Div, Title, Form } from '../Cadastro de adm/styles';

const ProductRegistrationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [categories, setCategories] = useState('');
  const [images, setImages] = useState<File | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value));
  };

  const handleInventoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInventory(parseInt(e.target.value));
  };

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategories(e.target.value);
  };

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];
      setImages(image);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('inventory', inventory.toString());
    formData.append('categories', categories);

    if (images) {
      formData.append('images', images);
    }

    try {
      const response = await mainApiMultipart.post('/product', formData);

      if (response.status === 201) {
        alert('Produto cadastrado com sucesso!');
      } else {
        alert('Erro ao cadastrar produto!');
      }
    } catch (error) {
      console.error('Erro de conexão', error);
    }
  };

  return (
    <div>
      <Header />
      <Div>
        <Title>Cadastro de Produto</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} />
          </div>
          <div>
            <label htmlFor="description">Descrição:</label>
            <input type="text" id="description" value={description} onChange={handleDescriptionChange} />
          </div>
          <div>
            <label htmlFor="price">Preço:</label>
            <input type="number" id="price" value={price} onChange={handlePriceChange} />
          </div>
          <div>
            <label htmlFor="inventory">Estoque:</label>
            <input type="number" id="inventory" value={inventory} onChange={handleInventoryChange} />
          </div>
          <div>
            <label htmlFor="categories">Categorias:</label>
            <input type="text" id="categories" value={categories} onChange={handleCategoriesChange} />
          </div>
          <div>
            <label htmlFor="images">Imagens:</label>
            <input type="file" id="images" onChange={handleImagesChange} />
          </div>
          <button type="submit">Cadastrar</button>
        </Form>
      </Div>
    </div>
  );
};

export default ProductRegistrationPage;
