import React , {setState, useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './login.scss';
import '@fontsource/roboto/400.css';
import Button from '@mui/material/Button';
import  TextField  from '@mui/material/TextField';
import Typography  from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { makeStyles, ThemeProvider, createTheme } from '@mui/material/styles';
import {blue} from '@mui/material/colors'
const theme =  createTheme({
  palette:{
    primary: {main: blue[500],}
  }

})

export default function SignUpSeller(){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [otpSent, setOtpSent] = useState(0);
    const [otpSentSuccess, setOtpSentSuccess] = useState(false);
    const [otp, setOtp] = useState(0);
    const [otpVerifySuccess, setOtpVerifySuccess] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [sendOtpErr, setSendOtpErr] = useState('');
    const [otpMsg, setOtpMsg] = useState('');
    const [roles, setRoles] = useState();
    const [signUpErr, setSignUpErr] = useState();
    const [storeName, setStoreName] = useState();


    function sendOtp()
    {
        console.log("OTP is being sent");
        axios.post('www.google.com', email).then((response) => {setOtpSentSuccess(response?.data?.success); setOtpSent(response?.data?.otp);}) .catch((err)=>setSendOtpErr(err));
    }
    function verifyOtp()
    {
        console.log("OTP will be verified");
        if(otpSentSuccess)
        {
            if(otpSent === otp)
            {
                setOtpVerifySuccess(true);
                setOtpMsg("OTP is correct!");
                setSignUpErr("");
            }
            else
            {
                setOtpMsg("OTP is incorrect, try again!");
            }
        }
        else
        {
            setOtpMsg("Enter Email and click on send OTP first!");
        }
    }
    function signUp()
    {
        console.log("SignUp!");
        if(otpVerifySuccess)
        {
            axios.post('www.google.com', {email, storeName, pass, confirmPass}).then((response) => {setSignUpSuccess(response?.data?.success); setRoles(response?.data?.roles);}).catch(err => setSignUpErr(err));
        }
        else
        {
            setSignUpErr("Verify OTP first!");
        }
    }
    return(
              <div className="base-container" align ="center">
                  <Container>
            <Typography variant="h2" component="h2">
                <br></br>
                  Seller SignUp
              </Typography>
              </Container>
              <Box m ={3}>
            <div className="content">
            <div className="form">
                <div className="formgroup">
                <label>{signUpErr}</label>
                <br></br>
                <label htmlFor="email">Email</label>
                <Box m={1}>
                <TextField variant="outlined" name="email"  placeholder="email id" onChange={event => {setEmail(event.target.value)}}></TextField>
                <Button variant="contained" onClick={event => sendOtp()}>Send OTP</Button>
                </Box>
                <Box m={1}>
                <label>{sendOtpErr}</label>
                </Box>
                </div>
                <div className="formgroup">
                <label>{otpMsg}</label>
                <br></br>
                <label>Enter OTP </label>
                <Box m={1}>
                <TextField variant="outlined"  name="OTP" placeholder="Enter OTP sent on email id"  onChange={event => {setOtp(event.target.value)}}></TextField>
                <Button variant="contained" onClick={event => verifyOtp()}>Verify OTP</Button>
                </Box>
                </div>
                <div className="formgroup">
                    <Box m={1}>
                    <label>Store Name</label>
                    </Box>
                    <Box m={1}>
                        <TextField variant="outlined" name="storeName" placeholder="Store Name" onChange={event => {setStoreName(event.target.value)}}></TextField></Box>
                    </div>
                <div className="formgroup">
                <Box m={1}>
                <label htmlFor="Password">Create Password</label>
                </Box>
                <Box m={1}>
                <TextField variant="outlined" name="Password" placeholder="Create Password" onChange={event => {setPass(event.target.value)}}></TextField>
                </Box>
                </div>
                <div className="formgroup">
                <Box m={1}>
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                </Box>
                <Box m={1}>
                <TextField variant="outlined" name="ConfirmPassword" placeholder="Confirm Password" onChange={event => {setConfirmPass(event.target.value)}}></TextField>
                </Box>
                </div>
                
            </div>
        </div>
        </Box>
        <div className="footer">
         <Box t={1}>
            <Button variant="contained" onClick={event => signUp()}>Sign Up</Button>
        </Box>
        </div>
        </div>
   );
}