import React from 'react';
import './CategoryNav.css';

function CategoryNav({ content }) {
  return (
    <div className="category_list">
      <div className="storeName">
        <img className="storeTitle" src={content.storeLogo} alt={content.storeName} />
        <h2 className="storeTitle">{content.storeName}</h2>
      </div>
      <h2 className="heading">Categories</h2>
      <div className="categories_map">
        {content.categories.map((item, index) => (
          <div className="category_item" key={index}><a href={`#${item.name}`} style={{ textDecoration: 'none', color: 'black' }}>{item.name}</a></div>
        ))}
      </div>
    </div>
  );
}

export default CategoryNav;
