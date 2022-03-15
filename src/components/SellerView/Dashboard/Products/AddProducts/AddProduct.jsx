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

  const fieldValidation = (nameField, categoryField, priceField) => {
    if (nameField === '' || categoryField === '' || priceField === '') {
      if (nameField === '') setErrorName(true);
      else setErrorName(false);

      if (categoryField === '') setErrorCategory(true);
      else setErrorCategory(false);

      if (priceField === '') setErrorPrice(true);
      else setErrorPrice(false);

      return false;
    }
    setErrorName(false);
    setErrorCategory(false);
    setErrorPrice(false);
    return true;
  };

  const priceValidation = (priceField) => {
    if (Number.isNaN(priceField)) {
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
      <Card sx={{ width: '80%', backgroundColor: grey[100], borderRadius: 5 }}>
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  error={errorPrice}
                  helperText={errorPrice === true ? 'Invalid entry. Price should be a number' : ''}
                />
              </div>
              <div className="form-component submit-btn">
                <Button variant="contained" size="large" onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
