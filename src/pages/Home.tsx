/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { Categories, Sort, PizzaBlock, PizzaSkeleton, Pagination } from '../components';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '../redux/store';
import { selectPizzaState } from '../redux/pizza/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage, setFilters, setSortByType } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { IFilterSliceState, TSort } from '../redux/filter/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // Пример code splitting. Разделение бандла на чанки для оптимизации
  // динамический import.(чанк(lazy loading))
  import('../utils/math').then((math) => {
    console.log(math.add(16, 26));
  });

  const { items, status } = useSelector(selectPizzaState);
  const { searchValue, categoryId, sortByType, sortByOrder, currentPage } =
    useSelector(selectFilter);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const property = sortByType.sortProperty;
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        property,
        category,
        search,
        currentPage: String(currentPage),
        sortByOrder,
      }),
    );
  };

  // Если это первый рендер, то не вшивается в адресную строчку. Если не первый, то да
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId: categoryId > 0 ? categoryId : 0,
        sortProperty: sortByType.sortProperty,
        sortByOrder,
        currentPage,
      });
      navigate(`?${queryString}`);
      // console.log(queryString);
    }

    isMounted.current = true;
  }, [categoryId, sortByType, sortByOrder, currentPage]);

  // Если был первый рендер, то проверяется URL параметры и сохраняет в тулкит
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          ...params,
        } as unknown as IFilterSliceState),
      );
      dispatch(
        setSortByType({
          name: sortByType.name,
          sortProperty: params.sortProperty,
        } as TSort),
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваются пиццы
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortByType, sortByOrder, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />);
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort valueType={sortByType} valueOrder={sortByOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="cart cart--empty">
          <h2>Произошла ошибка 💀</h2>
          <p>
            К сожалению, не удалось загрузить список пицц. <br /> Попробуйте повторить позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
