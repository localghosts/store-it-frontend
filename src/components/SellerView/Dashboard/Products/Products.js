import React from 'react'
import AddProduct from "./AddProducts/AddProduct"
import ProductLog from "./ProductLog/ProductLog" 
import "./Products.css"

const Products = ({active, setActive, products, setProducts}) => {
  return (
    <div className='product'>
        <div>
          {(active==="products")?<ProductLog products={products} setProducts={setProducts}/>:<></>}    
        </div>
        
        <div className="addProduct">
            {(active==="products")?<AddProduct products={products} setProducts={setProducts}/>:<></>}
        </div>
    </div>
  )
}

export default Products
