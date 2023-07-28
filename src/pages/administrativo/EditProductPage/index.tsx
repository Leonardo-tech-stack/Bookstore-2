import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductAPI from '../../../types/productAPI';
import { mainApiMultipart, noHeader } from '../../../services/mainAPI/config';

const EditProductPage: React.FC = () => {
  const { product_id } = useParams<{ product_id: string }>();
  const [product, setProduct] = useState<ProductAPI | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching product details...');
    const fetchProductDetails = async () => {
      try {
        const response = await noHeader.get(`/product/${product_id}`);
        const data = response.data;
        console.log('Product details:', data);
        setProduct(data);
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price.toString(),
          inventory: data.inventory.toString(),
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [product_id]);

  // Função para lidar com as mudanças nos campos do formulário
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    console.log(`Handling input change for "${name}": ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedProduct = {
      data: {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        inventory: parseInt(formData.inventory),
      },
    };

    console.log('Submitting form with updated product:', updatedProduct);

    mainApiMultipart
      .put(`/admin/product/${product_id}`, updatedProduct)
      .then((response) => {
        console.log('Response from the server:', response);
        if (response.status === 200) {
          console.log('Produto atualizado com sucesso!');
          // navigate('/homeadm');
        } else {
          console.error('Erro ao atualizar o produto');
        }
      })
      .catch((error) => {
        console.error('Erro ao atualizar o produto:', error);
      });
  };

  return (
    <div>
      {product ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Descrição:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Preço:</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Estoque:</label>
            <input
              type="number"
              name="inventory"
              value={formData.inventory}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Salvar Alterações</button>
        </form>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default EditProductPage;
