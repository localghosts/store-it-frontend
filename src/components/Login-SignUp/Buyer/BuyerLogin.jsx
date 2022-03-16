import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Collapse, Alert, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import BASE_URL from '../../../url';

function BuyerLogin() {
  // Field Value States
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  // Error Mananagement States
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Loading States
  const [loading, setLoading] = useState(false);

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
      .post(`${BASE_URL}/buyer/login`, obj, config)
      .then((res) => {
        localStorage.setItem('token', res.data?.token);
        status = res.status;
        setLoginError(false);
        navId('/stores');
        setLoading(false);
      })
      .catch(((err) => {
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
                Incorrect Email or Password!
              </Alert>
            </div>
          </Collapse>
          <div className="formGroup">
            <TextField
              required
              id="outlined-required1"
              label="Email"
              sx={{ width: 250, height: 40 }}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errorEmail}
              helperText={errorEmail === true ? 'Missing field' : ''}
            />
          </div>
          <div className="formGroup">
            <TextField
              type="password"
              required
              id="outlined-required2"
              label="Password"
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

export default BuyerLogin;
