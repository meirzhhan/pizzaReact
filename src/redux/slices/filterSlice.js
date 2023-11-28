import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortByType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  sortByOrder: 'desc',
  currentPage: 1,
};

const filterSlice = createSlice({
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
      state.sortByOrder = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.categoryId = Number(action.payload.categoryId);
      state.sortByOrder = action.payload.sortByOrder;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});
export const {
  setCategoryId,
  setSortByType,
  setSortByOrder,
  setCurrentPage,
  setFilters,
  removeFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
