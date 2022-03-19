import * as React from 'react';
import './Nav.css';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function Topbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <div className="logo-ico" style={{ color: 'white' }}><StorefrontIcon fontSize="large" /></div>
        <div className="logo-title" style={{ color: 'white' }}>
          StoreIt
        </div>
      </div>
    </div>
  );
}
