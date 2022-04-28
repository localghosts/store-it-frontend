import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress } from '@mui/material';
import './CategoryLog.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useState } from 'react';
import { ThemeProvider } from '@mui/system';
import BASE_URL from '../../../../../url';
import theme from '../../../../ThemePalette';

export default function CategoryLog({ categories, setCategories, storeSlug }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  };

  const handleStatus = (id, stat) => {
    setIdx(id);
    setLoading(true);
    let status;
    axios
      .put(`${BASE_URL}/store/${storeSlug}/category/${id}`, { enabled: !stat }, config)
      .then(() => {
        axios.get(`${BASE_URL}/store/${storeSlug}/category`, config)
          .then((res) => {
            setCategories(res.data.sort((a, b) => a.name.localeCompare(b.name)));
            setLoading(false);
          })
          .catch((err) => { status = err?.response?.status ?? 500; });
      })
      .catch((err) => {
        status = err?.response?.status ?? 500;
        setError(true);
      });
    return status;
  };

  const deleteCategory = (id) => {
    let status;
    axios
      .delete(`${BASE_URL}/store/${storeSlug}/category/${id}`, config)
      .then(() => {
        axios.get(`${BASE_URL}/store/${storeSlug}/category`, config)
          .then((res) => {
            setCategories(res.data.sort((a, b) => a.name.localeCompare(b.name)));
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
    <ThemeProvider theme={theme}>
      <div
        className="categoryLog"
        style={{
          borderLeftColor: theme.palette.primary.main,
          borderRightColor: theme.palette.primary.main,
        }}
      >
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
        <Typography><h1>Categories</h1></Typography>
        {categories.length === 0
          ? (
            <Typography sx={{ fontSize: 25 }}>
              No categories found! Add a category to show.
            </Typography>
          )
          : (
            <div className="categoryLogList">
              {categories.sort((a, b) => a.name.localeCompare(b.name)).map((category) => (
                <div className="categoryItem">
                  <Card sx={{
                    display: 'flex', backgroundColor: [category.enabled === true ? theme.palette.tertiary.main : theme.palette.quaternary.main], maxWidth: 500, borderRadius: 5,
                  }}
                  >
                    <div className="categoryContentimg">
                      <div className="categoryContent">
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                              {category.name}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              sx={{ fontSize: 16 }}
                              component="div"
                            >
                              {category.description}
                            </Typography>
                          </CardContent>
                          <div className="actionButtons">
                            <div>
                              {loading && idx === category.categoryID
                                ? (
                                  <Button variant="contained" size="large" sx={{ borderRadius: 5, width: 100 }} paddingLeft={15}>
                                    <CircularProgress sx={{ color: 'white' }} size={25} />
                                  </Button>
                                )
                                : (
                                  <Button variant="contained" size="large" sx={{ borderRadius: 5, width: 100 }} paddingLeft={15} onClick={() => handleStatus(category.categoryID, category.enabled)}>
                                    {category.enabled === true ? 'Disable' : 'Enable'}
                                  </Button>
                                )}
                            </div>
                            <div>
                              <Button variant="contained" size="large" sx={{ borderRadius: 5, width: 100 }} paddingLeft={15} onClick={() => handleClickOpen(category.categoryID)}>Delete</Button>
                            </div>
                          </div>

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
                        </Box>
                      </div>
                      <div>
                        <CardMedia
                          component="img"
                          sx={{ width: 150, height: '100%', opacity: category.enabled === false ? '0.5' : '1' }}
                          image={category.image}
                          alt={category.name}
                        />
                      </div>
                    </div>

                  </Card>
                </div>
              ))}
            </div>
          )}
      </div>
    </ThemeProvider>
  );
}
