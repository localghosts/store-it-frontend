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
              }}
              endIcon={<ArrowForwardIcon />}
              size="small"
            >
              Go to Store
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <ul>
          {storeElement.products.map((product) => (
            <li>
              <div className="item">
                <b>{product.name}</b>
              </div>
              <div className="price">
                {product.price === 1 ? 'Re.' : 'Rs.'}
                {' '}
                {product.price}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Card;
