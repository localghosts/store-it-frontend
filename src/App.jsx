import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import OrderHistory from './components/BuyerView/OrderHistory/OrderHistory';
import Store from './components/BuyerView/Store/Store';
import Dashboard from './components/SellerView/Dashboard/Dashboard';
import Login from './components/Login-SignUp/Login';
import Topbar from './components/Navbar/Topbar';
import SellerBar from './components/Navbar/SellerBar';

function App() {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(0);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuth(true);
      setRole(Number(localStorage.getItem('role')));
    } else { setAuth(false); }
  }, [setAuth, setRole]);

  return (
    <BrowserRouter>
      {(() => {
        if (auth === true) {
          if (role === 0) {
            return <Navbar setAuth={setAuth} setRole={setRole} />;
          }
          return <SellerBar setAuth={setAuth} setRole={setRole} />;
        }
        return <Topbar />;
      })()}
      {(() => {
        if (auth) {
          if (role === 0) {
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
          if (role === 1) {
            return (
              <Routes>
                <Route path="/" element={<Navigate to={`/seller/${window.localStorage.getItem('storeSlug')}/dashboard`} />} />
                <Route path={`/seller/${window.localStorage.getItem('storeSlug')}/dashboard`} element={<Dashboard />} />
                <Route path={`/seller/${window.localStorage.getItem('storeSlug')}/dashboard`} element={<Dashboard />} />
                <Route path="*" element={<Navigate to={`/seller/${window.localStorage.getItem('storeSlug')}/dashboard`} />} />
              </Routes>
            );
          }
        }

        return (
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login auth={auth} setAuth={setAuth} role={role} setRole={setRole} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        );
      })()}
    </BrowserRouter>
  );
}

export default App;
