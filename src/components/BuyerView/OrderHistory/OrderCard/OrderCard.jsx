import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { grey, red } from '@mui/material/colors';
import './OrderCard.css';

export default function OrderCard({ history }) {
  return (
    <div className="card">
      <Card sx={{ maxWidth: 400, borderRadius: 3, backgroundColor: grey[200] }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[300], height: 80, width: 80 }} src={history.storeLogo} />
        }
          title={(
            <span>
              <b><h2>{history.storeName}</h2></b>
            </span>
)}
          subheader={(
            <span>
              <b><h3>{history.orderDate}</h3></b>
            </span>
)}
        />

        <CardContent>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold', fontFamily: 'Arial' }}>
            <div className="bill">
              {history.products.map((product, index) => (
                <div className="bill-item">
                  <div className="items-card">
                    <div className="item">{product.name}</div>
                  </div>
                  <div className="items-quantity">
                    <div className="item">
                      {product.quantity}
                      {' '}
                      x
                      {' '}
                    </div>
                  </div>
                  <div className="price-card">
                    <div className="item">
                      {product.price === 1 ? 'Re.' : 'Rs.'}
                      {' '}
                      {product.price}
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
                  {history.total}
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

          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>Paid by:</Typography>
          <Typography paragraph variant="body2" color="text.secondary">{history.paidBy}</Typography>

          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>Order Status:</Typography>
          <Typography variant="body2" color="text.secondary">{history.orderStatus}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
