import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import './CategoryLog.css';

export default function CategoryLog({ categories, setCategories }) {
  const handleStatus = (id) => {
    setCategories([...categories].map((category, index) => {
      if (id === index) { return { ...category, status: !category.status }; } return category;
    }));
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((category, index) => (index !== id)));
  };

  return (
    <div className="categoryLog">
      <Stack spacing={2}>
        <Typography><h1>Categories</h1></Typography>
        {categories.map((category, index) => (
          <Card sx={{
            display: 'flex', backgroundColor: '#D3D3D3', minHeight: 200, maxWidth: 500, borderRadius: 5,
          }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {category.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: 16 }} component="div">
                  {category.description}
                </Typography>
              </CardContent>
              <Grid container spacing={4} paddingLeft={5} paddingBottom={2}>
                <Grid item xs={5}>
                  <Button variant="contained" size="large" sx={{ borderRadius: 5, width: 120 }} paddingLeft={15} onClick={() => handleStatus(index)}>
                    {category.status === true ? 'Disable' : 'Enable'}
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <Button variant="contained" size="large" sx={{ borderRadius: 5, width: 120 }} paddingLeft={15} onClick={() => deleteCategory(index)}>Delete</Button>
                </Grid>
              </Grid>
            </Box>

            <CardMedia
              component="img"
              sx={{ width: 100 }}
              image={category.img}
              alt={category.title}
            />

          </Card>
        ))}
        <div className="save-btn">
          <Button variant="contained" sx={{ borderRadius: 10, fontSize: 17, width: 150 }} size="large">Save</Button>
        </div>
      </Stack>
    </div>
  );
}
