import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setSortByOrder, setSortByType } from '../redux/slices/filterSlice';
import { useRef } from 'react';
import { useEffect } from 'react';

type SortListItem = {
  name: string;
  sortProperty: string;
};

export const sortList: SortListItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const { sortByType, sortByOrder } = useSelector(selectFilter);
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const onClickListItem = (obj: SortListItem) => {
    dispatch(setSortByType(obj));
    setOpen(false);
  };

  // Клик вне области (mount, unmount)
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortByType.name}</span>
        <button
          onClick={() => dispatch(setSortByOrder('asc'))}
          className={sortByOrder === 'asc' ? 'activeButton' : ''}>
          ↑
        </button>
        <button
          onClick={() => dispatch(setSortByOrder('desc'))}
          className={sortByOrder === 'desc' ? 'activeButton' : ''}>
          ↓
        </button>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sortByType.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
