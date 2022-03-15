import * as React from 'react';
import CatalogItem from './CatalogItem';

export default function Catalog() {
  const stores = [
    {
      name: "Domino's",
      description: "The authentic taste of Pizza in Domino's style inside IITK campus",
      imgDir: 'https://images.unsplash.com/photo-1544067963-8a045010edcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    },
    {
      name: 'Nobel Book Stall',
      description: 'Books and stationery shop inside IITK campus',
      imgDir: 'https://images.unsplash.com/photo-1544067963-8a045010edcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    },
    {
      name: 'Adarsh Bakery',
      description: 'Bakery shop inside IITK campus',
      imgDir: 'https://images.unsplash.com/photo-1544067963-8a045010edcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    },
    {
      name: 'Utsav Cloth House',
      description: 'Garments shop inside IITK campus',
      imgDir: 'https://images.unsplash.com/photo-1544067963-8a045010edcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    },
    {
      name: 'FreshVeggie',
      description: 'Grocery shop inside IITK campus',
      imgDir: 'https://images.unsplash.com/photo-1544067963-8a045010edcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
    },
  ];
  return (
    <div className="catalog">
      {stores.map((store) => (
        <div className="catalogTile">
          <CatalogItem store={store} />
        </div>
      ))}
    </div>
  );
}
