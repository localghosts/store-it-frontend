import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OrderCard from './OrderCard/OrderCard';

const baseURL = 'https://mockcall.herokuapp.com/orders';

function Shimmer() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);
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
function OrderHistory({ role }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 1) navigate('./login');
    axios.get(baseURL).then((response) => {
      setHistory(response.data);
      setLoading(false);
    })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="order-history">
      <div className="orderHeading">
        Orders
      </div>
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
