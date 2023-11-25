import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortByType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  sortyByOrder: 'desc',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // actions
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortByType: (state, action) => {
      state.sortByType = action.payload;
    },
    setSortByOrder: (state, action) => {
      state.sortyByOrder = action.payload;
    },
  },
});
export const { setCategoryId, setSortByType, setSortByOrder } = filterSlice.actions;

export default filterSlice.reducer;
