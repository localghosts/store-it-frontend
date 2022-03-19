import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import CatalogItem from './CatalogItem';
import BASE_URL from '../../../url';

export default function Catalog() {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios
      .get(`${BASE_URL}/stores`, config)
      .then((res) => {
        console.log(res.data);
        setStores(res.data);
      });
  }, [setStores]);
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
