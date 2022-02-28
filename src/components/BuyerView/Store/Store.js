import React, { useEffect, useState } from 'react'
import "./Store.css"
import StoreCard from './StoreCard/StoreCard'
import StoreBill from './StoreBill/StoreBill'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Category from './Category/Category'

const baseURL="https://dummy-storeit-app.herokuapp.com/data";

const Store = () => {
  
  const [storeSlug, setStoreSlug]=useState();
  const [itemStore, setItemStore]= useState([
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
    console.log(slug)

    // setItemStore(
    //   storeItems.filter(option=>option["storeSlug"].toLowerCase().includes(slug["storeSlug"]))
    // )

    // setItemStore(
    //   storeItems.filter(option=>option["storeSlug"].toLowerCase().includes(slug["storeSlug"]))
    //   )
    },[slug])

  
  
  return (
    <div className='store'>
      <div className='store-side'>
        <Category content={itemStore[0]}/>
      </div>

      <div className='store-items'>
        {itemStore[0]["categories"].map((item, index)=>(
          <StoreCard title={item["name"]} imageLink={item["Image"]} itemList={item["products"]} key={index}/>
        ))}
      </div>
      
      <div className="storebill">
        <StoreBill/>
      </div>
    </div>
  )
}

export default Store
