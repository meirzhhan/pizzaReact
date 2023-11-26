import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortByType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  sortyByOrder: 'desc',
  currentPage: 1,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.categoryId = Number(action.payload.categoryId);
      state.sortyByOrder = action.payload.sortyByOrder;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});
export const { setCategoryId, setSortByType, setSortByOrder, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
