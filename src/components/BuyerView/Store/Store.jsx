import React, { useEffect, useState } from 'react';
import './Store.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CategoryNav from './CategoryNav/CategoryNav';
import MenuCard from './MenuCard/MenuCard';
import BASE_URL from '../../../url';
import StoreBill from './StoreBill/StoreBill';

function Store({ role }) {
  const [, setStoreSlug] = useState();
  const [loading, setLoading] = useState(true);
  const [itemStore, setItemStore] = useState({
    store: {},
    categories: [],
  });
  const [cart, setCart] = useState({ cartList: [], total: '' });
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const slug = useParams();
  useEffect(() => {
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    if (role === 1) navigate('/login');
    axios
      .all([axios.get(`${BASE_URL}/store/${slug.storeSlug}`, config), axios.get(`${BASE_URL}/store/${slug.storeSlug}/cart`, config)])
      .then((res) => {
        setLoading(false);
        setItemStore(res[0].data);
        setCart(res[1].data);
      })
      .catch(() => setOpen(true));
    setStoreSlug(slug);
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [slug]);

  return (
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
            <div>
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
  );
}

export default Store;
