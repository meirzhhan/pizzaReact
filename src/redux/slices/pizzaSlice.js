import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный Action. это пердается в экстра редюсеры
//mockapi не возвращает все элементы, по этому пагинация будет статично заданным
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { property, category, search, currentPage, sortByOrder } = params;

  const { data } = await axios.get(
    `https://655cfbb325b76d9884fe3e3a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${property}&order=${sortByOrder}${search}`,
  );
  // console.log(thunkAPI.getState());

  // if (data.length === 0) {
  //   return thunkAPI.rejectWithValue('Нет списка пицц');
  // }

  // return thunkAPI.fulfillWithValue(data);
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        // console.log(action, 'fullfilled');
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        // console.log(action, 'rejected');
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzaState = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
