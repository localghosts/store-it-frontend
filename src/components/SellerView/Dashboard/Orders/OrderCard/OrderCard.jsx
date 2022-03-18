import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { grey, red } from '@mui/material/colors';
import './OrderCard.css';
import {
  Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button,
} from '@mui/material';
import AcceptOrReject from './OrderStatus/AcceptOrReject';
import AfterRejected from './OrderStatus/AfterRejected';
import AfterAccepted from './OrderStatus/AfterAccepted';

export default function OrderCard({ singleOrder, setHistory, storeSlug }) {
  const [error, setError] = React.useState(false);
  const closeModal = () => setError(false);

  return (
    <div className="card">
      <Dialog
        open={error}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Failed to perform the action
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Try again!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
      <Card sx={{
        maxWidth: 300, minHeight: 500, borderRadius: 3, backgroundColor: grey[200],
      }}
      >
        <CardHeader
          avatar={(
            <Avatar
              sx={{ bgcolor: red[300], height: 80, width: 80 }}
              src={singleOrder.userProfile}
            />
          )}
          title={(
            <span className="orderTitle">
              <b>
                <h2>
                  Order #
                  {singleOrder.orderID}
                </h2>
              </b>
              <span> </span>
            </span>
)}
          subheader={(
            <span>
              <b>
                <h3>
                  {new Date(singleOrder.orderDate).toLocaleDateString()}
                </h3>
              </b>
            </span>
)}
        />

        <CardContent>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold', fontFamily: 'Arial' }}>
            <div className="bill">
              {singleOrder.orderItems.map((product) => (
                <div className="bill-item">
                  <div className="items-card">
                    <div className="item">{product.productName}</div>
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
                      {product.productPrice === 1 ? 'Re.' : 'Rs.'}
                      {' '}
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
              {/* <div className="price-total">
                <div className="price">
                  Rs.
                  {' '}
                  {singleOrder.total}
                </div>
              </div> */}
            </div>
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>Name:</Typography>
          <Typography paragraph variant="body2" color="text.secondary">
            {singleOrder.buyer.name}
          </Typography>

          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>Address:</Typography>
          <Typography paragraph variant="body2" color="text.secondary">
            {singleOrder.address}
          </Typography>
        </CardContent>
        <CardContent className="bordertop">
          {
          (() => {
            if (singleOrder.status === 'PLACED') {
              return (
                <AcceptOrReject
                  singleOrder={singleOrder}
                  setHistory={setHistory}
                  storeSlug={storeSlug}
                  setError={setError}
                />
              );
            }
            if (singleOrder.status === 'REJECTED') {
              return (
                <AfterRejected
                  singleOrder={singleOrder}
                  setHistory={setHistory}
                  storeSlug={storeSlug}
                  setError={setError}
                />
              );
            }
            return (
              <AfterAccepted
                singleOrder={singleOrder}
                setHistory={setHistory}
                storeSlug={storeSlug}
                setError={setError}
              />
            );
          }
          )()
          }
        </CardContent>
      </Card>
    </div>
  );
}
