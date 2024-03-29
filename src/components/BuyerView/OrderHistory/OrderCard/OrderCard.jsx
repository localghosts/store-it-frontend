import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import './OrderCard.css';
import { ThemeProvider } from '@mui/system';
import PrintIcon from '@mui/icons-material/Print';
import { IconButton } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import theme from '../../../ThemePalette';
import PrintOrder from './PrintOrder/PrintOrder';

export default function OrderCard({ history }) {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: 'print-body',
    documentTitle: 'Invoice',
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="card">
        <Card sx={{
          maxWidth: 300,
          minHeight: 500,
          borderRadius: 3,
          backgroundColor: theme.palette.tertiary.main,
        }}
        >

          <CardHeader
            avatar={(
              <Avatar
                src={history.store.storelogo}
                sx={{ bgcolor: theme.palette.secondary.main, height: 80, width: 80 }}
              />
            )}
            title={
              (
                <span>
                  <b><h2>{`#${history.orderID}`}</h2></b>
                  <b><h2>{history.store.storename}</h2></b>
                </span>
              )
            }
            subheader={
              (
                <span>
                  <b>
                    <h3>
                      {new Date(history.orderDate).toLocaleDateString()}
                    </h3>
                    <h3>
                      {(() => {
                        if (new Date(history.orderDate).getHours() > 12) {
                          return new Date(history.orderDate).getHours() - 12;
                        }
                        if (new Date(history.orderDate).getHours() === 0) {
                          return new Date(history.orderDate).getHours() + 12;
                        }
                        return new Date(history.orderDate).getHours();
                      }
                      )()}
                      :
                      {new Date(history.orderDate).getMinutes() < 10
                        ? `0${new Date(history.orderDate).getMinutes()}`
                        : new Date(history.orderDate).getMinutes()}
                      {' '}
                      {new Date(history.orderDate).getHours() >= 12
                        ? 'pm'
                        : 'am'}
                    </h3>
                  </b>
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
                        {product.productPrice === 1 ? 'Re.' : 'Rs.'}
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

            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>Phone:</Typography>
            <Typography paragraph variant="body2" color="text.secondary">
              {history.phoneNo}
            </Typography>

            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>Order Status:</Typography>
            <Typography variant="body2" color="text.secondary">{history.status}</Typography>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'none' }}>
                <div ref={componentRef}>
                  <PrintOrder history={history} />
                </div>
              </div>
              <IconButton onClick={() => handlePrint()}>
                <div style={{ textAlign: 'center' }}>
                  <PrintIcon />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>Print</Typography>
                </div>
              </IconButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
