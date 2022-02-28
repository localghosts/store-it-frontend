import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { grey } from '@mui/material/colors';
import "./StoreCard.css"

const remove_item=()=>{
  var tagId="Burger0"
  if(Number(document.getElementById(tagId).innerHTML)>0){
    var x=document.getElementById(tagId).innerHTML-1;
    document.getElementById(tagId).innerHTML=x;
  }
};

const add_item=()=>{
  var tagId="Burger0"
  var x=Number(document.getElementById(tagId).innerHTML)+1;
  document.getElementById(tagId).innerHTML=x;
};


export default function StoreCard({title, imageLink, itemList}, {key}) {
  
  return ( 
    <div id={title}>
    <Card sx={{ width: "27vw", borderRadius: 10, backgroundColor: grey[200]}} className="storecard">
      <CardHeader
        title={title} sx={{textDecoration:"underline"}}
      />
      <CardMedia
        component="img"
        height="160"
        image={imageLink}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
        <div className='itemlist'>
          {itemList.map((item, index)=>(
            <div className='store-item'key={index}>
              <div className='item'>{item["name"]}</div>
              <div className='price'>Rs. {item["price"]}</div>
              <div className='qty'>
                <div className='qty-pt'><IconButton color='inherit' onClick={remove_item}><RemoveIcon fontSize='small'/></IconButton></div>
                <div className='qty-pt' id={`${title}${index}`}>1</div>
                <div className='qty-pt'><IconButton color='inherit' onClick={()=> add_item()}><AddIcon fontSize='small'/></IconButton></div>
              </div>
            </div>
          ))}
        </div>
        </Typography>
      </CardContent>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
    </Card>
    </div>
      
  );
}
