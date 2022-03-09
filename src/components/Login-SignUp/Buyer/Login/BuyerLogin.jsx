import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './BuyerLogin.css';
import axios from 'axios';

function BuyerLogin() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [setSuccess] = useState(false);
  const [setRoles] = useState();
  const [setErr] = useState('');
  function handleLogin() {
    console.log('Login clicked');
    console.log(email, pass);
    axios
      .post('www.google.com', { email, pass }).then((response) => { setSuccess(response?.data?.success); setRoles(response?.data?.roles); }).catch(((err) => setErr(err)));
  }
  return (
    <div>
      <CardContent>
        <div className="loginForm">
          <div className="formGroup">
            <TextField required id="outlined-required" label="Email" sx={{ width: 250, height: 40 }} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="formGroup">
            <TextField required id="outlined-required" label="Password" sx={{ width: 250, height: 40 }} onChange={(event) => setPass(event.target.value)} />
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
