import * as React from 'react';
import Card from '@mui/material/Card';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import './StoreBill.css';
import {
  Button, TextField, Collapse, Alert, IconButton,
} from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import BASE_URL from '../../../../url';

export default function StoreBill({ cart, itemStore, setCart }) {
  const [checkOut, setCheckOut] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errorAddress, setErrorAddress] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckOut = () => {
    setCheckOut(true);
  };

  const fieldValidation = (addressField, phoneField) => {
    const val = /^[0-9]+$/.test(phoneField);
    if (addressField === '' || phoneField === '' || val === false || phoneField.length !== 10) {
      if (addressField === '') setErrorAddress(true);
      setErrorPhone(true);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!fieldValidation(address, phone));
    else {
      setError(false);
      setErrorAddress(false);
      setSuccess(false);
      setErrorPhone(false);
      const config = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const obj = {
        address,
        phoneNo: phone,
      };
      axios
        .post(`${BASE_URL}/store/${itemStore.store.storeslug}/checkout`, obj, config)
        .then(() => {
          axios
            .get(`${BASE_URL}/store/${itemStore.store.storeslug}/cart`, config)
            .then((response) => {
              setSuccess(true);
              setCart(response.data);
              setAddress('');
              setPhone('');
              setCheckOut(false);
            })
            .catch(() => {
              setError(true);
              setCheckOut(true);
            });
        })
        .catch(() => {
          setError(true);
          setCheckOut(true);
        });
    }
  };

  return (
    <div>
      <Collapse in={success}>
        <div className="form-component category-field">
          <Alert
            action={(
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
                )}
            sx={{ mb: 2 }}
          >
            Your order has been placed.
          </Alert>
        </div>
      </Collapse>
      <Collapse in={error}>
        <div className="form-component category-field">
          <Alert
            severity="error"
            action={(
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
                )}
            sx={{ mb: 2 }}
          >
            Failed to place order. Try again!
          </Alert>
        </div>
      </Collapse>
      <Card sx={{ width: '17vw', borderRadius: 5, backgroundColor: grey[200] }}>
        <CardContent>
          <Typography sx={{ fontSize: 26, padding: 3, fontWeight: 'bold' }}>Cart</Typography>
          <Typography variant="body2" color="text.primary">
            {cart.cartList.length !== 0
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
              {(checkOut === false && cart.cartList.length !== 0) ? (
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
                      helperText={errorAddress === true ? 'Missing address' : ''}
                    />
                  </div>
                  <div className="form-component address-field">
                    <TextField
                      required
                      id="outlined-required"
                      label="Phone Number"
                      sx={{ width: 280 }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      error={errorPhone}
                      helperText={errorPhone === true ? 'Invalid phone number. Phone number should should consist of 10 digits' : ''}
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
    </div>
  );
}
