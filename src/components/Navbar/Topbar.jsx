import * as React from 'react';
import './Nav.css';
// import StorefrontIcon from '@mui/icons-material/Storefront';
import { ThemeProvider } from '@mui/system';
import theme from '../ThemePalette';

export default function Topbar() {
  return (
    <ThemeProvider theme={theme}>
      <div className="topbar" style={{ backgroundColor: theme.palette.primary.main }}>
        <div className="logo">
          <div className="logo-ico" style={{ color: 'white' }}><img src="/store.png" alt="storeIcon" /></div>
          <div className="logo-title" style={{ color: 'white' }}>
            StoreIt
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
