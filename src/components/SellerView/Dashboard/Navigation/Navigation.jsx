import React from 'react';
import Button from '@mui/material/Button';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';

function Navigation({ active, setActive, storeSlug }) {
  const handleType = (type) => {
    setActive(type);
  };

  return (
    <div className="navigation">
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
  );
}

export default Navigation;
