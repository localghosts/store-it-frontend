import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import './CategoryLog.css';
import { grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useState } from 'react';
import BASE_URL from '../../../../../url';

export default function CategoryLog({ categories, setCategories, storeSlug }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState();
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  };

  const handleStatus = (id) => {
    setIdx(id);
    setLoading(true);
    let status;
    axios
      .put(`${BASE_URL}/store/${storeSlug}/category/${id}/toggle`, {}, config)
      .then(() => {
        axios.get(`${BASE_URL}/store/${storeSlug}/category`, config)
          .then((res) => {
            setCategories(res.data);
            setLoading(false);
          })
          .catch((err) => { status = err?.response?.status ?? 500; });
      })
      .catch((err) => { status = err?.response?.status ?? 500; });
    return status;
  };

  const deleteCategory = (id) => {
    let status;
    axios
      .delete(`${BASE_URL}/store/${storeSlug}/category/${id}`, config)
      .then(() => {
        axios.get(`${BASE_URL}/store/${storeSlug}/category`, config)
          .then((res) => {
            setCategories(res.data);
          })
          .catch((err) => { status = err?.response?.status ?? 500; });
      })
      .catch((err) => { status = err?.response?.status ?? 500; });
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

  return (
    <div className="categoryLog">
      <Typography><h1>Categories</h1></Typography>
      {categories.length === 0
        ? (
          <Typography sx={{ fontSize: 25 }}>
            No categories found! Add a category to show.
          </Typography>
        )
        : (
          <div className="categoryLogList">
            {categories.map((category) => (
              <div className="categoryItem">
                <Card sx={{
                  display: 'flex', backgroundColor: grey[category.enabled === true ? 100 : 300], minHeight: 200, maxWidth: 500, borderRadius: 5,
                }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        {category.name}
                      </Typography>
                      {/* <Typography variant="subtitle2" color="text.secondary" sx
                  ={{ fontSize: 16 }} component="div">
                    {category.description}
                  </Typography> */}
                    </CardContent>
                    <Grid container spacing={4} paddingLeft={2} paddingBottom={2}>
                      <Grid item xs={5}>
                        {loading && idx === category.categoryID
                          ? (
                            <Button variant="contained" size="large" sx={{ borderRadius: 5, width: 100 }} paddingLeft={15} onClick={() => handleStatus(category.categoryID)}>
                              <CircularProgress sx={{ color: 'white' }} size={25} />
                            </Button>
                          )
                          : (
                            <Button variant="contained" size="large" sx={{ borderRadius: 5, width: 100 }} paddingLeft={15} onClick={() => handleStatus(category.categoryID)}>
                              {category.enabled === true ? 'Disable' : 'Enable'}
                            </Button>
                          )}
                      </Grid>
                      <Grid item xs={5}>
                        <Button variant="contained" size="large" sx={{ borderRadius: 5, width: 100 }} paddingLeft={15} onClick={() => handleClickOpen(category.categoryID)}>Delete</Button>
                      </Grid>
                      <Dialog
                        open={open}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>Delete </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete this category?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>No</Button>
                          <Button onClick={() => deleteCategory(idx)}>Delete</Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </Box>

                  <CardMedia
                    component="img"
                    sx={{ width: 150, opacity: category.enabled === false ? '0.5' : '1' }}
                    image={category.image}
                    alt={category.name}
                  />

                </Card>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
