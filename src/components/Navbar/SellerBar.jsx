import * as React from 'react';
import './Nav.css';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';

export default function SellerBar() {
  return (
    <div className="sellerbar">
      <div className="sellerbarLogo">
        <div className="logo-ico"><StorefrontIcon fontSize="large" /></div>
        <div className="logo-title">
          StoreIt
        </div>
      </div>
      <div className="sellerSideBtn">
        <div className="logout-btn">
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                height: 35,
                width: 100,
                fontSize: 18,
                color: red[50],
              }}
              size="medium"
              className="logoutButton"
            >
              Logout

            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
