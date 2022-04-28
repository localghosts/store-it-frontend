import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import OrderHistory from './components/BuyerView/OrderHistory/OrderHistory';
import Store from './components/BuyerView/Store/Store';
import Dashboard from './components/SellerView/Dashboard/Dashboard';
import Login from './components/LoginSignUp/Login';
import Topbar from './components/Navbar/Topbar';
import SellerBar from './components/Navbar/SellerBar';
import BASE_URL from './url';

function App() {
  const AppAuthStatus = {
    CHECKING_AUTH: 0,
    NOT_AUTHENTICATED: 1,
    AUTHENTICATED_AS_BUYER: 2,
    AUTHENTICATED_AS_SELLER: 3,
  };

  const [role, setRole] = useState(0);
  const [appAuthStatus, setAppAuthStatus] = useState(AppAuthStatus.CHECKING_AUTH);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      axios
        .get(`${BASE_URL}`, config)
        .then()
        .catch(() => {
          setAppAuthStatus(AppAuthStatus.NOT_AUTHENTICATED);
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('storeSlug');
          alert('You have been logged out due to inactivity!');
        });
      if (Number(localStorage.getItem('role')) === 0) {
        setRole(0);
        setAppAuthStatus(AppAuthStatus.AUTHENTICATED_AS_BUYER);
      } else if (Number(localStorage.getItem('role')) === 1) {
        setRole(1);
        setAppAuthStatus(AppAuthStatus.AUTHENTICATED_AS_SELLER);
      } else {
        localStorage.removeItem('token');
        setAppAuthStatus(AppAuthStatus.NOT_AUTHENTICATED);
      }
    } else {
      setAppAuthStatus(AppAuthStatus.NOT_AUTHENTICATED);
    }
  }, [setAppAuthStatus, setRole]);

  return (
    <BrowserRouter>
      {(() => {
        if (appAuthStatus === AppAuthStatus.AUTHENTICATED_AS_BUYER) {
          return <Navbar setAppAuthStatus={setAppAuthStatus} />;
        }
        if (appAuthStatus === AppAuthStatus.AUTHENTICATED_AS_SELLER) {
          return <SellerBar setAppAuthStatus={setAppAuthStatus} />;
        }
        return <Topbar />;
      })()}
      {(() => {
        if (appAuthStatus === AppAuthStatus.AUTHENTICATED_AS_BUYER) {
          return (
            <Routes>
              <Route path="/" element={<Navigate to="/buyer/stores" />} />
              <Route path="/buyer/stores" element={<Home />} />
              <Route path="/stores/:storeSlug" element={<Store />} />
              <Route path="/buyer/orders" element={<OrderHistory />} />
              <Route path="*" element={<Navigate to="/buyer/stores" />} />
            </Routes>
          );
        }
        if (appAuthStatus === AppAuthStatus.AUTHENTICATED_AS_SELLER) {
          return (
            <Routes>
              <Route path="/" element={<Navigate to={`/seller/${window.localStorage.getItem('storeSlug')}/dashboard`} />} />
              <Route path={`/seller/${window.localStorage.getItem('storeSlug')}/dashboard`} element={<Dashboard />} />
              <Route path={`/seller/${window.localStorage.getItem('storeSlug')}/dashboard`} element={<Dashboard />} />
              <Route path="*" element={<Navigate to={`/seller/${window.localStorage.getItem('storeSlug')}/dashboard`} />} />
            </Routes>
          );
        }
        if (appAuthStatus === AppAuthStatus.NOT_AUTHENTICATED) {
          return (
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login setAppAuthStatus={setAppAuthStatus} role={role} setRole={setRole} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          );
        }
        return <div>Loading...</div>;
      })()}
    </BrowserRouter>
  );
}

export default App;
