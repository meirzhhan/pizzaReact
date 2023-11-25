import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortByOrder, setSortByType } from '../redux/slices/filterSlice';

const list = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const { sortByType, sortyByOrder } = useSelector((state) => state.filter);

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj) => {
    dispatch(setSortByType(obj));
    setOpen(false);
  };

  return (
    <div className="sort">
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
            {list.map((obj, i) => (
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
