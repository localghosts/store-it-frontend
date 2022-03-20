import React, { useEffect, useState } from 'react';
import './Store.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ThemeProvider } from '@mui/system';
import CategoryNav from './CategoryNav/CategoryNav';
import MenuCard from './MenuCard/MenuCard';
import BASE_URL from '../../../url';
import StoreBill from './StoreBill/StoreBill';
import theme from '../../ThemePalette';

function Store() {
  const [, setStoreSlug] = useState();
  const [loading, setLoading] = useState(true);
  const [itemStore, setItemStore] = useState({
    store: {},
    categories: [],
  });
  const [cart, setCart] = useState({ cartList: [], total: '' });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const slug = useParams();
  useEffect(() => {
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios
      .all([axios.get(`${BASE_URL}/store/${slug.storeSlug}`, config), axios.get(`${BASE_URL}/store/${slug.storeSlug}/cart`, config)])
      .then((res) => {
        setLoading(false);
        setItemStore(res[0].data);
        setCart(res[1].data);
      })
      .catch(() => setOpen(true));
    setStoreSlug(slug);
  }, [slug]);

  return (
    <ThemeProvider theme={theme}>
      <div className="store">
        <div className="store-side">
          {loading ? (
            <div style={{ margin: 50 }}>
              <Skeleton animation="wave" width={200} height={100} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width={200} height={40} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width={200} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width={200} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width={200} sx={{ margin: '10px 0px' }} />
            </div>
          )
            : <CategoryNav itemStore={itemStore} />}
        </div>

        <div className="store-items">
          {loading ? (
            <div>
              <Skeleton animation="wave" width="25vw" height={200} sx={{ margin: '5px 0px' }} />
              <Skeleton animation="wave" width="25vw" height={60} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '10px 0px' }} />

              <Skeleton animation="wave" width="25vw" height={200} sx={{ margin: '5px 0px' }} />
              <Skeleton animation="wave" width="25vw" height={60} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '0px 0px' }} />
              <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '0px 0px' }} />
              <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '0px 0px' }} />
              <Skeleton animation="wave" width="25vw" height={60} sx={{ margin: '0px 0px' }} />

            </div>
          )
            : (
              <div className="wrapperItems">
                <div style={{ padding: '10px' }} />
                {itemStore.categories.map((item, index) => (
                  <MenuCard
                    title={item.name}
                    imageLink={item.image}
                    itemList={item.products}
                    id={index}
                    itemStore={itemStore}
                    setItemStore={setItemStore}
                    cart={cart}
                    setCart={setCart}
                  />
                ))}
              </div>
            )}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Page failed to load!
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                The requested page failed to reload. Try reloading.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Stay</Button>
              <Button onClick={() => window.location.reload(false)} autoFocus>
                Reload
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div className="storebill">
          {loading ? (
            <div style={{ marginTop: 10 }}>
              <Skeleton animation="wave" width="15vw" height={50} sx={{ margin: '5px 0px' }} />
              <Skeleton animation="wave" width="15vw" height={60} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width="15vw" height={30} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width="15vw" height={30} sx={{ margin: '10px 0px' }} />
              <Skeleton animation="wave" width="15vw" height={50} sx={{ margin: '5px 0px' }} />
              <Skeleton animation="wave" width="15vw" height={60} sx={{ margin: '10px 0px' }} />
            </div>
          )
            : (
              <div>
                <StoreBill cart={cart} itemStore={itemStore} setCart={setCart} />
              </div>
            )}
        </div>
      </div>
      <div className="storeMobile">
        <div className="storeBar">
          <img className="storeTitle" src={itemStore.store.storelogo} alt={itemStore.store.storename} height={100} />
          <h2 className="storeTitle">{itemStore.store.storename}</h2>
        </div>
        <div>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Store" />
            <Tab label="Cart" />
          </Tabs>
        </div>
        <div>
          {value === 0
            ? (
              <div>
                {loading ? (
                  <div>
                    <Skeleton animation="wave" width="25vw" height={200} sx={{ margin: '5px 0px' }} />
                    <Skeleton animation="wave" width="25vw" height={60} sx={{ margin: '10px 0px' }} />
                    <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '10px 0px' }} />
                    <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '10px 0px' }} />

                    <Skeleton animation="wave" width="25vw" height={200} sx={{ margin: '5px 0px' }} />
                    <Skeleton animation="wave" width="25vw" height={60} sx={{ margin: '10px 0px' }} />
                    <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '10px 0px' }} />
                    <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '10px 0px' }} />
                    <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '0px 0px' }} />
                    <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '0px 0px' }} />
                    <Skeleton animation="wave" width="25vw" height={30} sx={{ margin: '0px 0px' }} />
                    <Skeleton animation="wave" width="25vw" height={60} sx={{ margin: '0px 0px' }} />

                  </div>
                )
                  : (
                    <div className="wrapperItems">
                      <div style={{ padding: '10px' }} />
                      {itemStore.categories.map((item, index) => (
                        <MenuCard
                          title={item.name}
                          imageLink={item.image}
                          itemList={item.products}
                          id={index}
                          itemStore={itemStore}
                          setItemStore={setItemStore}
                          cart={cart}
                          setCart={setCart}
                        />
                      ))}
                    </div>
                  )}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Page failed to load!
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      The requested page failed to reload. Try reloading.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Stay</Button>
                    <Button onClick={() => window.location.reload(false)} autoFocus>
                      Reload
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )
            : (
              <div style={{ marginTop: 10 }}>
                {loading ? (
                  <div>
                    <Skeleton animation="wave" width="15vw" height={50} sx={{ margin: '5px 0px' }} />
                    <Skeleton animation="wave" width="15vw" height={60} sx={{ margin: '10px 0px' }} />
                    <Skeleton animation="wave" width="15vw" height={30} sx={{ margin: '10px 0px' }} />
                    <Skeleton animation="wave" width="15vw" height={30} sx={{ margin: '10px 0px' }} />
                    <Skeleton animation="wave" width="15vw" height={50} sx={{ margin: '5px 0px' }} />
                    <Skeleton animation="wave" width="15vw" height={60} sx={{ margin: '10px 0px' }} />
                  </div>
                )
                  : (
                    <StoreBill cart={cart} itemStore={itemStore} setCart={setCart} />
                  )}
              </div>
            )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Store;
