import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import './ProductLog.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ProductLog({
  products, setProducts, categories,
}) {
  const [open, setOpen] = React.useState(false);

  const handleStockStatus = (id) => {
    setProducts([...products].map((product, index) => {
      if (id === index) { return { ...product, instock: !product.instock }; } return product;
    }));
  };

  const deleteItem = (id) => {
    setProducts(products.filter((product, index) => (index !== id)));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="productLog">
      <h1>Products</h1>
      <TableContainer component={Paper} sx={{ backgroundColor: grey[100] }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ width: '10%', fontSize: 17, fontWeight: 'bold' }}>S.no</TableCell>
              <TableCell align="left" sx={{ width: '25%', fontSize: 17, fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell align="left" sx={{ width: '25%', fontSize: 17, fontWeight: 'bold' }}>Category</TableCell>
              <TableCell align="left" sx={{ width: '15%', fontSize: 17, fontWeight: 'bold' }}>Price (Rs. )</TableCell>
              <TableCell align="left" sx={{ width: '15%', fontSize: 17, fontWeight: 'bold' }}>In Stock</TableCell>
              <TableCell align="left" sx={{ width: '10%', fontSize: 17, fontWeight: 'bold' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              category.products.map((product, idx) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: grey[product.instock === true ? 100 : 300] }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                    {index + idx}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: 15 }}>{product.name}</TableCell>
                  <TableCell align="left" sx={{ fontSize: 15 }}>{category.name}</TableCell>
                  <TableCell align="left" sx={{ fontSize: 15 }}>{product.price}</TableCell>
                  <TableCell align="left" sx={{ fontSize: 15 }}><Switch checked={product.instock} onChange={() => handleStockStatus(index)} /></TableCell>
                  <TableCell align="left" sx={{ fontSize: 15 }}><IconButton onClick={handleClickOpen}><DeleteIcon /></IconButton></TableCell>
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
                      <Button onClick={() => deleteItem(index)}>Delete</Button>
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
