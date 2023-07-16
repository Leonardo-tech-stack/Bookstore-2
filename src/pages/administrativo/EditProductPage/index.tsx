import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { mainApiMultipart, noHeader } from '../../../services/mainAPI/config';
import EditProduct from '../../../types/EditProduct';
import { Loading } from '../../../styles/loading';
import { BarLoader } from 'react-spinners';

const EditProductPage: React.FC = () => {
  const { product_id } = useParams<{ product_id: string }>();
  const [product, setProduct] = useState<EditProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<EditProduct>({
    name: '',
    description: '',
    price: 0,
    inventory: 0,
    categories: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await noHeader.get(`/product/${product_id}`);
      const data = response.data;
      setProduct(data);
      setFormData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: [value],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loadingAlert = Swal.fire({
        title: 'Carregando...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: false,
        showConfirmButton: false,
      });
      Swal.showLoading();
  
      const response = await mainApiMultipart.put(`/admin/product/${product_id}`, formData);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Produto atualizado com sucesso!',
          timer: 2000,
          showConfirmButton: true,
          showCancelButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          navigate('/homeadm');
        });
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };  

  if (isLoading) {
    return <Loading>
        <BarLoader color="#000" loading={isLoading} />
      </Loading>
  }

  return (
    <div>
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
          />
        </div>
        <div>
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="inventory">Estoque:</label>
          <input
            type="number"
            id="inventory"
            name="inventory"
            value={formData.inventory}
            onChange={handleInputChange}
          />
        </div>
        {/* <div>
          <label htmlFor="categories">Categorias:</label>
          <select
            id="categories"
            name="categories"
            value={formData.categories[0]}
            onChange={handleSelectChange}
          >
          </select>
        </div> */}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditProductPage;
