import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import axios from 'axios';
import { Skeleton, Typography } from '@mui/material';
import OrderCard from './OrderCard/OrderCard';
import BASE_URL from '../../../url';

function Shimmer() {
  return (
    <div>
      <Skeleton variant="circular" width={100} height={100} />
      <Skeleton animation="wave" width={200} height={100} sx={{ margin: '10px 0px' }} />
      <Skeleton animation="wave" width={200} height={40} sx={{ margin: '10px 0px' }} />
      <Skeleton animation="wave" width={200} sx={{ margin: '10px 0px' }} />
      <Skeleton animation="wave" width={200} sx={{ margin: '10px 0px' }} />
      <Skeleton animation="wave" width={200} sx={{ margin: '10px 0px' }} />
      <Skeleton animation="wave" width={200} height={100} sx={{ margin: '10px 0px' }} />
      <Skeleton animation="wave" width={200} height={40} sx={{ margin: '10px 0px' }} />
      <Skeleton animation="wave" width={200} sx={{ margin: '10px 0px' }} />
      <Skeleton animation="wave" width={200} sx={{ margin: '10px 0px' }} />
      <Skeleton animation="wave" width={200} sx={{ margin: '10px 0px' }} />
    </div>
  );
}
function OrderHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios.get(`${BASE_URL}/orders`, config)
      .then((res) => {
        setHistory(res.data.sort((a, b) => b.orderID - a.orderID));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="order-history">
      <div className="orderHeading">
        Orders
      </div>
      {history.length === 0 && loading === false
        ? <div><Typography sx={{ fontSize: 25 }}>No orders to show!</Typography></div>
        : <div />}
      {loading ? (
        <div className="orders">
          <Shimmer />
          <Shimmer />
          <Shimmer />
          <Shimmer />
        </div>
      )
        : (
          <div className="orders">
            {history.map((item) => (
              <OrderCard history={item} />
            ))}
          </div>
        )}
    </div>
  );
}

export default OrderHistory;
