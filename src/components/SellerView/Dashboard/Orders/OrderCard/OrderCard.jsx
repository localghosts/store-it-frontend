import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { grey, red } from '@mui/material/colors';
import './OrderCard.css';
import { useState } from 'react';

export default function OrderCard({ history }) {
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const AfterRejected = () => {
    <div>
      <div className="center">
        <b>ORDER REJECTED </b>
      </div>
    </div>;
  };

  const AfterAccepted = () => {
    <div>
      <div className="orderAcceptedText">
        <b>ORDER ACCEPTED</b>
      </div>
      <TextField label="Update status" size="small" variant="outlined" style={{ marginRight: '10px' }} />
      <div className="buttons">
        <Button variant="contained" onClick={() => { }}> Update </Button>
      </div>
    </div>;
  };

  const AcceptOrReject = () => {
    <div className="buttons">
      <Button variant="contained" onClick={() => setAccepted(true)}> Accept </Button>
      <Button variant="contained" onClick={() => setRejected(true)}> Reject </Button>
    </div>;
  };

  return (
    <div className="card">
      <Card sx={{ maxWidth: 400, borderRadius: 3, backgroundColor: grey[200] }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[300], height: 80, width: 80 }} src={history.userProfile} />
        }
          title={(
            <span className="orderTitle">
              <b>
                <h2>
                  Order #
                  {history.orderNumber}
                </h2>
              </b>
              <span> </span>
            </span>
)}
          subheader={(
            <span>
              <b><h3>{history.orderTime}</h3></b>
            </span>
)}
        />

        <CardContent>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold', fontFamily: 'Arial' }}>
            <div className="bill">
              {history.products.map((product) => (
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
                  {' '}
                  {history.total}
                </div>
              </div>
            </div>
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>Name:</Typography>
          <Typography paragraph variant="body2" color="text.secondary">
            {history.buyer}
          </Typography>

          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>Address:</Typography>
          <Typography paragraph variant="body2" color="text.secondary">
            {history.address}
          </Typography>

          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>Payment Status:</Typography>
          <Typography paragraph variant="body2" color="text.secondary">{history.paidBy}</Typography>
        </CardContent>
        <CardContent className="bordertop">
          {
          (() => {
            if (accepted === true || rejected === true) {
              if (accepted === true) {
                <AfterAccepted />;
              } else { <AfterRejected />; }
            } else { <AcceptOrReject />; }
          })
          }
        </CardContent>
      </Card>
    </div>
  );
}
