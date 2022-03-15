import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import axios from 'axios';
import OrderCard from './OrderCard/OrderCard';

const baseURL = 'https://mockcall.herokuapp.com/orders';

function OrderHistory() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setHistory(response.data);
    })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="order-history">
      <div className="orderHeading">
        Orders
      </div>
      <div className="orders">
        {history.map((item) => (
          <OrderCard history={item} />
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
