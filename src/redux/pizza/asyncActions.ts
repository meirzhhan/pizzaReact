// Record<string, string> все его ключи строчки, всего значения намбер
// Асинхронный Action. это пердается в экстра редюсеры

import { createAsyncThunk } from '@reduxjs/toolkit';
import { TPizza, TSearchPizzaParams } from './types';
import axios from 'axios';

//mockapi не возвращает все элементы, по этому пагинация будет статично заданным
export const fetchPizzas = createAsyncThunk<TPizza[], TSearchPizzaParams>( //<Returned, ThunkArg = void>
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { property, category, search, currentPage, sortByOrder } = params;

    const { data } = await axios.get<TPizza[]>( // Типизация axios
      `https://655cfbb325b76d9884fe3e3a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${property}&order=${sortByOrder}${search}`,
    );

    return data;
  },
);
