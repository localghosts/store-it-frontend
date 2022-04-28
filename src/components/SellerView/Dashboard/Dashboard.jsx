import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { CircularProgress, Skeleton, Typography } from '@mui/material';
import Navigation from './Navigation/Navigation';
import Products from './Products/Products';
import './Dashboard.css';
import Orders from './Orders/Orders';
import Categories from './Categories/Categories';
import BASE_URL from '../../../url';
import theme from '../../ThemePalette';
import CategoryLog from './Categories/CategoryLog/CategoryLog';
import AddCategory from './Categories/AddCategory/AddCategory';
import AddProduct from './Products/AddProducts/AddProduct';
import ProductLog from './Products/ProductLog/ProductLog';

function Dashboard() {
  const dashboard = useParams();

  // State
  const [active, setActive] = useState('orders');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storeSlug, setStoreSlug] = useState('');
  const [history, setHistory] = useState([]);
  const [value, setValue] = useState(0);
  const [mode, setMode] = useState(0);
  const [storeInfo, setStoreInfo] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) setActive('orders');
    if (newValue === 1) setActive('categories');
    if (newValue === 2) setActive('products');
  };

  const handleMode = (event, newValue) => {
    setMode(newValue);
  };

  useEffect(() => {
    setStoreSlug(localStorage.getItem('storeSlug'));
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios.all([axios.get(`${BASE_URL}/store/${localStorage.getItem('storeSlug')}/category`, config),
      axios.get(`${BASE_URL}/store/${localStorage.getItem('storeSlug')}/orders`, config),
      axios.get(`${BASE_URL}/store/${localStorage.getItem('storeSlug')}`, config)])
      .then((res) => {
        setCategories(res[0].data.sort((a, b) => b.categoryID - a.categoryID));
        setHistory(res[1].data.sort((a, b) => b.orderID - a.orderID));
        setStoreInfo(res[2].data.store);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [dashboard]);

  return (
    <ThemeProvider theme={theme}>
      <div className="dashboard">
        <div className="navigation">
          <Navigation active={active} setActive={setActive} storeSlug={storeSlug} />
        </div>

        <div>
          {(active === 'products')
            ? (
              <Products
                categories={categories}
                setCategories={setCategories}
                storeSlug={storeSlug}
                isLoading={isLoading}
              />
            )
            : <div />}
          {(active === 'orders') ? <Orders storeSlug={storeSlug} history={history} setHistory={setHistory} isLoading={isLoading} /> : <div />}
          {(active === 'categories') ? <Categories categories={categories} setCategories={setCategories} isLoading={isLoading} storeSlug={storeSlug} /> : <div />}
        </div>
      </div>

      <div className="dashboardMobile">
        <div
          className="navStoreLogo"
          style={{
            borderBottom: '3px solid', borderColor: theme.palette.primary.main, paddingTop: 30, height: 200,
          }}
        >
          {isLoading
            ? <CircularProgress />
            : (
              <div>
                <img src={storeInfo.storelogo} alt={storeSlug} height={100} />
                <Typography sx={{ fontSize: 30, fontWeight: 'bold', margin: '25px 0px' }}>{storeInfo.storename}</Typography>
              </div>
            )}
        </div>
        <div>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Orders" />
            <Tab label="Categories" />
            <Tab label="Products" />
          </Tabs>
        </div>
        <div>
          {active === 'orders'
            ? (
              <Orders
                storeSlug={storeSlug}
                history={history}
                setHistory={setHistory}
                isLoading={isLoading}
              />
            )
            : (

              <div>
                {active === 'categories'
                  ? (
                    <div>
                      <div>
                        <Tabs value={mode} onChange={handleMode} centered>
                          <Tab label="Log" />
                          <Tab label="Add category" />
                        </Tabs>
                      </div>
                      {mode === 0
                        ? (
                          <div>
                            {isLoading
                              ? (
                                <div className="loadingLog">
                                  <Skeleton animation="wave" width="25vw" height={70} sx={{ margin: '10px 0px -20px 90px' }} />
                                  <div className="loadingList">
                                    <div><Skeleton animation="wave" width="17vw" height={300} sx={{ margin: '0px auto', borderRadius: 5 }} /></div>
                                    <div><Skeleton animation="wave" width="17vw" height={300} sx={{ margin: '0px auto', borderRadius: 5 }} /></div>
                                    <div><Skeleton animation="wave" width="17vw" height={300} sx={{ margin: '0px auto', borderRadius: 5 }} /></div>
                                    <div><Skeleton animation="wave" width="17vw" height={300} sx={{ margin: '0px auto', borderRadius: 5 }} /></div>
                                  </div>
                                </div>
                              )
                              : (
                                <CategoryLog
                                  categories={categories}
                                  setCategories={setCategories}
                                  storeSlug={storeSlug}
                                />
                              )}
                          </div>
                        ) : (
                          <div>
                            <AddCategory
                              setCategories={setCategories}
                              storeSlug={storeSlug}
                            />
                          </div>
                        )}
                    </div>
                  )
                  : (
                    <div>
                      <div>
                        <Tabs value={mode} onChange={handleMode} centered>
                          <Tab label="Log" />
                          <Tab label="Add product" />
                        </Tabs>
                      </div>
                      {mode === 0
                        ? (
                          <div className="hello">
                            {isLoading
                              ? (
                                <div>
                                  <Skeleton animation="wave" width="80%" height={200} sx={{ margin: '5px auto' }} />
                                  <Skeleton animation="wave" width="80%" height={60} sx={{ margin: '10px auto' }} />
                                  <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '10px auto' }} />
                                  <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '10px auto' }} />
                                  <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '5px auto' }} />
                                  <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '10px auto' }} />
                                  <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '10px auto' }} />
                                  <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '10px auto' }} />
                                  <Skeleton animation="wave" width="80%" height={30} sx={{ margin: '5px auto' }} />
                                </div>
                              )
                              : (
                                <ProductLog
                                  categories={categories}
                                  storeSlug={storeSlug}
                                  setCategories={setCategories}
                                />
                              )}
                          </div>
                        ) : (
                          <div>
                            <AddProduct
                              categories={categories}
                              storeSlug={storeSlug}
                              setCategories={setCategories}
                            />
                          </div>
                        )}
                    </div>
                  )}
              </div>
            )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
