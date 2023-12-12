import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export type SearchPizzaParams = {
  property: string;
  category: string;
  search: string;
  currentPage: string;
  sortByOrder: string;
};

// Record<string, string> все его ключи строчки, всего значения намбер
// Асинхронный Action. это пердается в экстра редюсеры
//mockapi не возвращает все элементы, по этому пагинация будет статично заданным
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>( //<Returned, ThunkArg = void>
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { property, category, search, currentPage, sortByOrder } = params;

    const { data } = await axios.get<Pizza[]>( // Типизация axios
      `https://655cfbb325b76d9884fe3e3a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${property}&order=${sortByOrder}${search}`,
    );

    return data;
  },
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        // console.log(action, 'fullfilled');
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        // console.log(action, 'rejected');
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaState = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
