import React from 'react';
import { Skeleton } from '@mui/material';
import AddProduct from './AddProducts/AddProduct';
import ProductLog from './ProductLog/ProductLog';
import './Products.css';

function Products({
  products, setProducts, categories, setCategories, isLoading, storeSlug,
}) {
  return (
    <div className="product">
      <div>
        {isLoading
          ? (
            <div>
              <Skeleton animation="wave" width="80%" height={200} sx={{ margin: '5px auto' }} />
              <Skeleton animation="wave" width="80%" height={60} sx={{ margin: '10px auto' }} />
              <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '10px auto' }} />
              <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '10px auto' }} />
              <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '5px auto' }} />
              <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '10px auto' }} />
              <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '10px auto' }} />
              <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '10px auto' }} />
              <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '5px auto' }} />
            </div>
          )
          : (
            <ProductLog
              products={products}
              setProducts={setProducts}
              categories={categories}
              storeSlug={storeSlug}
              setCategories={setCategories}
            />
          )}
      </div>
      <div>
        <AddProduct
          products={products}
          setProducts={setProducts}
          categories={categories}
          storeSlug={storeSlug}
          setCategories={setCategories}
        />
      </div>
    </div>
  );
}

export default Products;
