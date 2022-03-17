import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AddCategory.css';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
import BASE_URL from '../../../../../url';

export default function AddCategory({ setCategories, storeSlug }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorImage, setErrorImage] = useState(false);

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
    if (!fieldValidation(name, description, image));
    else {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const categoryItem = {
        name,
        image,
      };
      axios.post(`${BASE_URL}/store/${storeSlug}/category`, categoryItem, config)
        .then(() => {
          axios.get(`${BASE_URL}/store/${storeSlug}/category`, config)
            .then((res) => {
              setCategories(res.data);
              setName('');
              setDescription('');
              setImage('');
            });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="addCategory">
      <Card sx={{ width: '80%', backgroundColor: grey[100], borderRadius: 5 }}>
        <CardContent>
          <form>
            <div className="addCategoryForm">
              <div className="form-component form-title">
                <Typography><h1>Add a category</h1></Typography>
              </div>
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
                <Button variant="contained" size="large" onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
