import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef, useEffect } from 'react';
import './Nav.css';
import Button from '@mui/material/Button';
// import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import axios from 'axios';
import { ThemeProvider } from '@mui/system';
import Display from './Display';
import BASE_URL from '../../url';
import theme from '../ThemePalette';

const Search = styled('div')(() => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  // width: '100%',
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(3),
  //   width: 'auto',
  // },
}));

const SearchIconWrapper = styled('div')(() => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: theme.palette.common.white,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '46ch',
    },
  },
}));

export default function Navbar({ setAuth, setRole }) {
  const [options, setOptions] = useState([]);
  const [display, setDisplay] = useState(false);
  const onInputChange = (event) => {
    const config = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    axios
      .get(`${BASE_URL}/products?name=${event.target.value}`, config)
      .then((res) => setOptions(res.data));
  };

  const ulRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.addEventListener('click', (event) => {
      event.stopPropagation();
      setDisplay(true);
    });
    document.addEventListener('click', () => {
      setDisplay(false);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="navbar" style={{ backgroundColor: theme.palette.primary.main }}>
        <div className="logo">
          <Link to="/buyer/stores" style={{ textDecoration: 'none', color: red[50] }} className="link-logo">
            <div className="logo-ico"><img src="/store.png" alt="storeIcon" /></div>
            <div className="logo-title">
              StoreIt
            </div>
          </Link>
        </div>
        <div className="search-bar">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for products…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={onInputChange}
              ref={inputRef}
            />
          </Search>
        </div>
        <div className="side-btn">
          <div className="orders-btn">
            <Link to="/buyer/orders" style={{ textDecoration: 'none' }}>
              <Button
                variant="text"
                color="inherit"
                sx={{
                  borderBottom: 2,
                  borderRadius: 0,
                  color: red[50],
                }}
                size="small"
                startIcon={<ShoppingBagIcon size="small" />}
                className="order-component"
              >
                Orders
              </Button>
            </Link>
          </div>
          <div className="logout-btn">
            {/* <Link to="/login" style={{ textDecoration: 'none' }}> */}
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                color: red[50],
              }}
              size="medium"
              className="logout-component"
              onClick={() => {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('role');
                setAuth(false);
                setRole(0);
              }}
            >
              Logout

            </Button>
            {/* </Link> */}
          </div>
        </div>
        <Display options={options} display={display} ref={ulRef} />
      </div>
    </ThemeProvider>
  );
}
