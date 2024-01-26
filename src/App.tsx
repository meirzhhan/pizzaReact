import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';

// динамический импорт(lazy loading)
const Cart = React.lazy(() => import(/*webpackChunkName: "Cart" */ './pages/Cart')); // import Cart from './pages/Cart';
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza" */ './pages/FullPizza')); // import FullPizza from './pages/FullPizza';
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound" */ './pages/NotFound')); // import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div>Загрузка корзины...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
