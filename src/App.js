import './App.css';
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import OrderHistory from './components/BuyerView/OrderHistory/OrderHistory';
import Store from './components/BuyerView/Store/Store';
import Dashboard from './components/SellerView/Dashboard/Dashboard';
import Login from './components/Login-SignUp/Login'
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate to="/stores"/>}/>
        <Route path="/stores" element={<Home/>}/>
        <Route path="/stores/:storeSlug" element={<Store/>}/>
        <Route path="/orders" element={<OrderHistory/>}/>
        <Route path="/seller/dashboard/:dashboardLink" element={<Dashboard/>}/>
        <Route path='/seller/dashboard' element={<Navigate to="/seller/dashboard/orders"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem", fontSize: "2em", display:"flex", justifyContent:"center", alignItems:"center" }}>
              <p>Oops!!! No such page found!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
    <Login/>
    </>
  );
}

export default App;
