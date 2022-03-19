import * as React from 'react';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function CatalogItem({ store }) {
  return (
    <div className="catalogItem">
      <Link to={`/stores/${store.storeslug}`}>
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
      </Link>
    </div>
  );
}
