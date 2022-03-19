import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import {
  IconButton, Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import './ProductLog.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import BASE_URL from '../../../../../url';

function ProductLog({
  categories, setCategories, storeSlug,
}) {
  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = useState();
  const [error, setError] = useState(false);

  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  };

  const handleStockStatus = (id, stat) => {
    let status;
    axios
      .put(`${BASE_URL}/store/${storeSlug}/product/${id}`, { instock: !stat }, config)
      .then(() => {
        axios.get(`${BASE_URL}/store/${storeSlug}/category`, config)
          .then((res) => {
            setCategories(res.data);
          })
          .catch((err) => { status = err?.response?.status ?? 500; });
      })
      .catch((err) => {
        status = err?.response?.status ?? 500;
        setError(true);
      });
    setOpen(false);

    return status;
  };

  const deleteItem = (id) => {
    let status;
    axios
      .delete(`${BASE_URL}/store/${storeSlug}/product/${id}`, config)
      .then(() => {
        axios.get(`${BASE_URL}/store/${storeSlug}/category`, config)
          .then((res) => {
            setCategories(res.data);
          })
          .catch((err) => { status = err?.response?.status ?? 500; });
      })
      .catch((err) => {
        status = err?.response?.status ?? 500;
        setError(true);
      });
    setOpen(false);

    return status;
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdx(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeModal = () => setError(false);

  return (
    <div className="productLog">
      <h1>Products</h1>
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
      <TableContainer component={Paper} sx={{ backgroundColor: grey[100] }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ width: '25%', fontSize: 17, fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell align="left" sx={{ width: '25%', fontSize: 17, fontWeight: 'bold' }}>Category</TableCell>
              <TableCell align="left" sx={{ width: '15%', fontSize: 17, fontWeight: 'bold' }}>Price (Rs. )</TableCell>
              <TableCell align="left" sx={{ width: '15%', fontSize: 17, fontWeight: 'bold' }}>In Stock</TableCell>
              <TableCell align="left" sx={{ width: '10%', fontSize: 17, fontWeight: 'bold' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              category.products.map((product) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: grey[product.instock === true ? 100 : 300] }}
                >
                  <TableCell align="left" sx={{ fontSize: 15 }}>{product.name}</TableCell>
                  <TableCell align="left" sx={{ fontSize: 15 }}>{category.name}</TableCell>
                  <TableCell align="left" sx={{ fontSize: 15 }}>{product.price}</TableCell>
                  <TableCell align="left" sx={{ fontSize: 15 }}><Switch checked={product.instock} onChange={() => handleStockStatus(product.productID, product.instock)} /></TableCell>
                  <TableCell align="left" sx={{ fontSize: 15 }}><IconButton onClick={() => handleClickOpen(product.productID)}><DeleteIcon /></IconButton></TableCell>
                  <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>Delete </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this product?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>No</Button>
                      <Button onClick={() => deleteItem(idx)}>Delete</Button>
                    </DialogActions>
                  </Dialog>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductLog;
