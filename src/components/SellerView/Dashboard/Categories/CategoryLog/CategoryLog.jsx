import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import './CategoryLog.css';
import { grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CategoryLog({ categories, setCategories }) {
  const [open, setOpen] = React.useState(false);

  const handleStatus = (id) => {
    setCategories([...categories].map((category, index) => {
      if (id === index) { return { ...category, enabled: !category.enabled }; } return category;
    }));
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((category, index) => (index !== id)));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="categoryLog">
      <Typography><h1>Categories</h1></Typography>
      <div className="categoryLogList">
        {categories.map((category, index) => (
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
                    <Button variant="contained" size="large" sx={{ borderRadius: 5, width: 100 }} paddingLeft={15} onClick={() => handleStatus(index)}>
                      {category.enabled === true ? 'Disable' : 'Enable'}
                    </Button>
                  </Grid>
                  <Grid item xs={5}>
                    <Button variant="contained" size="large" sx={{ borderRadius: 5, width: 100 }} paddingLeft={15} onClick={handleClickOpen}>Delete</Button>
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
                      <Button onClick={() => deleteCategory(index)}>Delete</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Box>

              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={category.image}
                alt={category.name}
              />

            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
