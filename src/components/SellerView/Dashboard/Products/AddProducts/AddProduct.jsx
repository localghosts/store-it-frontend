import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AddProduct.css';
import { useState } from 'react';
import {
  Typography, InputLabel, MenuItem, Select,
  FormControl, FormHelperText,
  Collapse, Alert, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ThemeProvider } from '@mui/system';
import BASE_URL from '../../../../../url';
import theme from '../../../../ThemePalette';

export default function AddProduct({
  categories, setCategories, storeSlug,
}) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);
  const [errorProductAdd, setErrorProductAdd] = useState(false);
  const [successProductAdd, setSuccessProductAdd] = useState(false);

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
    let status;
    setErrorProductAdd(false);
    setSuccessProductAdd(false);
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
              setCategories(res.data.sort((a, b) => b.categoryID - a.categoryID));
              setSuccessProductAdd(true);
              setName('');
              setCategory('');
              setPrice('');
            });
        })
        .catch((err) => {
          status = err?.response?.status ?? 500;
          setErrorProductAdd(true);
        });
    }
    return status;
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="addProduct">
        <Card sx={{ backgroundColor: theme.palette.tertiary.main, borderRadius: 5 }} className="addCard">
          <CardContent>
            <form>
              <div className="addProductForm">
                <div className="form-component form-title">
                  <Typography><h1>Add a product</h1></Typography>
                </div>
                <Collapse in={errorProductAdd}>
                  <div className="form-component category-field">
                    <Alert
                      severity="error"
                      action={(
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setErrorProductAdd(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                )}
                      sx={{ mb: 2 }}
                    >
                      Failed to add product!
                    </Alert>
                  </div>
                </Collapse>
                <Collapse in={successProductAdd}>
                  <div className="form-component category-field">
                    <Alert
                      action={(
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setSuccessProductAdd(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                )}
                      sx={{ mb: 2 }}
                    >
                      Added a new product!
                    </Alert>
                  </div>
                </Collapse>
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
                      label="Category"
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
                  <Button variant="contained" size="large" sx={{ borderRadius: 5, width: 200 }} onClick={handleSubmit}>Submit</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
