import React from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

function Card({ storeElement }) {
  return (
    <div className="Card">
      <div className="Card-title">
        <div className="title"><h4>{storeElement.storeName}</h4></div>
        <div className="goto">
          <Link to={`stores/${storeElement.storeSlug}`} style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              sx={{
                height: 30,
                fontSize: '0.7em',
              }}
              endIcon={<ArrowForwardIcon />}
              size="small"
              className="gotoStore"
            >
              Go to Store
            </Button>
          </Link>
        </div>
      </div>
      <div className="item-search">
        <div className="item">
          <b>{storeElement.productName}</b>
        </div>
        <div className="price">
          {storeElement.price === 1 ? 'Re.' : 'Rs.'}
          {' '}
          {storeElement.price}
        </div>
      </div>
    </div>
  );
}

export default Card;
