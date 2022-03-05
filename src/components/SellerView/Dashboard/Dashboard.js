import React, {useState, useEffect} from 'react'
import Navigation from './Navigation/Navigation'
import Products from './Products/Products'
import "./Dashboard.css"
import { useParams } from 'react-router-dom'
import Orders from './Orders/Orders'
// import Categories from './Categories/Categories'

const Dashboard = () => {
  
  const dashboard=useParams();
  const [active, setActive]=useState("");
  useEffect(()=>{
    setActive(dashboard["dashboardLink"])
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

  const [categories, setCategories] = useState([
    {
      title: "Pizza",
      description: "A wide variety of mouth-watering pizzas in three categories : small, medium and large.",
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      status: true
    },
    {
      title: "Extras",
      description: "Breadsticks, dips, desserts and many more to compliment your delicious Pizza meal !!",
      img: "https://images.unsplash.com/photo-1469648034646-7911874fe62b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YXJsaWMlMjBicmVhZHxlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60",
      status: true
    },
    {
      title: "Beverages",
      description: "A wide range of hot and cold beverages to complete your perfect meal.",
      img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmV2ZXJhZ2VzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      status: true
    }
  ])

  return (
    <div className='dashboard'>
        <div className='navigation'>
            <Navigation active={active} setActive={setActive}/>
        </div>

        <div>
        {(active === "products") ? <Products products={products} setProducts={setProducts} /> : <></>}
        {(active==="orders")? <Orders />:<></>}
        
          {/* {(active==="categories")?<Categories categories={categories} setCategories={setCategories}/>:<></>} */}
        </div>

    </div>
  )
}

export default Dashboard
