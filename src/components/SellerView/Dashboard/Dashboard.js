import React, {useState, useEffect} from 'react'
import Navigation from './Navigation/Navigation'
import Products from './Products/Products'
import "./Dashboard.css"
import { useParams } from 'react-router-dom'

const Dashboard = () => {
  
  const dash=useParams();
  const [active, setActive]=useState("");
  useEffect(()=>{
    setActive(dash["dash"])
  }, [])

  const [products,setProducts] =useState([
    {
      "product":"Mc ALoo Tikki",
      "category":"Burger",
      "price":"50",
      "inStock":true,
    },
    {
      "product":"Mc Veggie",
      "category":"Burger",
      "price":"60",
      "inStock":true,
    }
  ])

  return (
    <div className='dashboard'>
        <div className='navigation'>
            <Navigation active={active} setActive={setActive}/>
        </div>

        <div>
          {(active==="products")?<Products active={active} setActive={setActive} products={products} setProducts={setProducts}/>:<></>}
        </div>

    </div>
  )
}

export default Dashboard
