/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  setSortByType,
} from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortByType, sortyByOrder, currentPage } = useSelector(
    (state) => state.filter,
  );

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };
  const fetchPizzas = () => {
    setIsLoading(true);
    const property = sortByType.sortProperty;
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    //mockapi не возвращает все элементы, по этому пагинация будет статично заданным
    axios
      .get(
        `https://655cfbb325b76d9884fe3e3a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${property}&order=${sortyByOrder}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  // Если это первый рендер, то не вшивается в адресную строчку. Если не первый, то да
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty: sortByType.sortProperty,
        sortyByOrder,
        currentPage,
      });
      navigate(`?${queryString}`);
      console.log(queryString);
    }

    isMounted.current = true;
  }, [categoryId, sortByType, sortyByOrder, currentPage]);

  // Если был первый рендер, то проверяется URL параметры и сохраняет в тулкит
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          ...params,
        }),
      );
      dispatch(
        setSortByType({
          name: sortByType.name,
          sortProperty: params.sortProperty,
        }),
      );
      isSearch.current = true;
      // console.log(categoryId, sortByType, sortyByOrder, currentPage);
    }
  }, []);

  // Если был первый рендер, то запрашиваются пиццы
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    window.scrollTo(0, 0);
    isSearch.current = false;
    // isSearch.current(false);
  }, [categoryId, sortByType, sortyByOrder, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => onChangeCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
