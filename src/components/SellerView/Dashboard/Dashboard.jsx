import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation/Navigation';
import Products from './Products/Products';
import './Dashboard.css';
import Orders from './Orders/Orders';
import Categories from './Categories/Categories';

const baseURLProducts = 'https://mockcall.herokuapp.com/products';
const baseURLCategories = 'https://mockcall.herokuapp.com/categories';

function Dashboard() {
  const dashboard = useParams();
  const [active, setActive] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setActive(dashboard.dashboardLink);

    axios.all([axios.get(baseURLProducts), axios.get(baseURLCategories)]).then((response) => {
      setProducts(response[0].data);
      setCategories(response[1].data);
      setIsLoading(false);
    })
      .catch((err) => console.log(err));
  }, [dashboard]);

  return (
    <div className="dashboard">
      <div className="navigation">
        <Navigation active={active} setActive={setActive} />
      </div>

      <div>
        {(active === 'products') ? <Products products={products} setProducts={setProducts} isLoading={isLoading} /> : <div />}
        {(active === 'orders') ? <Orders /> : <div />}
        {(active === 'categories') ? <Categories categories={categories} setCategories={setCategories} isLoading={isLoading} /> : <div />}
      </div>
    </div>
  );
}

export default Dashboard;
