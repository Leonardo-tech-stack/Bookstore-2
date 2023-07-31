import React, { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductAPI from '../../../types/productAPI';
import { mainApiMultipart, noHeader } from '../../../services/mainAPI/config';

// Interface para representar os tipos esperados do objeto formData
interface FormDataInterface {
  name: string;
  description: string;
  price: string;
  inventory: string;
}

const EditProductPage: React.FC = () => {
  const { product_id } = useParams<{ product_id: string }>();
  const [product, setProduct] = useState<ProductAPI | null>(null);
  const [formData, setFormData] = useState<FormDataInterface>({
    name: '',
    description: '',
    price: '',
    inventory: '',
  });
  const [images, setImages] = useState<File | null>(null);
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];
      setImages(image);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProductData = {
      data: {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        inventory: parseInt(formData.inventory),
      },
    };

    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify(updatedProductData));

    if (images) {
      formDataToSend.append('images', images);
    }

    try {
      const response = await mainApiMultipart.put(`/admin/product/${product_id}`, formDataToSend);

      if (response.status === 200) {
        console.log('Produto atualizado com sucesso!');
        // navigate('/homeadm');
      } else {
        console.error('Erro ao atualizar o produto');
      }
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
    }
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
          <div>
            <label>Imagem:</label>
            <input type="file" onChange={handleImagesChange} />
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
