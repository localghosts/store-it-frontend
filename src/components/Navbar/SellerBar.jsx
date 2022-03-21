import * as React from 'react';
import './Nav.css';
import Button from '@mui/material/Button';
// import StorefrontIcon from '@mui/icons-material/Storefront';
import { red } from '@mui/material/colors';
import { ThemeProvider } from '@mui/system';
import theme from '../ThemePalette';

export default function SellerBar({ setAppAuthStatus }) {
  return (
    <ThemeProvider theme={theme}>
      <div className="sellerbar" style={{ backgroundColor: theme.palette.primary.main }}>
        <div className="sellerbarLogo">
          <div className="logo-ico"><img src="/store.png" alt="storeIcon" /></div>
          <div className="logo-title">
            StoreIt
          </div>
        </div>
        <div className="sellerSideBtn">
          <div className="logout-btn">
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                color: red[50],
              }}
              size="medium"
              className="logout-component"
              onClick={() => {
                window.localStorage.removeItem('token');
                setAppAuthStatus(1);
                window.localStorage.removeItem('role');
                window.localStorage.removeItem('storeSlug');
              }}
            >
              Logout

            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
