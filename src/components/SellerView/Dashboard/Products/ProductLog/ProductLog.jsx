import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import './ProductLog.css';

function ProductLog({ products, setProducts }) {
  const handleStockStatus = (id) => {
    setProducts([...products].map((product, index) => {
      if (id === index) { return { ...product, inStock: !product.inStock }; } return product;
    }));
  };

  const deleteItem = (id) => {
    setProducts(products.filter((product, index) => (index !== id)));
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
            {products.map((row, index) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: grey[row.inStock === true ? 100 : 300] }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  {index + 1}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 15 }}>{row.product}</TableCell>
                <TableCell align="left" sx={{ fontSize: 15 }}>{row.category}</TableCell>
                <TableCell align="left" sx={{ fontSize: 15 }}>{row.price}</TableCell>
                <TableCell align="left" sx={{ fontSize: 15 }}><Switch checked={row.inStock} onChange={() => handleStockStatus(index)} /></TableCell>
                <TableCell align="left" sx={{ fontSize: 15 }}><IconButton onClick={() => deleteItem(index)}><DeleteIcon /></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductLog;
