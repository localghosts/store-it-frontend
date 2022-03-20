import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation/Navigation';
import Products from './Products/Products';
import './Dashboard.css';
import Orders from './Orders/Orders';
import Categories from './Categories/Categories';
import BASE_URL from '../../../url';

function Dashboard() {
  const dashboard = useParams();
  const [active, setActive] = useState('orders');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeSlug, setStoreSlug] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setStoreSlug(localStorage.getItem('storeSlug'));
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios.all([axios.get(`${BASE_URL}/store/${localStorage.getItem('storeSlug')}/category`, config),
      axios.get(`${BASE_URL}/store/${localStorage.getItem('storeSlug')}/orders`, config)])
      .then((res) => {
        setCategories(res[0].data.sort((a, b) => b.categoryID - a.categoryID));
        setHistory(res[1].data.sort((a, b) => b.orderID - a.orderID));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [dashboard]);

  return (
    <div className="dashboard">
      <div className="navigation">
        <Navigation active={active} setActive={setActive} storeSlug={storeSlug} />
      </div>

      <div>
        {(active === 'products')
          ? (
            <Products
              categories={categories}
              setCategories={setCategories}
              storeSlug={storeSlug}
              isLoading={isLoading}
            />
          )
          : <div />}
        {(active === 'orders') ? <Orders storeSlug={storeSlug} history={history} setHistory={setHistory} isLoading={isLoading} /> : <div />}
        {(active === 'categories') ? <Categories categories={categories} setCategories={setCategories} isLoading={isLoading} storeSlug={storeSlug} /> : <div />}
      </div>
    </div>
  );
}

export default Dashboard;
