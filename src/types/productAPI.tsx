interface ProductAPI {
  id: number;
  name: string;
  description: string;
  price: number;
  inventory: number;
  categories: string[];
  image: File | null;
}

export default ProductAPI;