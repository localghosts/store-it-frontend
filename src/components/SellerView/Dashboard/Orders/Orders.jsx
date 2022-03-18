import React from 'react';
import { Typography, Skeleton } from '@mui/material';
import OrderCard from './OrderCard/OrderCard';
import './Orders.css';

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

function Orders({
  storeSlug, history, setHistory, isLoading,
}) {
  return (
    <div className="ordersTab">
      <h1>Orders</h1>
      {history.length === 0 && isLoading === false
        ? <Typography sx={{ fontSize: 25 }}>No orders to show!</Typography> : <div />}
      {isLoading ? (
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
