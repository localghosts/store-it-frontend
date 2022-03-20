import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './MenuCard.css';
import axios from 'axios';
import { ThemeProvider } from '@mui/system';
import BASE_URL from '../../../../url';
import theme from '../../../ThemePalette';

export default function MenuCard({
  title, imageLink, itemList, cart, itemStore, setCart,
}) {
  const addToCart = (qty, id, action) => {
    let q;
    if (action === 'SUB') q = qty - 1;
    else q = qty + 1;
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios
      .post(`${BASE_URL}/store/${itemStore.store.storeslug}/cart/${id}/${q}`, {}, config)
      .then((res) => {
        console.log(res.data);
        axios
          .get(`${BASE_URL}/store/${itemStore.store.storeslug}/cart`, config)
          .then((response) => {
            setCart(response.data);
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id={title}>
      <ThemeProvider theme={theme}>
        <Card sx={{ width: '25vw', borderRadius: 5, backgroundColor: theme.palette.tertiary.main }} className="menucard">
          <CardMedia
            component="img"
            height="160"
            image={imageLink}
            alt={title}
          />
          <CardContent>
            <Typography sx={{ fontSize: 26, paddingLeft: 4, fontWeight: 'bold' }}>{title}</Typography>
          </CardContent>
          <CardContent sx={{ padding: '0px 20px' }}>
            <Typography variant="body2" color="text.primary">
              <div className="itemlist">
                {itemList.map((item) => (
                  <div className="store-item">
                    <div className="item">{item.name}</div>
                    <div className="price">
                      {item.price === 1 ? 'Re.' : 'Rs.'}
                      {item.price}
                    </div>
                    {cart.cartList.find(
                      (cartItem) => cartItem.product.productID === item.productID,
                    ) === undefined ? (
                      <div className="qty">
                        <div className="qty-pt">
                          <IconButton
                            color="inherit"
                            onClick={() => addToCart(0, item.productID, 'SUB')}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>

                        </div>
                        <div className="qty-pt">
                          0
                        </div>
                        <div className="qty-pt">
                          <IconButton
                            color="inherit"
                            onClick={() => addToCart(0, item.productID, 'ADD')}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>

                        </div>
                      </div>
                      ) : (
                        <div className="qty">
                          <div className="qty-pt">
                            <IconButton
                              color="inherit"
                              onClick={() => addToCart((cart.cartList.find(
                                (cartItem) => cartItem.product.productID === item.productID,
                              ).quantity), item.productID, 'SUB')}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>

                          </div>
                          <div className="qty-pt">
                            {cart.cartList.find(
                              (cartItem) => cartItem.product.productID === item.productID,
                            ) === undefined ? '0' : (cart.cartList.find(
                                (cartItem) => cartItem.product.productID === item.productID,
                              ).quantity)}
                          </div>
                          <div className="qty-pt">
                            <IconButton
                              color="inherit"
                              onClick={() => addToCart((cart.cartList.find(
                                (cartItem) => cartItem.product.productID === item.productID,
                              ).quantity), item.productID, 'ADD')}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>

                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </Typography>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
}
