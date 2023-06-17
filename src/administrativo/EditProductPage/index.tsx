import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductAPI from '../../types/productAPI';
import Header from '../../components/Header';
import { DivEditProduct } from './styles';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductAPI | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  // const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch(`https://api-ecommerce-livraria.onrender.com/product/${id}`)
      .then(response => response.json())
      .then((data: ProductAPI) => {
        setProduct(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setInventory(data.inventory);
        // setCategories(data.categories);
        console.log(id)
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Enviar os dados atualizados do produto para o servidor
    const updatedProduct = {
      id: product?.id,
      name,
      description,
      price,
      inventory,
      // categories,
    };

    fetch(`https://api-ecommerce-livraria.onrender.com/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(response => {
        if (response.ok) {
          console.log('Product updated successfully');
          // Redirecionar para a página de detalhes do produto
          // history.push(`/product/${id}`);
        } else {
          console.error('Failed to update product');
        }
      })
      .catch(error => console.error(error));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <Header />
     {/* <Header userLoggedIn={true} /> */}

      <DivEditProduct>
        
        <h1>Editar Produto</h1>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price">Preço:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={event => setPrice(Number(event.target.value))}
            />
          </div>
          <div>
            <label htmlFor="inventory">Inventário:</label>
            <input
              type="number"
              id="inventory"
              value={inventory}
              onChange={event => setInventory(Number(event.target.value))}
            />
          </div>
          {/* <div>
            <label htmlFor="categories">Categories:</label>
            <input
              type="text"
              id="categories"
              value={categories.join(',')}
              onChange={event => setCategories(event.target.value.split(','))}
            />
          </div> */}
          <button type="submit">Salvar</button>
        </form>
      </DivEditProduct>
    </div>
  );
};

export default EditProductPage;
