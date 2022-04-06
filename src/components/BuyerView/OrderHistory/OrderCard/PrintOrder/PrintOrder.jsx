import React from 'react';
import './PrintOrder.css';
import {
  Table, TableContainer, Paper, TableCell, TableHead, TableRow, TableBody,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/system';
import theme from '../../../../ThemePalette';

function PrintOrder({ history }) {
  return (
    <ThemeProvider theme={theme}>
      <div className="invoice">
        <div className="invoiceHeader invoiceItem">
          <h1>StoreIt</h1>
          <div>Invoice</div>
        </div>
        <div className="invoiceTime invoiceItem">
          <div>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 16, fontWeight: 'bold' }}>Date:</Typography>
            <Typography paragraph variant="body2" color="text.secondary" fontSize={16}>
              {new Date(history.orderDate).toLocaleDateString()}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 16, fontWeight: 'bold' }}>Time:</Typography>
            <Typography paragraph variant="body2" color="text.secondary" fontSize={16}>
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
            </Typography>
          </div>
        </div>
        <div className="invoiceHeading invoiceItem">
          <div>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 16, fontWeight: 'bold' }}>Invoice no.:</Typography>
            <Typography paragraph variant="body2" color="text.secondary" fontSize={16}>
              #0
              {history.orderID}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 16, fontWeight: 'bold' }}>Shop name:</Typography>
            <Typography paragraph variant="body2" color="text.secondary">
              {history.store.storename}
            </Typography>
          </div>
        </div>
        <div className="invoiceDetails invoiceItem">
          <div>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 16, fontWeight: 'bold' }}>Address:</Typography>
            <Typography paragraph variant="body2" color="text.secondary" fontSize={16}>
              {history.address}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.primary" sx={{ fontSize: 16, fontWeight: 'bold' }}>Phone:</Typography>
            <Typography paragraph variant="body2" color="text.secondary" fontSize={16}>
              {history.phoneNo}
            </Typography>
          </div>
        </div>
        <div className="invoiceItem invoiceStatus">
          <Typography variant="body2" color="text.primary" sx={{ fontSize: 16, fontWeight: 'bold' }}>Order Status:</Typography>
          <Typography variant="body2" color="text.secondary" fontSize={16}>{history.status}</Typography>
        </div>
        <div className="invoiceTable invoiceItem">
          <TableContainer component={Paper}>
            <Table sx={{ width: '700px' }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: theme.palette.secondary.main }}>
                <TableRow>
                  <TableCell align="left" sx={{ width: '25%', fontSize: 17, fontWeight: 'bold' }}>Product Name</TableCell>
                  <TableCell align="left" sx={{ width: '25%', fontSize: 17, fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell align="left" sx={{ width: '15%', fontSize: 17, fontWeight: 'bold' }}>Price (Rs. ) per Item</TableCell>
                  <TableCell align="left" sx={{ width: '10%', fontSize: 17, fontWeight: 'bold' }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {history.orderItems.map((product) => (
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell align="left" sx={{ fontSize: 15 }}>{product.productName}</TableCell>
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      {product.quantity}
                      {' '}
                      x
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      Rs.
                      {' '}
                      {product.productPrice}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                />
                <TableCell align="left" sx={{ fontSize: 15 }}>Total:</TableCell>
                <TableCell align="left" sx={{ fontSize: 15 }} />
                <TableCell align="left" sx={{ fontSize: 15 }}>
                  Rs.
                  {' '}
                  {history.amount}
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="invoiceFooter invoiceItem">
          Thank You for shopping with StoreIt
        </div>
      </div>
    </ThemeProvider>
  );
}

export default PrintOrder;
