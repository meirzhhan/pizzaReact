import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price';
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sortByType: Sort;
  sortByOrder: string;
  currentPage: number;
}

const initialState: FilterSliceState = {
  searchValue: '',
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
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

export const selectFilter = (state: RootState) => state.filter;

export const {
  setSearchValue,
  setCategoryId,
  setSortByType,
  setSortByOrder,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
