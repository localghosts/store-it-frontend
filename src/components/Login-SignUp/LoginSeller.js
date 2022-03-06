import React, {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './login.scss';
import '@fontsource/roboto/400.css';
import Button from '@mui/material/Button';
import  TextField  from '@mui/material/TextField';
import Typography  from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles, ThemeProvider, createTheme } from '@mui/material/styles';
import {blue} from '@mui/material/colors';
import Box from '@mui/material/Box';
const theme =  createTheme({
  palette:{
    primary: {main: blue[500],}
  }

})

export default function LoginSeller(){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [success, setSuccess] = useState(false);
    const [roles, setRoles] = useState();
    const [err, setErr] = useState('');
    function handleLogin()
    {
        console.log('Login clicked');
        console.log(email, pass);
        axios
        .post('www.google.com', {email, pass}).then((response)=>{setSuccess(response?.data?.success); setRoles(response?.data?.roles); }).catch((err => setErr(err)));
        ;
    }
    return(
              <div className="base-container" align ="center">
                <Container>
              <Typography variant="h2" component="h2">
                <br></br>
                  Seller LogIn
              </Typography>
              </Container >
              <Box t={3}>
              <Container fluid="true" maxWidth="sm" color="black">
              <div className="content">
              <div className="form">
                  <label>{err}</label>
                  <br></br>
                  <div className="form-group">
                  <label htmlFor="username" >Email</label>
                  <br></br>
                  <TextField variant="outlined"  name = "Email" placeholder="Email" onChange={event => setEmail(event.target.value)}></TextField>
                  </div>
                  <div className="form-group">
                  <br></br>
                  <label htmlFor="password">Password</label>
                  <br></br>
                  <TextField variant="outlined" name = "password"  placeholder="password" onChange ={event => setPass(event.target.value)}></TextField></div>
                  </div>
              </div>
              </Container>
              </Box>
              <Box t={1}>
              <div className="footer">
                  <Button variant="contained" onClick={event => handleLogin()}>Login</Button>
                  
            </div>
            </Box>
            </div>
    );
}