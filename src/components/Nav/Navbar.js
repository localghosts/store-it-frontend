import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import MoreIcon from '@mui/icons-material/MoreVert';
import Display from './Display.js';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useRef, useEffect } from 'react';
import './Nav.css';

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
      width: '54ch',
    },
  },
}));

const defaultOptions=[
    {   
      id:1,
      title: "McDonald's",
      category:{
          "Burgers":{
              items:["Pizza", "Pasta"]
          }
      },
      tags:"Burger Fries"
  },
  {   
      id:2,
      title: "Pizza Hut",
      category:{
          "Pizza":{
              items:["Cheese", "Paneer"]
          }
      },
      tags:"Pizza Momos"
  },
  {   
    id:3,
    title: "Papa Johns",
    category:{
        "Burgers":{
            items:["Pasta", "Pasta"]
        }
    },
    tags:"Pizza Drinks"
  },
  {   
      id:4,
      title: "Pizza Home",
      category:{
          "Pizza":{
              items:["Fries", "Paneer"]
          }
      },
      tags:"Pizza Ice Cream"
  },
  {   
    id:5,
    title: "Burger King",
    category:{
        "Burgers":{
            items:["Ice Cream", "Pasta"]
        }
    },
    tags:"Burger Whopper"
  },
  {   
      id:6,
      title: "Papa Burger",
      category:{
          "Pizza":{
              items:["Cheese", "Paneer"]
          }
      }
      ,
      tags:"Burger Pizza"
  }
]

export default function PrimarySearchAppBar() {
  const [options, setOptions]=useState([defaultOptions[0],
    defaultOptions[1]])
 const [display, setDisplay]=useState(false)
 const onInputChange=(event)=>{
   setOptions(
     defaultOptions.filter(option => option.tags.toLowerCase().includes(event.target.value.toLowerCase()))
     )
   }
   
   const ulRef=useRef();
   const inputRef=useRef();
   useEffect(()=>{
     inputRef.current.addEventListener('click', (event)=>{
     event.stopPropagation();
     setDisplay(true)
   });
   document.addEventListener('click', (event)=>{
     setDisplay(false)
   });
 },[]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    };
    
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
          open={isMenuOpen}
          
      onClose={handleMenuClose}
    >
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
        >
          <Badge>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>My Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>My Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
    <Box>
      <AppBar position="static">
            <Toolbar>
            <IconButton
              size="large"
              edge="end"
              aria-haspopup="true"
              color="inherit"
            >
              <StoreIcon />
            </IconButton>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            >
            Storeit
          </Typography>
          
          <div className='search-bar'>
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

            <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
             <IconButton
              size="large"
              color="inherit"
            >
              <Badge >
                <ShoppingCartIcon />
              </Badge>
            </IconButton> 
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
                  </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    <Display options={options} display={display} ref={ulRef}/>

    </>
  );
}
