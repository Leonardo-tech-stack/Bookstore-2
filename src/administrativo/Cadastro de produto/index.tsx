import React, { useState } from 'react';
import Header from '../../components/Header';
import { DiVCadastroProduto, Form } from "./styles"

const CadastroProduto: React.FC = () => {
  // const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');
  const [category, setCategory] = useState('');

  const handleCadastro = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const formData = new FormData();
    // formData.append('id', id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('inventory', inventory);
    formData.append('category', category);

    fetch('https://api-ecommerce-livraria.onrender.com/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          // Processar a resposta de sucesso (se necessário)
          console.log('Produto cadastrado com sucesso!');
        } else {
          console.error('Falha ao cadastrar o produto');
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
    <Header />
     {/* <Header userLoggedIn={true} /> */}
      
      <DiVCadastroProduto>
        <h1>Cadastro de Produto</h1>
    
        <Form className="--bs-primary-rgb" onSubmit={handleCadastro}>
          {/* <div>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" value={id} onChange={e => setId(e.target.value)} />
          </div> */}

          <div>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div>
          <label htmlFor="description">Descrição:</label>
          <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          
          <div>
            <label htmlFor="price">Preço:</label>
            <input type="text" id="price" value={price} onChange={e => setPrice(e.target.value)} />
          </div>

          <div>
            <label htmlFor="inventory">Estoque:</label>
            <input type="text" id="inventory" value={inventory} onChange={e => setInventory(e.target.value)} />
          </div>

          <div>
            <label htmlFor="category">Categoria:</label>
            <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} />
          </div>

          <div>
           <button type="submit">Cadastrar</button>
          </div>
        </Form>
      </DiVCadastroProduto>
    </div>
  );
};

export default CadastroProduto;
