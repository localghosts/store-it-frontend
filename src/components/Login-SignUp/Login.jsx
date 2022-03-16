import * as React from 'react';
import Card from '@mui/material/Card';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './Login.css';
import { Button } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BuyerLogin from './Buyer/BuyerLogin';
import SellerLogin from './Seller/SellerLogin';
import BuyerSignUp from './Buyer/BuyerSignUp';
import SellerSignUp from './Seller/SellerSignUp';

export default function Login() {
  const [role, setRole] = useState(0);
  const [buyerLogin, setBuyerLogin] = useState(true);
  const [sellerLogin, setSellerLogin] = useState(true);

  const handleChange = (event, newValue) => {
    setRole(newValue);
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
                {
                (() => {
                  if (role === 0) {
                    if (buyerLogin === true) {
                      return <BuyerLogin />;
                    }

                    return <BuyerSignUp />;
                  }
                  if (sellerLogin === true) {
                    return <SellerLogin />;
                  }

                  return <SellerSignUp />;
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
                          New buyer? Sign in!
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
                        New seller? Sign in!
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
  );
}
