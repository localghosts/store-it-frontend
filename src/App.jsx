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
import NonExistingPage from './components/NonExistingPage';
import SellerBar from './components/Navbar/SellerBar';

function App() {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(0);
  useEffect(() => {
    if (localStorage.getItem('token')) setAuth(true);
  }, []);
  return (
    <BrowserRouter>
      {(() => {
        if (auth === true) {
          if (role === 0) {
            return <Navbar />;
          }
          return <SellerBar />;
        }
        return <Topbar />;
      })()}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/buyer/stores" element={<Home role={role} setRole={setRole} />} />
        <Route path="/stores/:storeSlug" element={<Store role={role} setRole={setRole} />} />
        <Route path="/buyer/orders" element={<OrderHistory role={role} setRole={setRole} />} />

        <Route path="/seller/:storeSlug/dashboard/:dashboardLink" element={<Dashboard setAuth={setAuth} role={role} setRole={setRole} />} />
        <Route path="/seller/:storeSlug/dashboard" element={<Dashboard setAuth={setAuth} role={role} setRole={setRole} />} />

        <Route path="/login" element={<Login auth={auth} setAuth={setAuth} role={role} setRole={setRole} />} />

        <Route path="*" element={<NonExistingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
