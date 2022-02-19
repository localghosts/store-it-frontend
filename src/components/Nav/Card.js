import React from 'react'
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Card = ({storeElement}) => {
  return (
    <div className='Card'>
        <div className='Card-title'>
            <div className='title'><h4>{storeElement.title}</h4></div>
            <div className='goto'><Button variant="outlined"
            sx={{
                height:30,
            }} endIcon={<ArrowForwardIcon />} size="small">Go to Store</Button>
            </div>
        </div> 
        <div>
            <ul>
                <li>
                    <div className='item'>
                        <b>{storeElement.category[Object.keys(storeElement.category)].items[0]}</b></div>
                    <div className='price'>50 Rs</div>
                </li>
                <li>
                    <div className='item'><b>Item2</b></div>
                    <div className='price'>50 Rs</div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Card
