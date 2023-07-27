import User from "./User";
export interface Order {
    id: number;
    userId: number;
    totalValue: number;
    couponId: number | null;
    products: {
      quantity: number;
      discount: number | null;
      orderId: number;
      productId: number;
    }[];
    user: User;
}