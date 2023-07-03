import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { mainApiMultipart } from '../../../services/mainAPI/config';
import { Flex, Div, Title, Form } from './styles';
import Produto from '../../../assets/images/produto.png'
import Modal from '../../../components/Modal';

const ProductRegistrationPage: React.FC = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 1.1,
    inventory: 0,
    categories: [] as { id: string; name: string; description: string }[],
  });

  const [images, setImages] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: name === 'categories' ? value.split(',') : value
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      description: value
    }));
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
    formData.append('data', JSON.stringify(productData));
  
    if (images) {
      formData.append('images', images);
    }
  
    try {
      const response = await mainApiMultipart.post('/product', formData);
  
      if (response.status === 201) {
        alert('Produto cadastrado com sucesso!');
        window.location.reload();
      } else {
        alert('Erro ao cadastrar produto!');
      }
    } catch (error) {
      if (
        (error as AxiosError).response &&
        ((error as AxiosError).response!.status === 401 || (error as AxiosError).response!.status === 403)
      ) {
        alert('Faça login como administrador');
      } else {
        console.error('Erro de conexão', error);
      }
    }
  };
  
  return (
    <div>
      <Modal />
      <Flex>
        <div>
          <img src={Produto} ></img>
        </div>
        <Div>
          <Title>Cadastro de Produto</Title>
          <Form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="div-desc">
              <label className="textarea-label" htmlFor="description">Descrição:</label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div>
              <label htmlFor="price">Preço:</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="$"
                value={productData.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="inventory">Estoque:</label>
              <input
                type="number"
                id="inventory"
                name="inventory"
                value={productData.inventory}
                // multiple
                onChange={handleInputChange}
              />
            </div>
            {/* <div>
              <label htmlFor="categories">Categorias:</label>
              <input
                type="text"
                id="categories"
                name="categories"
                value={productData.categories.map((category) => `${category.id}|${category.name}|${category.description}`).join(',')}
                onChange={handleInputChange}
              />
            </div> */}
            <div>
              <label className="img-label" htmlFor="images">Imagem:</label>
              <input type="file" id="images" onChange={handleImagesChange} />
            </div>
            <button type="submit">Cadastrar</button>
          </Form>
        </Div>
      </Flex>
    </div>
  );
};

export default ProductRegistrationPage;