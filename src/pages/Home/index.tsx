import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductAPI from '../../types/productAPI';
import { Body, Products } from './styles';

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductAPI[]>([]);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [searchResults, setSearchResults] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerInterval = 7000;
  // const bannerInterval = 7000 * 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/product');
        const productsData: ProductAPI[] = response.data;

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, bannerInterval);

    return () => {
      clearInterval(bannerTimer);
    };
  }, [products]);

  const getImageUrl = (filename: string) => {
    return `/images/${filename}`;
  };

  // const handleSearch = async () => {
  //   try {
  //     setIsSearching(true);

  //     const response = await axios.get(`/product/search/${searchQuery}`, {});

  //     setSearchResults(response.data);
  //     setIsSearching(false);
  //     console.log('Search successful');
  //   } catch (error) {
  //     console.error('Search failed', error);
  //     setIsSearching(false);
  //   }
  // };

  // const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(event.target.value);
  // };

  const getBannerProducts = () => {
    const endIndex = bannerIndex + 3;
    const slicedProducts = products.slice(bannerIndex, endIndex);
    const remainingProducts = slicedProducts.length < 3 ? products.slice(0, 3 - slicedProducts.length) : [];
    return [...slicedProducts, ...remainingProducts];
  };

  return (
    <Body>
      <Products>
        <h2>Nossas últimas aquisições</h2>
        <div className="products-container">
          {getBannerProducts().map((product: ProductAPI) => (
            <div className="product" key={product.id}>
              <Link to={`/product/${product.id}`}>
                {/* <img src={getImageUrl(product.image)} alt={product.name} /> */}
                <img src={getImageUrl(product.image)} />
                <h1>{product.name}</h1>
                <p>$ {product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </Products>
    </Body>
  );
};

export default Home;
