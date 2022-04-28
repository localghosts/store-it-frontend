import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AddCategory.css';
import { useState } from 'react';
import {
  Typography, Collapse, Alert, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ThemeProvider } from '@mui/system';
import BASE_URL from '../../../../../url';
import theme from '../../../../ThemePalette';

export default function AddCategory({ setCategories, storeSlug }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [errorCategoryAdd, setErrorCategoryAdd] = useState(false);
  const [successCategoryAdd, setSuccessCategoryAdd] = useState(false);

  const fieldValidation = (nameField, descriptionField, imageField) => {
    if (nameField === '' || descriptionField === '' || imageField === '') {
      if (nameField === '') setErrorName(true);
      else setErrorName(false);

      if (descriptionField === '') setErrorDescription(true);
      else setErrorDescription(false);

      if (imageField === '') setErrorImage(true);
      else setErrorImage(false);

      return false;
    }
    setErrorName(false);
    setErrorDescription(false);
    setErrorImage(false);
    return true;
  };

  const handleSubmit = () => {
    let status;
    setErrorCategoryAdd(false);
    setSuccessCategoryAdd(false);
    if (!fieldValidation(name, description, image));
    else {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const categoryItem = {
        name,
        description,
        image,
      };
      axios.post(`${BASE_URL}/store/${storeSlug}/category`, categoryItem, config)
        .then(() => {
          axios.get(`${BASE_URL}/store/${storeSlug}/category`, config)
            .then((res) => {
              setCategories(res.data.sort((a, b) => a.name.localeCompare(b.name)));
              setName('');
              setDescription('');
              setImage('');
              setSuccessCategoryAdd(true);
            });
        })
        .catch((err) => {
          status = err?.response?.status ?? 500;
          setErrorCategoryAdd(true);
        });
    }
    return status;
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="addCategory">
        <Card sx={{ backgroundColor: theme.palette.tertiary.main, borderRadius: 5 }} className="addCard">
          <CardContent>
            <form>
              <div className="addCategoryForm">
                <div className="form-component form-title">
                  <Typography><h1>Add a category</h1></Typography>
                </div>
                <Collapse in={errorCategoryAdd}>
                  <div className="form-component category-field">
                    <Alert
                      severity="error"
                      action={(
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setErrorCategoryAdd(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                )}
                      sx={{ mb: 2 }}
                    >
                      Failed to add category!
                    </Alert>
                  </div>
                </Collapse>
                <Collapse in={successCategoryAdd}>
                  <div className="form-component category-field">
                    <Alert
                      action={(
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setSuccessCategoryAdd(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                )}
                      sx={{ mb: 2 }}
                    >
                      Added a new category!
                    </Alert>
                  </div>
                </Collapse>
                <div className="form-component title-field">
                  <TextField
                    required
                    id="outlined-required"
                    label="Title"
                    value={name}
                    sx={{ width: '250px' }}
                    onChange={(e) => setName(e.target.value)}
                    error={errorName}
                    helperText={errorName === true ? 'Missing entry' : ''}
                  />
                </div>
                <div className="form-component desc-field">
                  <TextField
                    required
                    id="outlined-required"
                    label="Description"
                    value={description}
                    multiline
                    sx={{ width: '250px' }}
                    onChange={(e) => setDescription(e.target.value)}
                    error={errorDescription}
                    helperText={errorDescription === true ? 'Missing entry' : ''}
                  />
                </div>
                <div className="form-component img-field">
                  <TextField
                    required
                    id="outlined-required"
                    label="Image Link"
                    value={image}
                    sx={{ width: '250px' }}
                    onChange={(e) => setImage(e.target.value)}
                    error={errorImage}
                    helperText={errorImage === true ? 'Missing entry' : ''}
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
