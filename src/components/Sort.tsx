import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TSort, setSortByOrder, setSortByType } from '../redux/slices/filterSlice';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

export const sortList: TSort[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];
type ISortProps = {
  valueType: TSort;
  valueOrder: string;
};

const Sort: React.FC<ISortProps> = memo(({ valueType, valueOrder }) => {
  const dispatch = useDispatch();
  // const { sortByType, sortByOrder } = useSelector(selectFilter);
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const onClickListItem = (obj: TSort) => {
    dispatch(setSortByType(obj));
    setOpen(false);
  };

  // Клик вне области (mount, unmount)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  // useWhyDidYouUpdate('Sort', { valueType, valueOrder });
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{valueType.name}</span>
        <button
          onClick={() => dispatch(setSortByOrder('asc'))}
          className={valueOrder === 'asc' ? 'activeButton' : ''}>
          ↑
        </button>
        <button
          onClick={() => dispatch(setSortByOrder('desc'))}
          className={valueOrder === 'desc' ? 'activeButton' : ''}>
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
                className={valueType.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
