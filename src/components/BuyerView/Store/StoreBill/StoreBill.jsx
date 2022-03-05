import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import './StoreBill.css';
import { Button } from '@mui/material';

export default function StoreBill() {
  return (
    <Card sx={{ width: '17vw', borderRadius: 10, backgroundColor: grey[200] }}>
      <CardHeader title="Cart" sx={{ textDecoration: 'underline' }} />

      <CardContent>
        <Typography variant="body2" color="text.primary">
          <div className="store-bill">
            <div className="storeitems-card">
              <div className="item">Pizza</div>
              <div className="item">Ice-cream</div>
            </div>
            <div className="storeprice-card">
              <div className="price">Rs 100</div>
              <div className="price">Rs 100</div>
            </div>
          </div>
          <div className="store-bill-total">
            <div className="storeitems-total">
              <div className="item">Total</div>
            </div>
            <div className="storeprice-total">
              <div className="price">Rs 200</div>
            </div>
          </div>
        </Typography>
        <Typography>
          <div className="checkout">
            <Button
              variant="contained"
              sx={{ borderRadius: 10, width: '100%' }}
              startIcon={<ShoppingCartIcon />}
            >
              CheckOut
            </Button>
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
}
