import * as React from 'react';
import Card from '@mui/material/Card';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './Login.css';
import { Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BuyerLogin from './Buyer/Login/BuyerLogin';
import SellerLogin from './Seller/Login/SellerLogin';
import BuyerSignUp from './Buyer/SignUp/BuyerSignUp';
import SellerSignUp from './Seller/SignUp/SellerSignUp';

export default function Login() {
  const [role, setRole] = useState(0);
  const [buyerLogin, setBuyerLogin] = useState(true);
  const [sellerLogin, setSellerLogin] = useState(true);

  const handleChange = (event, newValue) => {
    setRole(newValue);
    console.log(role);
    setBuyerLogin(true);
    setSellerLogin(true);
  };
  return (
    <div className="loginMain">
      <div>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Card sx={{ width: 350, backgroundColor: '#F4F6F7', borderRadius: 3 }}>
            <div className="tabForm">
              <div className="tabs">
                <Tabs value={role} onChange={handleChange} centered>
                  <Tab label="Buyer" />
                  <Tab label="Seller" />
                </Tabs>
              </div>
              <div className="form">
                {role === 0 ? buyerLogin === true ? <BuyerLogin /> : <BuyerSignUp /> : sellerLogin === true ? <SellerLogin /> : <SellerSignUp />}
              </div>
              <div className="switchMode">
                {role === 0 ? <Button endIcon={<PersonOutlineIcon />} onClick={() => setBuyerLogin(!buyerLogin)}>New buyer? Sign in!</Button>
                  : <Button endIcon={<PersonOutlineIcon />} onClick={() => setSellerLogin(!sellerLogin)}>New seller? Sign in!</Button>}
              </div>
            </div>
          </Card>
        </Box>
      </div>
    </div>
  );
}
