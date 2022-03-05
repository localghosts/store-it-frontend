import React from 'react'
import AddProduct from "./AddProducts/AddProduct"
import ProductLog from "./ProductLog/ProductLog" 
import "./Products.css"

const Products = ({products, setProducts}) => {
  return (
    <div className='product'>
        <div>
          <ProductLog products={products} setProducts={setProducts}/>
        </div>
        
        <div>
          <AddProduct products={products} setProducts={setProducts}/>
        </div>
    </div>
  )
}

export default Products
