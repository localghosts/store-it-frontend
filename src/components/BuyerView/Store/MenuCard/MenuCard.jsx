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
import './MenuCard.css';

export default function MenuCard({
  title, imageLink, itemList, setItemStore, itemStore, id,
}) {
  const removeItem = (idx, pt) => {
    const storeItem = itemStore[0];
    if (storeItem.categories[idx].products[pt].qty > 0) {
      const quantity = Number(storeItem.categories[idx].products[pt].qty) - 1;
      storeItem.categories[idx].products[pt].qty = (quantity).toString();
      setItemStore([storeItem]);
    }
  };

  const addItem = (idx, pt) => {
    const storeItem = itemStore[0];
    const quantity = Number(storeItem.categories[idx].products[pt].qty) + 1;
    storeItem.categories[idx].products[pt].qty = (quantity).toString();
    setItemStore([storeItem]);
  };

  return (
    <div id={title}>
      <Card sx={{ width: '29vw', borderRadius: 10, backgroundColor: grey[200] }} className="menucard">
        <CardHeader
          title={title}
          sx={{ textDecoration: 'underline' }}
        />
        <CardMedia
          component="img"
          height="160"
          image={imageLink}
          alt={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            <div className="itemlist">
              {itemList.map((item, index) => (
                <div className="store-item">
                  <div className="item">{item.name}</div>
                  <div className="price">
                    {item.price === 1 ? 'Re.' : 'Rs.'}
                    {item.price}
                  </div>
                  <div className="qty">
                    <div className="qty-pt"><IconButton color="inherit" onClick={() => removeItem(id, index)}><RemoveIcon fontSize="small" /></IconButton></div>
                    <div className="qty-pt" id={`${title}${index}`}>{item.qty}</div>
                    <div className="qty-pt"><IconButton color="inherit" onClick={() => addItem(id, index)}><AddIcon fontSize="small" /></IconButton></div>
                  </div>
                </div>
              ))}
            </div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
