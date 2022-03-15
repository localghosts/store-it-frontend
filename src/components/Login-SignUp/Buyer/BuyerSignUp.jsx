import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import '../Login.css';
// import axios from 'axios';

function BuyerSignUp() {
  // Field Value States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // OTP verification states
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

  // Signed Up Status Check State
  const [signedUp, setSignedUp] = useState(false);

  const navId = useNavigate(); // For navigation on verification

  const fieldValidation = (nameField, emailField, passField, confirmPassField) => {
    if (emailField === '' || passField === '' || nameField === '' || confirmPassField === '') {
      if (nameField === '') setErrorName(true);
      else setErrorName(false);

      if (emailField === '') setErrorEmail(true);
      else setErrorEmail(false);

      if (passField === '') setErrorPass(true);
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

  function signUp() {
    if (!fieldValidation(name, email, pass, confirmPass));
    else {
      setSignedUp(true);
      setOTPSent('1234');
    }
  }

  // function sendOtp() {
  //   console.log('OTP is being sent');
  //   axios.post('www.google.com', email).then((response) =>
  // { setOtpSentSuccess(response?.data?.success); setOtpSent(response?.d
  // ata?.otp); }).catch((err) => setSendOtpErr(err));
  // }

  function verifyOtp() {
    if (otp === '') {
      setErrorOTP(true);
    }
    if (otpSent === otp) {
      navId('/stores');
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
              disabled={signedUp}
              id="outlined-required"
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
              id="outlined-required"
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
              id="outlined-required"
              label="Password"
              type="password"
              sx={{ width: 250, height: 40 }}
              onChange={(event) => setPass(event.target.value)}
              value={pass}
              error={errorPass}
              helperText={errorPass === true ? 'Missing field' : ''}
            />
          </div>
          <div className="formGroup">
            <TextField
              required
              disabled={signedUp}
              type="password"
              id="outlined-required"
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

export default BuyerSignUp;
