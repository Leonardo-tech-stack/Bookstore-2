interface ProductAPI {
  id: number;
  name: string;
  description: string;
  price: number;
  inventory: number;
  quantity: number;
  categories: string[];
  image: string;
}

export default ProductAPI;