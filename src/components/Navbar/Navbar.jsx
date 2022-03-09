import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef, useEffect } from 'react';
import './Nav.css';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
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
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
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

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const CustomButtonRoot = styled('button')`
  display:flex;
  flex-direction:row;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 2rem;
  background-color: ${blue[600]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function CustomButton() {
  return <ButtonUnstyled component={CustomButtonRoot} />;
}

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

  const [loginstatus, setLoginstatus] = useState(false);

  const onClick = () => {
    if (!loginstatus) console.log('Logged in');
    else console.log('Logged out!');
    setLoginstatus(!loginstatus);
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
      <Box>
        <AppBar position="static">
          <Toolbar>
            <div className="logo">
              <CustomButton>
                <Link to="/stores" style={{ textDecoration: 'none', color: red[50] }} className="link-logo">
                  <div className="logo-ico"><StorefrontIcon fontSize="large" /></div>
                  <div className="lgo-title">
                    StoreIt
                  </div>
                </Link>
              </CustomButton>
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
            {loginstatus === true
              ? (
                <div className="side-btn">
                  <div className="orders-btn">
                    <Link to="/orders" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="text"
                        color="inherit"
                        disableRipple="true"
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
                    <Button
                      variant="outlined"
                      color="inherit"
                      sx={{
                        height: 35,
                        width: 100,
                        fontSize: 18,
                      }}
                      size="medium"
                      onClick={onClick}
                    >
                      Logout

                    </Button>
                  </div>
                </div>
              )
              : (
                <div className="login-btn">
                  <Link to="/stores" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      sx={{
                        height: 45,
                        width: 100,
                        fontSize: 18,
                        color: red[50],
                      }}
                      size="medium"
                      onClick={onClick}
                    >
                      Login

                    </Button>
                  </Link>
                </div>
              )}
          </Toolbar>
        </AppBar>
      </Box>
      <Display options={options} display={display} ref={ulRef} />
    </div>
  );
}
