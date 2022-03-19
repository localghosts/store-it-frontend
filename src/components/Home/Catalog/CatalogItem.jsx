import * as React from 'react';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

export default function CatalogItem({ store }) {
  return (
    <div className="catalogItem">
      <Button>
        <ImageListItem key={store.storeslug}>
          <div className="cropped">
            <img
              src={store.storebanner}
              alt={store.storename}
              loading="lazy"
              className="croppedTile"
            />
          </div>
          <ImageListItemBar
            title={store.storename}
          />
        </ImageListItem>
      </Button>
    </div>
  );
}
