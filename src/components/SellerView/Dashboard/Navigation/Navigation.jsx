import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { CircularProgress, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import BASE_URL from '../../../../url';
import theme from '../../../ThemePalette';

function Navigation({ active, setActive, storeSlug }) {
  const [storeInfo, setStoreInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const handleType = (type) => {
    setActive(type);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios
      .get(`${BASE_URL}/store/${storeSlug}`, config)
      .then((res) => {
        setStoreInfo(res.data.store);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [storeSlug]);

  return (
    <ThemeProvider theme={theme}>
      <div className="navigation">
        {loading === false
          ? (
            <div className="navStoreLogo" style={{ borderBottom: '3px solid', borderColor: theme.palette.primary.main }}>
              <img src={storeInfo.storelogo} alt={storeSlug} height={100} />
              <Typography sx={{ fontSize: 30, fontWeight: 'bold', margin: '25px 0px' }}>{storeInfo.storename}</Typography>
            </div>
          )
          : <div className="navStoreLogo"><CircularProgress sx={{ margin: 10 }} /></div>}
        <div className="order-nav nav-btn">
          <Link to={`/seller/${storeSlug}/dashboard/orders`} style={{ textDecoration: 'none', color: red[50] }}>
            <Button
              variant={active === 'orders' ? 'contained' : 'outlined'}
              size="large"
              sx={{ width: 200, height: 50, borderRadius: 5 }}
              onClick={() => handleType('orders')}
            >
              Orders
            </Button>
          </Link>
        </div>
        <div className="category-nav nav-btn">
          <Link to={`/seller/${storeSlug}/dashboard/categories`} style={{ textDecoration: 'none', color: red[50] }}>
            <Button
              variant={active === 'categories' ? 'contained' : 'outlined'}
              size="large"
              sx={{ width: 200, height: 50, borderRadius: 5 }}
              onClick={() => handleType('categories')}
            >
              Categories
            </Button>
          </Link>
        </div>
        <div className="product-nav nav-btn">
          <Link to={`/seller/${storeSlug}/dashboard/products`} style={{ textDecoration: 'none', color: red[50] }}>
            <Button
              variant={active === 'products' ? 'contained' : 'outlined'}
              size="large"
              sx={{ width: 200, height: 50, borderRadius: 5 }}
              onClick={() => handleType('products')}
            >
              Products
            </Button>
          </Link>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Navigation;
