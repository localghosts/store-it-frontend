import React, { useEffect, useState } from 'react';
import './Store.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuCard from './MenuCard/MenuCard';
import StoreBill from './StoreBill/StoreBill';
import CategoryNav from './CategoryNav/CategoryNav';

const baseURL = 'https://mockcall.herokuapp.com/stores';

function Store() {
  const [, setStoreSlug] = useState();
  const [itemStore, setItemStore] = useState([
    {
      storeName: '',
      storeSlug: '',
      storeLogo: '',
      categories: [
      ],
    }]);

  const slug = useParams();
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setItemStore(
        response.data.filter((option) => option.storeSlug.toLowerCase().includes(slug.storeSlug)),
      );
    })
      .catch((err) => console.log(err));
    setStoreSlug(slug);
  }, [slug]);

  return (
    <div className="storeWrapper">
      <div className="store">
        <div className="store-side">
          <CategoryNav content={itemStore[0]} />
        </div>

        <div className="store-items">
          {itemStore[0].categories.map((item, index) => (
            <MenuCard
              title={item.name}
              imageLink={item.Image}
              itemList={item.products}
              id={index}
              itemStore={itemStore}
              setItemStore={setItemStore}
            />
          ))}
        </div>

        <div className="storebill">
          <StoreBill />
        </div>
      </div>
    </div>
  );
}

export default Store;
