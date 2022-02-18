import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from './Card';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';  

export default function Display({options, display}) {
    
  return display===true?(
    <Stack direction="column" spacing={2} alignItems="center" className='display'>
        <div className='display-search'>
        {options.map((item)=>(
            <Card storeElement={item}/>
        ))}
        <Button size="small" 
        sx={{
            width:200,
            fontSize:10,
            borderRadius:10,
        }}endIcon={<ArrowForwardIosIcon />}>
            See more stores.....
        </Button>
        </div>
    </Stack>
  ):(<div></div>);
}