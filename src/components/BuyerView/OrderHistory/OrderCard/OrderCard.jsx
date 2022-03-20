import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import './OrderCard.css';
import { ThemeProvider } from '@mui/system';
import theme from '../../../ThemePalette';

export default function OrderCard({ history }) {
  return (
    <ThemeProvider theme={theme}>
      <div className="card">
        <Card sx={{
          maxWidth: 400,
          minHeight: 500,
          borderRadius: 3,
          backgroundColor: theme.palette.tertiary.main,
        }}
        >
          <CardHeader
            avatar={(
              <Avatar
                sx={{ bgcolor: theme.palette.secondary.main, height: 80, width: 80 }}
              >
                {history.orderID}
              </Avatar>
            )}
            title={
            (
              <span>
                <b><h2>{history.store.storename}</h2></b>
              </span>
            )
          }
            subheader={
            (
              <span>
                <b><h3>{new Date(history.orderDate).toLocaleDateString()}</h3></b>
              </span>
            )
          }
          />

          <CardContent>
            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold', fontFamily: 'Arial' }}>
              <div className="bill">
                {history.orderItems.map((product) => (
                  <div className="bill-item">
                    <div className="items-card">
                      <div className="item">{product.productName}</div>
                    </div>
                    <div className="items-quantity">
                      <div className="item">
                        {product.quantity}
                        x
                      </div>
                    </div>
                    <div className="price-card">
                      <div className="item">
                        {product.productPrice === 1 ? 'Re.' : 'Rs.' }
                        {product.productPrice}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bill-total">
                <div className="items-total">
                  <div className="item">Total</div>
                </div>
                <div className="price-total">
                  <div className="price">
                    Rs.
                    {history.amount}
                  </div>
                </div>
              </div>
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>Address:</Typography>
            <Typography paragraph variant="body2" color="text.secondary">
              {history.address}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>Order Status:</Typography>
            <Typography variant="body2" color="text.secondary">{history.status}</Typography>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
