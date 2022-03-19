import React, { useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Catalog from './Catalog/Catalog';

function Home({ role }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    if (role !== 0) navigate('/login');
  }, []);
  return (
    <div className="content">
      <div className="contentBanner" />
      <div className="catalogArea">
        <Catalog />
      </div>
    </div>
  );
}

export default Home;
