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
import { useEffect } from 'react';

export default function StoreCard({title, imageLink, itemList, changeQty, allItems, id}) {
  
    const remove_item=(item, idx, title, pt)=>{
      let listItems=allItems;
      listItems[0]["categories"][idx]["products"][0]["price"]=(listItems[0]["categories"][idx]["products"][0]["price"]-1).toString();
      changeQty(listItems);
    };
    
    const add_item=(item, idx, title, pt)=>{
      // console.log(item);
      // console.log(idx);
    };

    useEffect(() => {
      changeQty(allItems);
    }, [allItems]);


  return ( 
    <div id={title}>
    <Card sx={{ width: "29vw", borderRadius: 10, backgroundColor: grey[200]}} className="storecard">
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
            <div className='store-item' key={index}>
              <div className='item'>{item["name"]}</div>
              <div className='price'>{item["price"]===1?"Re.":"Rs."} {item["price"]}</div>
              <div className='qty'>
                <div className='qty-pt'><IconButton color='inherit' onClick={()=> remove_item(item["name"],id, title, index)}><RemoveIcon fontSize='small'/></IconButton></div>
                <div className='qty-pt' id={`${title}${index}`}>1</div>
                <div className='qty-pt'><IconButton color='inherit' onClick={()=> add_item(item["name"], id, title, index)}><AddIcon fontSize='small'/></IconButton></div>
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
