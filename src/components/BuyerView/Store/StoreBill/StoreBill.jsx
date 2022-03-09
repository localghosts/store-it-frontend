import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import "./StoreBill.css"
import { Button } from '@mui/material';
import { useState } from 'react';
import { TextField } from '@mui/material';

export default function StoreBill() {
  
  const [cart, setCart]=useState([
    [
      {
        item: "Big Mac",
        qty: 2,
        price: 50
      },
      {
        item: "Pepsi",
        qty: 2,
        price: 50
      },
      {
        item: "Mc Aloo Tikki",
        qty: 1,
        price: 40
      },
    ],
    {
      total: 240
    }
  ])
  const [checkOut, setCheckOut]=useState(false);
  const [address, setAddress]=useState("");
  const [errorAddress, setErrorAddress]=useState(false);
  const [emptyCart, setEmptyCart]=useState(false);

  const handleCheckOut=()=>{
    setCheckOut(true);
  }
  
  const fieldValidation=(address)=>{
    if(!address){
      return false;
    }
    return true;
  }

  const handleSubmit=()=>{
    if(!fieldValidation(address)){
      setErrorAddress(true)
    }
    else{
      setCheckOut(false)
      setAddress("")
      setErrorAddress(false)
      setEmptyCart(true)
      alert("Your order was placed!")
    }
  }

  return (
    <Card sx={{ width: "17vw", borderRadius: 10 ,backgroundColor:grey[200]}}>
      <CardHeader title="Cart" sx={{textDecoration:"underline"}}/>
        
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {emptyCart===false?
            <>
              <div className='store-bill'>
                {cart[0].map((cartItem)=>(
                  <div className='storeBillItem'>
                    <div className='storeitems-card'>
                      <div className='item'>{cartItem.item}</div>
                    </div>
                    <div className='storeqty-card'>
                      <div className='itemqty'>{cartItem.qty} x</div>
                    </div>
                    <div className='storeprice-card'>
                      <div className='price'>Rs {cartItem.price}</div>
                    </div>
                  </div>
                  ))}
              </div>
              <div className='store-bill-total'>
                <div className='storeitems-total'>
                  <div className='item'>Total</div>
                </div>
                <div className='storeprice-total'>
                  <div className='price'>Rs {cart[1].total}</div>
                </div>
              </div>
            </>:<><Typography sx={{padding:5, fontWeight: "bold"}}>Oops! Your cart seems empty</Typography></>
          }
        </Typography>
        <Typography>
            <div className='checkout'>
              {(checkOut===false && emptyCart===false)?<Button variant='contained' 
                sx={{borderRadius: 10, width: "100%"}}
                startIcon={<ShoppingCartIcon/>} onClick={handleCheckOut}>CheckOut</Button>
              :<></>}
            </div>
        </Typography>
        <div className='addressForm'>
          {(checkOut===true)?
              (<div className='addProductForm'>
                  <div className='form-component address-field'>
                    <TextField required id="outlined-required" label="Address" sx={{width:280}}  value={address} 
                    onChange={(e)=>setAddress(e.target.value)} error={errorAddress} helperText={errorAddress===true?"Missing entry":""} />
                  </div>
                  <div className='form-component submit-btn'>
                    <Button variant="contained" size="large" sx={{width:"200px", borderRadius: 10}} onClick={()=>handleSubmit()}>Submit</Button>
                  </div>
              </div>)
              :<></>}
        </div>
      </CardContent>
    </Card>
  );
}