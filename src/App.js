import './App.css';
import Navbar from "./components/Navbar/Navbar"
import Content from "./components/Content"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import OrderHistory from './components/BuyerView/OrderHistory/OrderHistory';
import Store from './components/BuyerView/Store/Store';
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/stores" element={<Content/>}/>
        <Route path="/stores/:storeSlug" element={<Store/>}/>
        <Route path="/orders" element={<OrderHistory/>}/>
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
    </>
  );
}

export default App;
