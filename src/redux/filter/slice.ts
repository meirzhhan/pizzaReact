import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFilterSliceState, TSort } from './types';

const initialState: IFilterSliceState = {
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
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortByType: (state, action: PayloadAction<TSort>) => {
      state.sortByType = action.payload;
    },
    setSortByOrder: (state, action: PayloadAction<string>) => {
      state.sortByOrder = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilterSliceState>) => {
      state.categoryId = Number(action.payload.categoryId);
      state.sortByOrder = action.payload.sortByOrder;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const {
  setSearchValue,
  setCategoryId,
  setSortByType,
  setSortByOrder,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
