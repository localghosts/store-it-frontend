import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';
import Display from "./Display"
import { useState, useRef, useEffect } from 'react';
import './Search.css';

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

  return (
      <Stack direction="column" alignItems="center" justifyContent="center">
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
        <Display options={options} display={display} ref={ulRef}/>
      </Stack>
  )
}
