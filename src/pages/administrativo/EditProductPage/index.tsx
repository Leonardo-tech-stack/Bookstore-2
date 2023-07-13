import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { noHeader, mainApiMultipart } from '../../../services/mainAPI/config';
import { Loading } from '../../../styles/loading';
import Swal from 'sweetalert2';

const EditProduct: React.FC = () => {
  // const { product_id } = useParams();
  // const navigate = useNavigate();
  // const [product, setProduct] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   description: '',
  //   price: 0,
  //   inventory: 0,
  //   categories: [],
  // });

  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   fetchProduct();
  // }, []);

  // const fetchProduct = async () => {
  //   try {
  //     const response = await noHeader.get(`/product/${product_id}`);
  //     const data = response.data;
  //     setProduct(data);
  //     setFormData({
  //       name: data.name,
  //       description: data.description,
  //       price: data.price,
  //       inventory: data.inventory,
  //       categories: data.categories,
  //     });
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching product:', error);
  //   }
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = event.target;
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };  

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append('name', formData.name);
  //     formData.append('description', formData.description);
  //     formData.append('price', formData.price);
  //     formData.append('inventory', formData.inventory);
  //     formData.append('categories', formData.categories);
  
  //     // Adicione as imagens ao FormData
  //     images.forEach((image) => {
  //       formData.append('images', image);
  //     });
  
  //     const response = await mainApiMultipart.post(`/admin/product/${product_id}/images`, formData, {
  //     });
  //     if (response.status === 200) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Produto atualizado com sucesso!',
  //         timer: 2000,
  //         showConfirmButton: true,
  //         showCancelButton: false,
  //         allowOutsideClick: false,
  //         allowEscapeKey: false,
  //         showLoaderOnConfirm: true,
  //       }).then(() => {
  //         navigate('/homeadm');
  //       });
  //     } else {
  //       console.error('Failed to update product');
  //     }
  //   } catch (error: any) {
  //     console.error(error);
  //     if (error.response && (error.response.status === 403 || error.response.status === 401)) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Erro na requisição',
  //         text: 'Faça login como administrador',
  //         timer: 2000,
  //       });
  //     }
  //   }
  // };  

  // const handleImageChange = (event) => {
  //   const fileList = Array.from(event.target.files);
  //   setImages(fileList);
  // };  

  return (
    <div>
      {/* {isLoading ? (
        <Loading>
          <BarLoader color="#000" loading={isLoading} />
        </Loading>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h2>Editar Produto</h2>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              className="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Descrição:</label>
            <textarea
              className="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price">Preço:</label>
            <input
              type="number"
              className="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="inventory">Estoque:</label>
            <input
              type="number"
              className="inventory"
              name="inventory"
              value={formData.inventory}
              onChange={handleInputChange}
            />
          </div> */}
          {/* <div>
            <label htmlFor="categories">Categorias:</label>
            <input
              type="text"
              className="categories"
              name="categories"
              value={formData.categories}
              onChange={handleInputChange}
            />
          </div> */}
            {/* <div>
              <label htmlFor="images">Imagens:</label>
              <input
                type="file"
                multiple
                className="images"
                name="images"
                onChange={handleImageChange}
              />
            </div>
          <button type="submit">Salvar</button>
        </form>
      )} */}
    </div>
  );
};

export default EditProduct;
