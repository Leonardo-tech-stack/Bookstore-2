import React, { useState, useEffect, ChangeEvent } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { mainApiMultipart, noHeader } from '../../../services/mainAPI/config';
import Category from '../../../types/Category';
import { Flex, Div, Title, Form } from './styles';
import Produto from '../../../assets/images/produto.png';
import Modal from '../../../components/Modal';
import Swal from 'sweetalert2';

const ProductRegistrationPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
    categories: [] as string[], 
  });
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value; 
    setSelectedCategory(selectedCategoryId);
  };  

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImages = Array.from(event.target.files);
      setImages(newImages);
    }
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const updatedProductData = selectedCategory
      ? { ...productData, categories: [selectedCategory] }
      : productData;
  
    const formData = new FormData();
    formData.append('data', JSON.stringify(updatedProductData));
  
    for (const image of images) {
      formData.append('images', image);
    }

    try {
      const response = await mainApiMultipart.post('/admin/product', formData);

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Produto cadastrado com sucesso!',
          timer: 2000,
          showConfirmButton: true,
          showCancelButton: false,
          allowOutsideClick: true,
          allowEscapeKey: false,
          showLoaderOnConfirm: true,
          preConfirm: (): Promise<void> => {
            return new Promise<void>((resolve) => {
              setTimeout(() => {
                resolve();
              });
            });
          },
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar produto!',
          timer: 2000,
        });
      }
    } catch (error) {
      if (
        (error as AxiosError).response &&
        ((error as AxiosError).response!.status === 401 || (error as AxiosError).response!.status === 403)
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Erro na requisição',
          text: 'Faça login como administrador',
          timer: 2000,
        });
        navigate('/login');
      } else {
        console.error('Erro de conexão', error);
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await noHeader.get('/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Modal />
      <Flex>
        <div>
          <img src={Produto} alt="Produto" />
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
              <label className="textarea-label" htmlFor="description">
                Descrição:
              </label>
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
                onChange={handleInputChange}
              />
            </div>
            {/* <div>
              <label htmlFor="categories">Categorias:</label>
              <select
                id="categories"
                name="categories"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="img">
              <label className="img-label" htmlFor="images">
                Imagens:
              </label>
              <input type="file" id="images" multiple onChange={handleImagesChange} />
            </div>
            <div className="register">
              <button type="submit">Cadastrar</button>
            </div>
          </Form>
        </Div>
      </Flex>
    </div>
  );
};

export default ProductRegistrationPage;
