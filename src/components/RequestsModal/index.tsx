import React from "react";
import { Order } from "../../types/Order";
import { StyledModal } from './styles'

type OrderModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedUserOrders: Order[];
  userName: string; 
};

const OrderModal: React.FC<OrderModalProps> = ({
    isOpen,
    onRequestClose,
    selectedUserOrders,
    userName,
  }) => {
    return (
        <StyledModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Detalhes do Pedido"
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
        >
            <div>
                <h2>Pedidos de: <span>{userName}</span></h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID do Pedido</th>
                            <th>Valor Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {selectedUserOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.totalValue}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
                <button onClick={onRequestClose}>Fechar</button>
            </div>
        </StyledModal>
    );
};
  
export default OrderModal;
