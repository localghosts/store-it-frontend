import * as React from 'react';
import Card from '@mui/material/Card';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import './StoreBill.css';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function StoreBill({ cart }) {
  const [checkOut, setCheckOut] = useState(false);
  const [address, setAddress] = useState('');
  const [errorAddress, setErrorAddress] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);

  const handleCheckOut = () => {
    setCheckOut(true);
  };

  const fieldValidation = (addressField) => {
    if (!addressField) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!fieldValidation(address)) {
      setErrorAddress(true);
    } else {
      setCheckOut(false);
      setAddress('');
      setErrorAddress(false);
      setEmptyCart(true);
      alert('Your order was placed!!');
    }
  };

  return (
    <Card sx={{ width: '17vw', borderRadius: 5, backgroundColor: grey[200] }}>
      <CardContent>
        <Typography sx={{ fontSize: 26, padding: 3, fontWeight: 'bold' }}>Cart</Typography>
        <Typography variant="body2" color="text.primary">
          {emptyCart === false
            ? (
              <>
                <div className="store-bill">
                  {cart.cartList.map((cartItem) => (
                    <div className="storeBillItem">
                      <div className="storeitems-card">
                        <div className="item">{cartItem.product.name}</div>
                      </div>
                      <div className="storeqty-card">
                        <div className="itemqty">
                          {cartItem.quantity}
                          {' '}
                          x
                        </div>
                      </div>
                      <div className="storeprice-card">
                        <div className="price">
                          Rs
                          {' '}
                          {cartItem.product.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="store-bill-total">
                  <div className="storeitems-total">
                    <div className="item">Total</div>
                  </div>
                  <div className="storeprice-total">
                    <div className="price">
                      Rs
                      {' '}
                      {cart.total}
                    </div>
                  </div>
                </div>
              </>
            ) : <Typography sx={{ padding: 5, fontWeight: 'bold' }}>Oops! Your cart seems empty</Typography>}
        </Typography>
        <Typography>
          <div className="checkout">
            {(checkOut === false && emptyCart === false) ? (
              <Button
                variant="contained"
                sx={{ borderRadius: 5, width: '100%' }}
                startIcon={<ShoppingCartIcon />}
                onClick={handleCheckOut}
              >
                CheckOut
              </Button>
            )
              : (
                <div />
              )}
          </div>
        </Typography>
        <div className="addressForm">
          {(checkOut === true)
            ? (
              <div className="addProductForm">
                <div className="form-component address-field">
                  <TextField
                    required
                    id="outlined-required"
                    label="Address"
                    sx={{ width: 280 }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={errorAddress}
                    helperText={errorAddress === true ? 'Missing entry' : ''}
                  />
                </div>
                <div className="form-component submit-btn">
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      width: '200px',
                      borderRadius: 5,
                    }}
                    onClick={() => handleSubmit()}
                  >
                    Submit

                  </Button>
                </div>
              </div>
            )
            : <div />}
        </div>
      </CardContent>
    </Card>
  );
}
