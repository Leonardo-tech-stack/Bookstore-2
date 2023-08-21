import React, { useEffect, useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProductAPI from '../../../types/productAPI';
import Category from '../../../types/Category';
import FormDataInterface from '../../../types/FormDataInterface';
import { mainApiMultipart, noHeader, getImageUrl } from '../../../services/mainAPI/config';
import Modal from '../../../components/Modal';
import { Loading } from '../../../styles/loading';
import { BarLoader } from 'react-spinners';
import { DivEditProduct } from './styles';

const EditProductPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { product_id } = useParams<{ product_id: string }>();
  const [product, setProduct] = useState<ProductAPI | null>(null);
  const [formData, setFormData] = useState<FormDataInterface>({
    name: '',
    description: '',
    price: '',
    inventory: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await noHeader.get<ProductAPI>(`/product/${product_id}`);
        const data = response.data;
        setProduct(data);
        setSelectedCategories(data.categories.map(category => category.name)); 
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await noHeader.get('/category');
        setAllCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImages = Array.from(event.target.files);
      setImages(newImages);
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryIds = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selectedCategoryIds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const updatedProductData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      inventory: parseInt(formData.inventory),
      categories: selectedCategories,
    };
  
    const formDataToSend = new FormData();
  
    for (const image of images) {
      formDataToSend.append('images', image);
    }
  
    formDataToSend.append('deletedImageIds', JSON.stringify(deletedImageIds));
  
    formDataToSend.append('data', JSON.stringify(updatedProductData));
  
    try {
      const response = await mainApiMultipart.put(`/admin/product/${product_id}`, formDataToSend);
  
      if (response.status === 200) {
        navigate('/homeadm');
      } else if (response.status === 401 || response.status === 403) {
        Swal.fire('Erro', 'Faça login como administrador', 'error');
        navigate('/login');
      } else {
        console.error('Error updating product');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Faça login como administrador.',
        timer: 2000,
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
      navigate('/login');
    }
  }; 

  const handleDeleteImage = (imageId: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Tem certeza que deseja excluir a imagem?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteImage(imageId);
      }
    });
  };

  const deleteImage = async (imageId: number) => {
    try {
      const response = await mainApiMultipart.delete(`/admin/product/images/${imageId}`);
  
      if (response.status === 200 && product) {
        const updatedImages = product.images.filter((image) => image.id !== imageId);
        setProduct({ ...product, images: updatedImages });
        Swal.fire('Imagem excluída com sucesso!', '', 'success');
      } else if (response.status === 401 || response.status === 403) {
        Swal.fire('Erro', 'Faça login como administrador', 'error');
        navigate('/login');
      } else {
        Swal.fire('Erro', 'Faça login como administrador.', 'error');
        navigate('/login');
      }
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        timer: 2000,
        showConfirmButton: true,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showLoaderOnConfirm: true,
      });
      window.location.reload();
    } catch (error) {
      console.error('Erro ao excluir imagem:', error);
      Swal.fire({
        icon: 'error',
        title: 'Faça login como administrador.',
        timer: 2000,
        allowOutsideClick: false,
        allowEscapeKey: false,
      })
      navigate('/login');
    }
  }; 
  
  return (
    <div>
      <Modal />
      {product ? (
        <DivEditProduct>
          <h2>Editar dados do produto</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                name="name"
                className="name"
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
            {/* <div>
              <label>Categoria(s):</label>
              <select
                name="categories"
                value={selectedCategories}
                onChange={handleCategoryChange}
                multiple
              >
                {allCategories.map(category => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div> */}
            <div>
              <label>Preço:</label>
              <input
                type="number"
                step="0.01"
                placeholder="($)"
                name="price"
                className="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Estoque:</label>
              <input
                type="number"
                name="inventory"
                className="inventory"
                value={formData.inventory}
                onChange={handleInputChange}
              />
            </div>
            <div className="div-images">
              <ul>
                <div className="images-container">
                  {product.images && product.images.length > 0 && (
                    product.images.map((image) => (
                      <li key={image.id}>
                        <img src={getImageUrl(image.filename)} alt={`Imagem do produto ${product.name}`} />
                        <button type="button" onClick={() => handleDeleteImage(image.id)}>Excluir</button>
                      </li>
                    ))
                  )}
                </div>
              </ul>
            </div>
            <div className="add">
              <label>Adicionar Nova Imagem:</label>
              <input type="file" className="image" onChange={handleImagesChange} multiple />
            </div>
            <div className="submit">
              <button type="submit">Salvar Alterações</button>
            </div>
          </form>
        </DivEditProduct>
      ) : (
        <Loading>
          <BarLoader color="#000" loading={isLoading} />
        </Loading>
      )}
    </div>
  );
};

export default EditProductPage;