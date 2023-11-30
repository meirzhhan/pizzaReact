import React from 'react';
import cl from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={cl.root}>
      <h1>
        <span>💀</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={cl.desription}>К сожалению данная страница отсуствует</p>
    </div>
  );
};

export default NotFoundBlock;
