import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import '../Login.css';
import { Collapse, Alert, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import BASE_URL from '../../../url';

function SellerLogin({ setAuth }) {
  // Field Value States
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  // Error Mananagement States
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  // Loading States
  const [loading, setLoading] = useState(false);

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
    let slug;
    if (!fieldValidation(email, pass)) {
      return 400;
    }
    setLoginError(false);
    setLoading(true);
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
        slug = res.data.storeSlug;
        setLoading(false);
        setAuth(true);
        localStorage.setItem('role', 1);
        localStorage.setItem('storeSlug', slug);
      })
      .catch(((err) => {
        setErrorMsg(err.response.data.message);
        status = err?.response?.status ?? 500;
        setLoginError(true);
        setLoading(false);
      }));

    return status;
  }
  return (
    <div>
      <CardContent>
        <div className="loginForm">
          {loading === true
            ? <CircularProgress />
            : <div />}
          <Collapse in={loginError}>
            <div className="formGroup">
              <Alert
                severity="error"
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setLoginError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                )}
                sx={{ mb: 2 }}
              >
                {errorMsg}
              </Alert>
            </div>
          </Collapse>
          <div className="formGroup">
            <TextField
              required
              id="outlined-required1"
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
              id="outlined-required2"
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
