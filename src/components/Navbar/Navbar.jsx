import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef, useEffect } from 'react';
import './Nav.css';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Display from './Display';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

const defaultOptions = [
  {
    storeName: 'Mc Donalds',
    storeSlug: 'mcdonalds',
    products: [
      {
        name: 'Big Mac',
        price: '50',
      },
      {
        name: 'Mc Puff',
        price: '40',
      },
    ],
    tags: 'Burger Fries',
  },
  {
    storeName: 'Dominos',
    storeSlug: 'dominos',
    products: [
      {
        name: 'Pizza',
        price: '50',
      },
      {
        name: 'Burger',
        price: '40',
      },
    ],
    tags: 'Pizza Drink',
  },
];

export default function Navbar() {
  const [options, setOptions] = useState([defaultOptions[0],
    defaultOptions[1]]);
  const [display, setDisplay] = useState(false);
  const onInputChange = (event) => {
    setOptions(
      defaultOptions
        .filter((option) => option.tags.toLowerCase().includes(event.target.value.toLowerCase())),
    );
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
    <div className="navbar">
      <div className="logo">
        <Link to="/buyer/stores" style={{ textDecoration: 'none', color: red[50] }} className="link-logo">
          <div className="logo-ico"><StorefrontIcon fontSize="large" /></div>
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
            placeholder="Search…"
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
                height: 45,
                width: 100,
                fontSize: 14,
                borderBottom: 2,
                borderRadius: 0,
                color: red[50],
              }}
              size="small"
              startIcon={<ShoppingBagIcon size="small" />}
            >
              Orders
            </Button>
          </Link>
        </div>
        <div className="logout-btn">
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                height: 35,
                width: 100,
                fontSize: 18,
                color: red[50],
              }}
              size="medium"
              className="logoutButton"
              onClick={() => (window.localStorage.removeItem('token'))}
            >
              Logout

            </Button>
          </Link>
        </div>
      </div>
      <Display options={options} display={display} ref={ulRef} />
    </div>
  );
}
