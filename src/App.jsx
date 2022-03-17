import './App.css';
import React, { useState } from 'react';
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

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <BrowserRouter>
      {auth ? <Navbar auth={auth} setAuth={setAuth} /> : <Topbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/stores" element={<Home />} />
        <Route path="/stores/:storeSlug" element={<Store />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/seller/:storeSlug/dashboard/:dashboardLink" element={<Dashboard setAuth={setAuth} />} />
        <Route path="/seller/:storeSlug/dashboard" element={<Dashboard setAuth={setAuth} />} />
        <Route path="/login" element={<Login auth={auth} setAuth={setAuth} />} />
        <Route path="*" element={<NonExistingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
