import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://655cfbb325b76d9884fe3e3a.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('не удалось загрузить данные');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel harum, debitis quae earum non
        voluptates possimus excepturi eligendi! Natus sed at, quod tenetur illo debitis eaque
        tempore consequuntur nemo quas?
      </p>
      <h4>{pizza.price} ₸</h4>
    </div>
  );
};

export default FullPizza;
