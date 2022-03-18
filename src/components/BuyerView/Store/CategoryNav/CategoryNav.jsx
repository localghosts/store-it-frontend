import React from 'react';
import './CategoryNav.css';

function CategoryNav({ itemStore }) {
  return (
    <div className="category_list">
      <div className="storeName">
        <img className="storeTitle" src={itemStore.store.storelogo} alt={itemStore.store.storename} height={100} />
        <h2 className="storeTitle">{itemStore.store.storename}</h2>
      </div>
      <h2 className="heading">Categories</h2>
      <div className="categories_map">
        {itemStore.categories.map((item) => (
          <div className="category_item"><a href={`#${item.name}`} style={{ textDecoration: 'none', color: 'black' }}>{item.name}</a></div>
        ))}
      </div>
    </div>
  );
}

export default CategoryNav;
