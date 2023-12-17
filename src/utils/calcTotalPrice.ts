import { TCartItems } from '../redux/cart/types';

export const calcTotalPrice = (items: TCartItems[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
