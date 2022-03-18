import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Typography, Skeleton } from '@mui/material';
import OrderCard from './OrderCard/OrderCard';
import './Orders.css';
import BASE_URL from '../../../../url';

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

function Orders({ storeSlug }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios
      .get(`${BASE_URL}/store/${storeSlug}/orders`, config)
      .then((res) => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [storeSlug]);

  return (
    <div className="ordersTab">
      <h1>Orders</h1>
      {history.length === 0 && loading === false
        ? <Typography sx={{ fontSize: 25 }}>No orders to show!</Typography> : <div />}
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
              <OrderCard singleOrder={item} setHistory={setHistory} storeSlug={storeSlug} />
            ))}
          </div>
        )}
    </div>
  );
}

export default Orders;
