import { TCartItems } from '../redux/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items: TCartItems[] = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
