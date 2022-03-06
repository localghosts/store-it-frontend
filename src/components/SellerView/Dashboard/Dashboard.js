import React, {useState, useEffect} from 'react'
import Navigation from './Navigation/Navigation'
import Products from './Products/Products'
import "./Dashboard.css"
import { useParams } from 'react-router-dom'
import Orders from './Orders/Orders'
import Categories from './Categories/Categories'
import axios from 'axios'

const baseURL_products="https://mockcall.herokuapp.com/products"
const baseURL_categories="https://mockcall.herokuapp.com/categories"

const Dashboard = () => {
  
  const dashboard=useParams();
  const [active, setActive]=useState("");
  const [products,setProducts] =useState([])
  const [categories, setCategories] = useState([])


  useEffect(()=>{
    setActive(dashboard["dashboardLink"])

    axios.all([axios.get(baseURL_products), axios.get(baseURL_categories)]).then((response)=>{
      setProducts(response[0].data)
      setCategories(response[1].data)
    })
    .catch(err=>console.log(err))

  }, [dashboard])


  return (
    <div className='dashboard'>
        <div className='navigation'>
            <Navigation active={active} setActive={setActive}/>
        </div>

        <div>
        {(active === "products") ? <Products products={products} setProducts={setProducts}/>:<></>}
        {(active==="orders")? <Orders />:<></>}
        {(active==="categories")?<Categories categories={categories} setCategories={setCategories}/>:<></>}
        </div>
    </div>
  )
}

export default Dashboard
