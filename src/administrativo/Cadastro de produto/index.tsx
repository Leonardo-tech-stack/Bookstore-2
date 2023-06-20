import React, { useState } from 'react';
import Header from '../../components/Header';
import { mainApiMultipart } from '../../pages/Login/mainApi/config';
import { Div, Title, Form } from '../Cadastro de adm/styles';

const ProductRegistrationPage: React.FC = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 1.1,
    inventory: 0,
    categories: ''
  });

  const [images, setImages] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
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
            <input type="text" id="name" name="name" value={productData.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="description">Descrição:</label>
            <input type="text" id="description" name="description" value={productData.description} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="price">Preço:</label>
            <input type="number" id="price" name="price" value={productData.price} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="inventory">Estoque:</label>
            <input type="number" id="inventory" name="inventory" value={productData.inventory} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="categories">Categorias:</label>
            <input type="text" id="categories" name="categories" value={productData.categories} onChange={handleInputChange} />
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
// import React, { useState } from 'react';
// import Header from '../../components/Header';
// import { mainApiMultipart } from '../../pages/Login/mainApi/config';
// import { Div, Title, Form } from '../Cadastro de adm/styles';

// const ProductRegistrationPage: React.FC = () => {
//   const [productData, setProductData] = useState({
//     name: '',
//     description: '',
//     price: 1.1,
//     inventory: 0,
//     categories: ''
//   });

//   const [images, setImages] = useState<File | null>(null);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setProductData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const image = event.target.files[0];
//       setImages(image);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('data', JSON.stringify(productData));

//     if (images) {
//       formData.append('images', images);
//     }

//     try {
//       const response = await mainApiMultipart.post('/product', formData);

//       if (response.status === 201) {
//         alert('Produto cadastrado com sucesso!');
//       } else {
//         alert('Erro ao cadastrar produto!');
//       }
//     } catch (error) {
//       console.error('Erro de conexão', error);
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <Div>
//         <Title>Cadastro de Produto</Title>
//         <Form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Nome:</label>
//             <input type="text" id="name" name="name" value={productData.name} onChange={handleInputChange} />
//           </div>
//           <div>
//             <label htmlFor="description">Descrição:</label>
//             <input type="text" id="description" name="description" value={productData.description} onChange={handleInputChange} />
//           </div>
//           <div>
//             <label htmlFor="price">Preço:</label>
//             <input type="number" id="price" name="price" value={productData.price} onChange={handleInputChange} />
//           </div>
//           <div>
//             <label htmlFor="inventory">Estoque:</label>
//             <input type="number" id="inventory" name="inventory" value={productData.inventory} onChange={handleInputChange} />
//           </div>
//           <div>
//             <label htmlFor="categories">Categorias:</label>
//             <input type="text" id="categories" name="categories" value={productData.categories} onChange={handleInputChange} />
//           </div>
//           <div>
//             <label htmlFor="images">Imagens:</label>
//             <input type="file" id="images" onChange={handleImagesChange} />
//           </div>
//           <button type="submit">Cadastrar</button>
//         </Form>
//       </Div>
//     </div>
//   );
// };

// export default ProductRegistrationPage;
