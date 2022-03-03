import React, { useEffect, useState } from 'react'
import "./Store.css"
import StoreCard from './StoreCard/StoreCard'
import StoreBill from './StoreBill/StoreBill'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CategoryNav from './CategoryNav/CategoryNav'

const baseURL="https://dummy-storeit-app.herokuapp.com/data";

const Store = () => {
  
  const [storeSlug, setStoreSlug]=useState();
  const [itemStore, setItemStore]=useState([
    {
      "storeName": "",
      "storeSlug": "",
      "storeLogo": "",
      "categories": [
      ],
  }]);
  
  let slug=useParams();
  useEffect(()=>{
    axios.get(baseURL).then((response)=>{
      setItemStore(
        response.data.filter(option=>option["storeSlug"].toLowerCase().includes(slug["storeSlug"]))
        )
    })
    setStoreSlug(slug)

    },[slug])

  
  
  return (
    <div className='store'>
      <div className='store-side'>
        <CategoryNav content={itemStore[0]}/>
      </div>

      <div className='store-items'>
        {itemStore[0]["categories"].map((item, index)=>(
          <>
          <StoreCard title={item["name"]} imageLink={item["Image"]} itemList={item["products"]} key={index} id={index} allItems={itemStore} changeQty={setItemStore}/>
          </>
        ))}
      </div>
      
      <div className="storebill">
        <StoreBill/>
      </div>
    </div>
  )
}

export default Store
