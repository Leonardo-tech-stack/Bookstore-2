import React, { useEffect, useState } from "react";
import { Order } from "../../types/Order";
import ProductAPI from "../../types/productAPI";
import { noHeader } from "../../services/mainAPI/config";
import Book from "../../assets/images/Book-1.png";
import { ModalContent, ModalOverlay } from "./styles";
import { Div } from './styles';
import User from "../../types/User"; 

interface OrderDetailsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedOrder: Order | null;
  users: { [key: number]: User }; 
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onRequestClose,
  selectedOrder,
  users, 
}) => {
  const [productsDetails, setProductsDetails] = useState<ProductAPI[]>([]);
  const [numProducts, setNumProducts] = useState<number>(0);

  useEffect(() => {
    const fetchProductsDetails = async () => {
      const productsIds = selectedOrder?.products.map((product) => product.productId) || [];
      const fetchedProducts: ProductAPI[] = [];
  
      for (const productId of productsIds) {
        try {
          const response = await noHeader.get(`/product/${productId}`);
          if (response.status === 200) { 
            const productData = response.data;
            fetchedProducts.push(productData);
          } else {
            console.error(`Error fetching product details for ID ${productId}`);
          }
        } catch (error) {
          console.error(`Error fetching product details for ID ${productId}`, error);
        }
      }
  
      setProductsDetails(fetchedProducts);
    };
  
    if (isOpen && selectedOrder) {
      fetchProductsDetails();
      setNumProducts(selectedOrder.products.length);
    }
  }, [isOpen, selectedOrder]);

  if (!isOpen || !selectedOrder) return null;

  const modalHeight = `${Math.min(37.5 + 4 * numProducts, 60)}rem`;

  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <ModalContent style={{ height: modalHeight, overflowY: "auto" }}>
            <Div>
              <h2>Detalhes do Pedido</h2>
              <p>ID do Pedido: <strong>{selectedOrder.id}</strong></p>
              <p>Nome do cliente: <strong>{users[selectedOrder.userId]?.name || "Desconhecido"}</strong></p>
              <p>Email do cliente: <strong>{users[selectedOrder.userId]?.email || "Desconhecido"}</strong></p>

              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Nome</th>
                    <th>Preço ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {productsDetails.map((product) => (
                    <tr key={product.id}>
                      <td><img src={Book}/></td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="total">
                      <span>Valor Total: ${selectedOrder.totalValue}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button onClick={onRequestClose}>Fechar</button>
            </Div>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default OrderDetailsModal;
