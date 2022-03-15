import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../Login.css';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SellerSignUp() {
  // Field Value States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeLogo, setStoreLogo] = useState('');
  const [storeBanner, setStoreBanner] = useState('');

  // OTP Verification states
  const [otpSent, setOTPSent] = useState('');
  const [otp, setOtp] = useState('');
  // const [otpVerifySuccess, setOtpVerifySuccess] = useState(false);
  // const [setSignUpSuccess] = useState(false);
  // const [setRoles] = useState();

  // Error Management States
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorOTP, setErrorOTP] = useState(false);
  const [errorConfirmPass, setErrorConfirmPass] = useState(false);
  const [errorStoreName, setErrorStoreName] = useState(false);
  const [errorStoreLogo, setErrorStoreLogo] = useState(false);
  const [errorStoreBanner, setErrorStoreBanner] = useState(false);

  // Signed Up Status Check State
  const [signedUp, setSignedUp] = useState(false);

  const navId = useNavigate(); // For navigation on verification

  const fieldValidation = (
    nameField,
    emailField,
    passField,
    confirmPassField,
    storeNameField,
    storeBannerField,
    storeLogoField,
  ) => {
    if (emailField === '' || passField === '' || nameField === '' || confirmPassField === '') {
      if (nameField === '') setErrorName(true);
      else setErrorName(false);

      if (emailField === '') setErrorEmail(true);
      else setErrorEmail(false);

      if (passField === '') setErrorPass(true);
      else setErrorPass(false);

      if (confirmPassField === '') setErrorConfirmPass(true);
      else setErrorConfirmPass(false);

      if (storeNameField === '') setErrorStoreName(true);
      else setErrorStoreName(false);

      if (storeLogoField === '') setErrorStoreLogo(true);
      else setErrorStoreLogo(false);

      if (storeBannerField === '') setErrorStoreBanner(true);
      else setErrorStoreBanner(false);
      return false;
    }
    setErrorEmail(false);
    setErrorPass(false);
    setErrorConfirmPass(false);
    setErrorName(false);
    setErrorStoreLogo(false);
    setErrorStoreName(false);
    setErrorStoreBanner(false);
    return true;
  };
  function signUp() {
    if (!fieldValidation(name, email, pass, confirmPass, storeBanner, storeLogo, storeName));
    else {
      setSignedUp(true);
      setOTPSent('1234');
    }
  }
  // function sendOtp() {
  //   alert('CLICKED');
  //   console.log('OTP is being sent');
  //   axios.post('www.google.com', email).then((response) => {
  //   setOtpSentSuccess(response?.data?.success); setOtpSent(response?.data?.otp);
  //  }).catch((err) => setSendOtpErr(err));
  // }
  function verifyOtp() {
    if (otp === '') {
      setErrorOTP(true);
    }
    if (otpSent === otp) {
      navId('/seller/dashboard');
    } else {
      alert('Incorrect OTP!');
      setOtp('');
    }
  }
  return (
    <div>
      <CardContent>
        <div className="loginForm">
          <div className="formGroup">
            <TextField
              required
              id="outlined-required"
              label="Name"
              value={name}
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setName(event.target.value)}
              error={errorName}
              helperText={errorName === true ? 'Missing field' : ''}
            />
          </div>
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
              label="Store Name"
              value={storeName}
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setStoreName(event.target.value)}
              error={errorStoreName}
              helperText={errorStoreName === true ? 'Missing field' : ''}
            />
          </div>
          <div className="formGroup">
            <TextField
              required
              id="outlined-required"
              label="Store Logo"
              value={storeLogo}
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setStoreLogo(event.target.value)}
              error={errorStoreLogo}
              helperText={errorStoreLogo === true ? 'Missing field' : ''}
            />
          </div>
          <div className="formGroup">
            <TextField
              required
              id="outlined-required"
              label="Store Banner"
              value={storeBanner}
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setStoreBanner(event.target.value)}
              error={errorStoreBanner}
              helperText={errorStoreBanner === true ? 'Missing field' : ''}
            />
          </div>
          <div className="formGroup">
            <TextField
              required
              id="outlined-required"
              label="Password"
              value={pass}
              type="password"
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setPass(event.target.value)}
              error={errorPass}
              helperText={errorPass === true ? 'Missing field' : ''}
            />
          </div>
          <div className="formGroup">
            <TextField
              required
              id="outlined-required"
              label="Confirm Password"
              type="password"
              value={confirmPass}
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setConfirmPass(event.target.value)}
              error={errorConfirmPass}
              helperText={errorConfirmPass === true ? 'Missing field' : ''}
            />
          </div>
          {signedUp === false
            ? (
              <div className="formGroup">
                <Button
                  variant="contained"
                  label="Password"
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

export default SellerSignUp;
