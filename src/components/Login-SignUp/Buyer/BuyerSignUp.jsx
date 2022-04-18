import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../Login.css';
import axios from 'axios';
import { Collapse, Alert, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import BASE_URL from '../../../url';

function BuyerSignUp({ setAppAuthStatus }) {
  // Field Value States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // OTP verification states
  const [otp, setOtp] = useState('');
  const [otpSent, setOTPSent] = useState(false);

  // Error Management States
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorOTP, setErrorOTP] = useState(false);
  const [errorConfirmPass, setErrorConfirmPass] = useState(false);
  const [errorVerify, setErrorVerify] = useState(false);
  const [errorMismatch, setErrorMismatch] = useState(false);
  const [signUpError, setSIgnUpError] = useState(false);

  // Loading States
  const [loading, setLoading] = useState(false);

  // Signed Up Status Check State
  const [signedUp, setSignedUp] = useState(false);

  const fieldValidation = (nameField, emailField, passField, confirmPassField) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (emailField === '' || passField === '' || !re.test(passField) || nameField === '' || confirmPassField === '') {
      if (nameField === '') setErrorName(true);
      else setErrorName(false);

      if (emailField === '') setErrorEmail(true);
      else setErrorEmail(false);

      if (passField === '' || !re.test(passField)) setErrorPass(true);
      else setErrorPass(false);

      if (confirmPassField === '') setErrorConfirmPass(true);
      else setErrorConfirmPass(false);

      return false;
    }
    setErrorEmail(false);
    setErrorPass(false);
    setErrorConfirmPass(false);
    setErrorName(false);
    return true;
  };

  function sendOtp() {
    let status;
    axios.post(`${BASE_URL}/otp`, { email })
      .then((res) => {
        status = res.status;
        setLoading(false);
        setSignedUp(true);
        setOTPSent(true);
        setSIgnUpError(false);
      })
      .catch((err) => {
        status = err?.response?.status ?? 500;
        setLoading(false);
        setSIgnUpError(true);
        setSignedUp(false);
      });

    return status;
  }

  function signUp() {
    setSIgnUpError(false);
    if (!fieldValidation(name, email, pass, confirmPass));
    else if (confirmPass !== pass) {
      setErrorMismatch(true);
    } else {
      setLoading(true);
      setErrorMismatch(false);
      sendOtp();
    }
  }

  function verifyOtp() {
    if (otp === '') {
      setErrorOTP(true);
      return 400;
    }
    setLoading(true);
    setErrorVerify(false);
    const obj = {
      email,
      password: pass,
      otp,
      name,
    };

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    let status;

    axios
      .post(`${BASE_URL}/buyer/signup`, obj, config)
      .then((res) => {
        localStorage.setItem('token', res.data?.token);
        status = res.status;
        setLoading(false);
        localStorage.setItem('role', 0);
        setAppAuthStatus(2);
      })
      .catch(((err) => {
        status = err?.response?.status ?? 500;
        setErrorVerify(true);
        setLoading(false);
      }));

    return status;
  }

  return (
    <div>
      <CardContent>
        <div className="loginForm">
          <Collapse in={errorMismatch}>
            <div className="formGroup">
              <Alert
                severity="error"
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrorMismatch(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                )}
                sx={{ mb: 2 }}
              >
                Passwords dont match!
              </Alert>
            </div>
          </Collapse>
          <Collapse in={errorVerify}>
            <div className="formGroup">
              <Alert
                severity="error"
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrorVerify(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                )}
                sx={{ mb: 2 }}
              >
                Incorrect OTP!
              </Alert>
            </div>
          </Collapse>
          <Collapse in={otpSent}>
            <div className="formGroup">
              <Alert
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOTPSent(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                )}
                sx={{ mb: 2 }}
              >
                OTP sent to email!
              </Alert>
            </div>
          </Collapse>
          {loading === true
            ? <CircularProgress />
            : <div />}
          <Collapse in={signUpError}>
            <div className="formGroup">
              <Alert
                severity="error"
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setSIgnUpError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                )}
                sx={{ mb: 2 }}
              >
                Something went wrong! Try again!
              </Alert>
            </div>
          </Collapse>

          <div className="formGroup">
            <TextField
              required
              disabled={signedUp}
              id="outlined-required1"
              label="Name"
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setName(event.target.value)}
              value={name}
              error={errorName}
              helperText={errorName === true ? 'Missing field' : ''}
            />
          </div>
          <div className="formGroup">
            <TextField
              required
              disabled={signedUp}
              id="outlined-required2"
              label="Email"
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              error={errorEmail}
              helperText={errorEmail === true ? 'Missing field' : ''}
            />
          </div>
          <div className="formGroup">
            <TextField
              required
              disabled={signedUp}
              id="outlined-required3"
              label="Password"
              type="password"
              sx={{ width: 250, height: errorPass === true ? 100 : 40 }}
              onChange={(event) => setPass(event.target.value)}
              value={pass}
              error={errorPass}
              helperText={errorPass === true
                ? 'Use password having atleast one special character, 1 lowercase letter, 1 uppercase letter and 1 numeric character of 8-15 character length' : ''}
            />
          </div>
          <div className="formGroup">
            <TextField
              required
              disabled={signedUp}
              type="password"
              id="outlined-required4"
              label="Confirm Password"
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setConfirmPass(event.target.value)}
              value={confirmPass}
              error={errorConfirmPass}
              helperText={errorConfirmPass === true ? 'Missing field' : ''}
            />
          </div>
          {signedUp === false
            ? (
              <div className="formGroup">
                <Button
                  variant="contained"
                  sx={{ width: 250, height: 40 }}
                  size="large"
                  onClick={() => signUp()}
                >
                  Sign Up
                </Button>
              </div>
            ) : <div />}
          {signedUp === true
            ? (
              <div>
                <div className="formGroup">
                  <TextField
                    required
                    id="outlined-required"
                    label="OTP"
                    sx={{ width: 250, height: 40 }}
                    onChange={(event) => setOtp(event.target.value)}
                    value={otp}
                    error={errorOTP}
                    type="password"
                    helperText={errorOTP === true ? 'Missing field' : ''}
                  />
                </div>
                <div className="verifyBtn formGroup">
                  <Button
                    variant="contained"
                    label="Password"
                    sx={{ width: 250, height: 40 }}
                    size="large"
                    onClick={() => verifyOtp()}
                  >
                    Verify OTP

                  </Button>
                </div>
              </div>
            )
            : <div />}
        </div>
      </CardContent>
    </div>
  );
}

export default BuyerSignUp;
