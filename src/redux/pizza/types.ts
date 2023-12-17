export type TPizza = {
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

export type TSearchPizzaParams = {
  property: string;
  category: string;
  search: string;
  currentPage: string;
  sortByOrder: string;
};

export interface IPizzaSliceState {
  items: TPizza[];
  status: Status;
}
