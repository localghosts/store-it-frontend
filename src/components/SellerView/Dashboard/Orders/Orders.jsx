import React from 'react';
import { Typography, Skeleton, Button } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import axios from 'axios';
import OrderCard from './OrderCard/OrderCard';
import './Orders.css';
import theme from '../../../ThemePalette';
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

function Orders({
  storeSlug, history, setHistory, isLoading,
}) {
  const downloadFile = async (data) => {
    const fileName = 'orderHistory';
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios
      .get(`${BASE_URL}/store/${storeSlug}/orderscsv`, config)
      .then((res) => downloadFile(res.data));
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="ordersTab"
        style={{
          borderLeftColor: theme.palette.primary.main,
          padding: '0px 50px',
        }}
      >
        <h1>
          <div className="orderHeading">
            <div className="orderTitle">Orders</div>
            <div><Button variant="contained" sx={{ borderRadius: 3 }} onClick={() => handleDownload()}> Download as CSV</Button></div>
          </div>
        </h1>
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
    </ThemeProvider>
  );
}

export default Orders;
