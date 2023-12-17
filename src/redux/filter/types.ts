export type TSort = {
  name: string;
  sortProperty: 'rating' | 'title' | 'price';
};

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  sortByType: TSort;
  sortByOrder: string;
  currentPage: number;
}
