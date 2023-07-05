import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mainApiJson, mainApiMultipart, noHeader } from '../../../services/mainAPI/config';
import ProductAPI from '../../../types/productAPI';
import NavbarNavigation from '../../../components/Navbar/NavbarNavigatio';
import Modal from '../../../components/Modal';

const EditProductPage: React.FC = () => {
  const { id } = useParams<string>(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductAPI>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    inventory: 0,
    quantity: 0,
    categories: [],
    image: '',
  });
  
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductAPI[]>([]);

  useEffect(() => {
    mainApiMultipart
      .get(`/product/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch product:', error);
      });

    noHeader
      .get('/category') //erro
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch categories:', error);
      });
  }, [id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    mainApiJson
      .put(`/category/${selectedCategory}`)
      .then(response => {
        setCategoryProducts(response.data);
      })
      .catch(error => {
        console.error(`Failed to fetch products for category ${selectedCategory}:`, error);
      });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setProduct(prevProduct => ({
      ...prevProduct,
      image: file instanceof File ? URL.createObjectURL(file) : '',
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', String(product.price));
    formData.append('description', product.description);
    formData.append('inventory', String(product.inventory));
    product.categories.forEach(category => {
      formData.append('categories', category);
    });
    if (product.image) {
      formData.append('image', product.image);
    }

    mainApiMultipart
      .put(`/product/${id}`, formData)
      .then(() => {
        alert('Sucesso');
        navigate('/homeadm');
      })
      .catch(error => {
        console.error('Failed to update product:', error);
      });
  };

  return (
    <div>
      {/* <NavbarNavigation
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onChangeSearch={handleChangeSearch} 
      /> */}
      <h1>Em breve...</h1>
      {/* <Modal />
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
          <select id="categories" name="categories" value={product.categories[0]} onChange={handleCategoryChange}>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="categoryProducts">Produtos da Categoria:</label>
          <ul id="categoryProducts">
            {categoryProducts.map(categoryProduct => (
              <li key={categoryProduct.id}>{categoryProduct.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <label htmlFor="image">Imagem:</label>
          <input type="file" id="image" name="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Salvar</button>
      </form> */}
    </div>
  );
};

export default EditProductPage;
