import React from 'react';
import AppContext from '../context';

export const useTotalSum = () => {
  const { cartClothes, setCartClothes } = React.useContext(AppContext);
  const totalPrice = cartClothes.reduce((sum, obj) => obj.price + sum, 0);
  return { cartClothes, setCartClothes, totalPrice };
};