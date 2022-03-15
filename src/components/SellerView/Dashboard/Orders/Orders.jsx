import React from 'react';
import OrderCard from './OrderCard/OrderCard';
import './Orders.css';

const x = {
  buyer: "Buyer's Name",
  orderNumber: '42',
  orderTime: '29th January 2022',
  userProfile: 'https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg',
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
  paidBy: 'Cash on Delivery',
  orderStatus: 'Accepted',
};

function Orders() {
  return (
    <div className="ordersTab">
      <h1>Orders</h1>
      <div className="order">
        <OrderCard history={x} />
      </div>
    </div>
  );
}

export default Orders;
