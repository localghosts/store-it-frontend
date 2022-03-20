import * as React from 'react';
import Card from '@mui/material/Card';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './Login.css';
import { Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { ThemeProvider } from '@mui/system';
import BuyerLogin from './Buyer/BuyerLogin';
import SellerLogin from './Seller/SellerLogin';
import BuyerSignUp from './Buyer/BuyerSignUp';
import SellerSignUp from './Seller/SellerSignUp';
import theme from '../ThemePalette';

export default function Login({
  auth, setAuth, role, setRole,
}) {
  const [buyerLogin, setBuyerLogin] = useState(true);
  const [sellerLogin, setSellerLogin] = useState(true);

  const handleChange = (event, newValue) => {
    setRole(newValue);
    setBuyerLogin(true);
    setSellerLogin(true);
  };

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuth(false);
    setRole(0);
  }, [setRole]);
  return (

    <ThemeProvider theme={theme}>
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
                  {
                (() => {
                  if (role === 0) {
                    if (buyerLogin === true) {
                      return <BuyerLogin auth={auth} setAuth={setAuth} />;
                    }

                    return <BuyerSignUp auth={auth} setAuth={setAuth} />;
                  }
                  if (sellerLogin === true) {
                    return <SellerLogin auth={auth} setAuth={setAuth} />;
                  }

                  return <SellerSignUp auth={auth} setAuth={setAuth} />;
                }
                )()
                }
                </div>
                <div className="switchMode">
                  {
                (() => {
                  if (role === 0) {
                    if (buyerLogin === true) {
                      return (
                        <Button
                          endIcon={<PersonOutlineIcon />}
                          onClick={() => setBuyerLogin(!buyerLogin)}
                        >
                          New buyer? Sign up!
                        </Button>
                      );
                    }

                    return (
                      <Button
                        endIcon={<PersonOutlineIcon />}
                        onClick={() => setBuyerLogin(!buyerLogin)}
                      >
                        Already a buyer? Log in!
                      </Button>
                    );
                  }
                  if (sellerLogin === true) {
                    return (
                      <Button
                        endIcon={<PersonOutlineIcon />}
                        onClick={() => setSellerLogin(!sellerLogin)}
                      >
                        New seller? Sign up!
                      </Button>
                    );
                  }

                  return (
                    <Button
                      endIcon={<PersonOutlineIcon />}
                      onClick={() => setSellerLogin(!sellerLogin)}
                    >
                      Already a seller? Log in!
                    </Button>
                  );
                }
                )()
                }
                </div>
              </div>
            </Card>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}
