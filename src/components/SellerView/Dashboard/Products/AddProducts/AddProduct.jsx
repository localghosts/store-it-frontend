import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AddProduct.css';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import {
  Typography, InputLabel, MenuItem, Select,
  FormControl, FormHelperText,
} from '@mui/material';
import axios from 'axios';
import BASE_URL from '../../../../../url';

export default function AddProduct({
  categories, setCategories, storeSlug,
}) {
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
    const val = /^[0-9]+$/.test(priceField);
    if (val === false) {
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
      const config = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const productItem = {
        name,
        price,
      };
      axios.post(`${BASE_URL}/store/${storeSlug}/${category}`, productItem, config)
        .then(() => {
          axios.get(`${BASE_URL}/store/${storeSlug}/category`, config)
            .then((res) => {
              setCategories(res.data);
              setName('');
              setCategory('');
              setPrice('');
            });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value);
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
                  sx={{ width: '250px' }}
                  helperText={errorName === true ? 'Missing product name' : ''}
                />
              </div>
              <div className="form-component product-field">
                <FormControl sx={{ m: 1, minWidth: '250px' }} error={errorCategory}>
                  <InputLabel id="demo-simple-select-error-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-error-label"
                    id="demo-simple-select-error"
                    value={category}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {categories
                      .map((categoryItem) => (
                        <MenuItem
                          value={categoryItem.categoryID}
                        >
                          {categoryItem.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {errorCategory ? <FormHelperText>Missing Category</FormHelperText> : <div />}
                </FormControl>
              </div>
              <div className="form-component price-field">
                <TextField
                  required
                  id="outlined-required"
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  error={errorPrice}
                  sx={{ width: '250px' }}
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
