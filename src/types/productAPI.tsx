interface ProductAPI {
  id: number;
  name: string;
  description: string;
  price: number;
  inventory: number;
  quantity: number;
  category: string;
  categories: string[];
  image: string;
}

export default ProductAPI;