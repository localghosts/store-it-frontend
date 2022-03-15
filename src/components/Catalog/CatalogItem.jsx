import * as React from 'react';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

export default function CatalogItem({ store }) {
  return (
    <div className="catalogItem">
      <Button onClick={() => { alert('clicked'); }}>
        <ImageListItem key={store.imgDir}>
          <img
            src={`${store.imgDir}?w=250&fit=crop&auto=format`}
            alt={store.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={store.name}
            subtitle={store.description}
          />
        </ImageListItem>
      </Button>
    </div>
  );
}
