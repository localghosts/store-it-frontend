import React from 'react'
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Card = ({storeElement}) => {
  return (
    <div className='Card'>
        <div className='Card-title'>
            <div className='title'><h4>{storeElement["storeName"]}</h4></div>
            <div className='goto'><Button variant="outlined"
            sx={{
                height:30,
            }} endIcon={<ArrowForwardIcon />} size="small">Go to Store</Button>
            </div>
        </div> 
        <div>
            <ul>
                {/* <li>
                    <div className='item'>
                        <b>{storeElement["products"][0]["name"]}</b>
                    </div>
                    <div className='price'>Rs. {storeElement["products"][0]["price"]}</div>
                </li>
                <li>
                    <div className='item'>
                        <b>{storeElement["products"][1]["name"]}</b>
                    </div>
                    <div className='price'>Rs. {storeElement["products"][1]["price"]}</div>
                </li> */}
                {storeElement["products"].map((product)=>{
                    return(<li>
                        <div className='item'>
                            <b>{product["name"]}</b>
                        </div>
                        <div className='price'>Rs. {product["price"]}</div>
                    </li>)
                })}
            </ul>
        </div>
    </div>
  )
}

export default Card
