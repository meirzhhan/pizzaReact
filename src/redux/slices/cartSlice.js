import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const filterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // actions
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
  },
});
export const { setCategoryId, setSortByType, setSortByOrder, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
