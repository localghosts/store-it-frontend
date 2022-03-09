import React from 'react';
import AddProduct from './AddProducts/AddProduct';
import ProductLog from './ProductLog/ProductLog';
import './Products.css';

function Products({ products, setProducts }) {
  return (
    <div className="product">
      <div>
        <ProductLog products={products} setProducts={setProducts} />
      </div>
      <div>
        <AddProduct products={products} setProducts={setProducts} />
      </div>
    </div>
  );
}

export default Products;
