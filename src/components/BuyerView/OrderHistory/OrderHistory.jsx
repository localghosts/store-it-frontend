import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import OrderCard from './OrderCard/OrderCard';
import './OrderHistory.css';

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const history = [
  {
    storeName: 'Mc Donalds',
    orderDate: '29th January 2022',
    storeSlug: 'mcdonalds',
    storeLogo: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/000000/external-mcdonald-corporation-an-american-fast-food-company-food-color-tal-revivo.png',
    products: [
      {
        name: 'Big Mac',
        price: '50',
        quantity: 1,
      },
      {
        name: 'Mc Aloo Tikki',
        price: '40',
        quantity: 1,
      },
      {
        name: 'Medium Meal',
        price: '50',
        quantity: 1,
      },
      {
        name: 'Large Meal',
        price: '40',
        quantity: 1,
      },
      {
        name: 'Pepsi',
        price: '50',
        quantity: 1,
      },
      {
        name: 'Coke',
        price: '40',
        quantity: 1,
      },
    ],
    total: '270',
    address: 'G-271, Hall-3',
    paidBy: 'Cash',
    orderStatus: 'Accepted',
  },
];

function OrderHistory() {
  return (
    <div className="order-history">
      <div className="sidebar top-btn">
        <Link to="/stores" style={{ textDecoration: 'none', color: blue[500] }} className="order-btn">
          <Button variant="outlined" className="top-btn" sx={{ borderRadius: 10, border: 1, fontSize: 16 }}>
            <div className="order-title">
              Go to Home
            </div>
          </Button>
        </Link>
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
