import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortByOrder, setSortByType } from '../redux/slices/filterSlice';
import { useRef } from 'react';
import { useEffect } from 'react';

export const sortList = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const { sortByType, sortyByOrder } = useSelector((state) => state.filter);
  const sortRef = useRef();

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj) => {
    dispatch(setSortByType(obj));
    setOpen(false);
  };

  // Клик вне области (mount, unmount)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
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
          className={sortyByOrder === 'asc' ? 'activeButton' : ''}>
          ↑
        </button>
        <button
          onClick={() => dispatch(setSortByOrder('desc'))}
          className={sortyByOrder === 'desc' ? 'activeButton' : ''}>
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
