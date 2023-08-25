import Category from "./Category";

interface ProductAPI {
  id: number;
  name: string;
  description: string;
  price: number;
  inventory: number;
  quantity: number;
  categories: Category[];
  image: string;
  images: { id: number; filename: string; productId: number }[];
}

export default ProductAPI;