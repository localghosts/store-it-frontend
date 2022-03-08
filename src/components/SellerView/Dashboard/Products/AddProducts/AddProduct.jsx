import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AddProduct.css';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { Typography } from '@mui/material';

export default function AddProduct({ products, setProducts }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);

  const fieldValidation = (name, category, price) => {
    if (name === '' || category === '' || price === '') {
      if (name === '') setErrorName(true);
      else setErrorName(false);

      if (category === '') setErrorCategory(true);
      else setErrorCategory(false);

      if (price === '') setErrorPrice(true);
      else setErrorPrice(false);

      return false;
    }
    setErrorName(false);
    setErrorCategory(false);
    setErrorPrice(false);
    return true;
  };

  const priceValidation = (price) => {
    if (isNaN(price)) {
      setErrorPrice(true);
      return false;
    }
    setErrorPrice(false);

    return true;
  };

  const handleSubmit = () => {
    if (!fieldValidation(name, category, price));
    else if (!(priceValidation(price)));
    else {
      const product = {
        product: name,
        category,
        price,
        inStock: true,
      };
      setProducts([...products, product]);
      setName('');
      setCategory('');
      setPrice('');
    }
  };

  return (
    <div className="addProduct">
      <Card sx={{ width: 350, backgroundColor: grey[100], borderRadius: 5 }}>
        <CardContent>
          <form>
            <div className="addProductForm">
              <div className="form-component form-title">
                <Typography><h1>Add a product</h1></Typography>
              </div>
              <div className="form-component category-field">
                <TextField
                  required
                  id="outlined-required"
                  label="Product"
                  sx={{ width: 300 }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errorName}
                  helperText={errorName === true ? 'Missing entry' : ''}
                />
              </div>
              <div className="form-component product-field">
                <TextField
                  required
                  id="outlined-required"
                  label="Category"
                  sx={{ width: 300 }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  error={errorCategory}
                  helperText={errorCategory === true ? 'Missing entry' : ''}
                />
              </div>
              <div className="form-component price-field">
                <TextField
                  required
                  id="outlined-required"
                  label="Price"
                  sx={{ width: 300 }}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  error={errorPrice}
                  helperText={errorPrice === true ? 'Invalid entry. Price should be a number' : ''}
                />
              </div>
              <div className="form-component submit-btn">
                <Button variant="contained" size="large" sx={{ width: '200px' }} onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
