import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'; 
import OrderCard from './OrderCard/OrderCard'
import "./OrderHistory.css"
import axios from 'axios'
import { Button } from '@mui/material';

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const baseURL="https://mockcall.herokuapp.com/orders"

const OrderHistory = () => {

  const [history, setHistory]=useState([])

  useEffect(()=>{
    axios.get(baseURL).then((response)=>{
      setHistory(response.data)
    })

    },[])

  return (
    <div className='order-history'>
        <div className='sidebar top-btn'>
          <Link to="/stores" style={{ textDecoration: 'none', color:blue[500],}} className="order-btn">
            <Button variant="outlined" className="top-btn" sx={{borderRadius:10, border:1, fontSize:16,}}>                 
                    <div className='order-title'>
                    Go to Home
                    </div>
            </Button>
          </Link>
        </div>
        <div className='orders'>
          {history.map((item, index)=>(
            <OrderCard key={index} history={item}/>
          ))}
        </div>
    </div>
  )
}

export default OrderHistory
