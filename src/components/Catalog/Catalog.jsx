import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CatalogItem from './CatalogItem';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'gray',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Catalog() {
  const stores = {
    dominos: {
      name: "Domino's",
      description: "The authentic taste of Pizza in Domino's style inside IITK campus",
      imgDir: 'Images/dominos.jfif',
    },
    books: {
      name: 'Nobel Book Stall',
      description: 'Books and stationery shop inside IITK campus',
      imgDir: 'Images/books.jfif',
    },
    bakery: {
      name: 'Adarsh Bakery',
      description: 'Bakery shop inside IITK campus',
      imgDir: 'Images/bakery.jfif',
    },
    garments: {
      name: 'Utsav Cloth House',
      description: 'Garments shop inside IITK campus',
      imgDir: 'Images/garments.jfif',
    },
  };
  return (
    <Grid container spacing={1} backgroundColor="#DCDCDC">
      <Grid item xs={3}>
        <Item><CatalogItem store={stores.dominos} /></Item>
      </Grid>
      <Grid item xs={3}>
        <Item><CatalogItem store={stores.books} /></Item>
      </Grid>
      <Grid item xs={3}>
        <Item><CatalogItem store={stores.bakery} /></Item>
      </Grid>
      <Grid item xs={3}>
        <Item><CatalogItem store={stores.garments} /></Item>
      </Grid>
    </Grid>
  );
}
