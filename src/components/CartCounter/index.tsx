import React from 'react';

interface CartItemCountProps {
  itemCount: number;
}

const CartItemCount: React.FC<CartItemCountProps> = ({ itemCount }) => {
  const fontSizeClass = itemCount > 9 ? 'px-1' : 'px-1';

  return (
    <span className={`absolute top-0 right-0 px-3 py-1 font-bold text-white bg-gray-500 rounded-full ${fontSizeClass}`}>
      {itemCount}
    </span>
  );
};

export default CartItemCount;
