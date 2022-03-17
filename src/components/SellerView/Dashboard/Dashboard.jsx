import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation/Navigation';
import Products from './Products/Products';
import './Dashboard.css';
import Orders from './Orders/Orders';
import Categories from './Categories/Categories';
import BASE_URL from '../../../url';

function Dashboard({ setAuth, role }) {
  const dashboard = useParams();
  const [active, setActive] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeSlug, setStoreSlug] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.token) setAuth(true);
    if (role === 0) navigate('/buyer/stores');
    setActive(dashboard.dashboardLink);
    setStoreSlug(dashboard.storeSlug);
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios.get(`${BASE_URL}/store/${dashboard.storeSlug}/category`, config).then((response) => {
      setCategories(response.data);
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
        {(active === 'orders') ? <Orders /> : <div />}
        {(active === 'categories') ? <Categories categories={categories} setCategories={setCategories} isLoading={isLoading} storeSlug={storeSlug} /> : <div />}
      </div>
    </div>
  );
}

export default Dashboard;
