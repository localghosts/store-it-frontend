import * as React from 'react';
import './Nav.css';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/stores" style={{ textDecoration: 'none', color: red[50] }} className="link-logo">
          <div className="logo-ico"><StorefrontIcon fontSize="large" /></div>
          <div className="logo-title">
            StoreIt
          </div>
        </Link>
      </div>
    </div>
  );
}
