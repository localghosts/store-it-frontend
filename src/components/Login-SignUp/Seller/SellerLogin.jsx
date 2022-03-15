import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import '../Login.css';
import { useNavigate } from 'react-router-dom';

function SellerLogin() {
  // Field Value States
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  // Error Mananagement States
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);

  const BASE_URL = 'SOMETHING';

  const navId = useNavigate();
  const fieldValidation = (emailField, passField) => {
    if (emailField === '' || passField === '') {
      if (emailField === '') setErrorEmail(true);
      else setErrorEmail(false);

      if (passField === '') setErrorPass(true);
      else setErrorPass(false);

      return false;
    }
    setErrorEmail(false);
    setErrorPass(false);
    return true;
  };

  function handleLogin() {
    if (!fieldValidation(email, pass)) {
      return 400;
    }

    const obj = {
      email,
      password: pass,
    };

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    let status;

    axios
      .post(`${BASE_URL}/seller/login`, obj, config)
      .then((res) => {
        localStorage.setItem('token', res.data?.token);
        status = res.status;
        navId('/stores');
      })
      .catch(((err) => {
        status = err?.response?.status ?? 500;
      }));

    return status;
  }
  return (
    <div>
      <CardContent>
        <div className="loginForm">
          <div className="formGroup">
            <TextField
              required
              id="outlined-required"
              label="Email"
              value={email}
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setEmail(event.target.value)}
              error={errorEmail}
              helperText={errorEmail === true ? 'Missing field' : ''}
            />
          </div>
          <div className="formGroup">
            <TextField
              required
              id="outlined-required"
              label="Password"
              type="password"
              value={pass}
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setPass(event.target.value)}
              error={errorPass}
              helperText={errorPass === true ? 'Missing field' : ''}
            />
          </div>
          <div className="formGroup">
            <Button variant="contained" label="Password" sx={{ width: 250, height: 40 }} size="large" onClick={() => handleLogin()}>Login</Button>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

export default SellerLogin;
