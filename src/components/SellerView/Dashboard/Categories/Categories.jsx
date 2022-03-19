import React from 'react';
import { Skeleton } from '@mui/material';
import AddCategory from './AddCategory/AddCategory';
import CategoryLog from './CategoryLog/CategoryLog';
import './Categories.css';

function Categories({
  categories, setCategories, isLoading, storeSlug,
}) {
  return (
    <div className="category">
      <div>
        {isLoading
          ? (
            <div className="loadingLog">
              <Skeleton animation="wave" width="25vw" height={70} sx={{ margin: '10px 0px -20px 90px' }} />
              <div className="loadingList">
                <div><Skeleton animation="wave" width="17vw" height={300} sx={{ margin: '0px auto', borderRadius: 5 }} /></div>
                <div><Skeleton animation="wave" width="17vw" height={300} sx={{ margin: '0px auto', borderRadius: 5 }} /></div>
                <div><Skeleton animation="wave" width="17vw" height={300} sx={{ margin: '0px auto', borderRadius: 5 }} /></div>
                <div><Skeleton animation="wave" width="17vw" height={300} sx={{ margin: '0px auto', borderRadius: 5 }} /></div>
              </div>
            </div>
          )
          : (
            <CategoryLog
              categories={categories}
              setCategories={setCategories}
              storeSlug={storeSlug}
            />
          )}
      </div>

      <div>
        <AddCategory setCategories={setCategories} storeSlug={storeSlug} />
      </div>
    </div>
  );
}

export default Categories;
