import React, {useState} from 'react'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./BuyerSignUp.css"
import axios from 'axios';
import { Alert } from 'react-alert';

const BuyerSignUp = () => {
    const [name, setName] = useState('');
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
                alert("OTP is correct!");
            }
            else
            {
                setOtpMsg("OTP is incorrect, try again!");
                alert("OTP is incorrect, try again!");
            }
        }
        else
        {
            setOtpMsg("Enter Email and click on send OTP first!");
            alert("Enter Email and click on send OTP first!");
        }
    }
    function signUp()
    {
        console.log("SignUp!");
        if(otpVerifySuccess)
        {
            axios.post('www.google.com', {name, email, pass, confirmPass}).then((response) => {setSignUpSuccess(response?.data?.success); setRoles(response?.data?.roles);}).catch(err => setSignUpErr(err));
        }
        else
        {
            setSignUpErr("Verify OTP first!");
            alert("Verify OTP first!");
        }
    }
  return (
    <div>
        <CardContent>
            <div className="loginForm">
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="Name" sx={{width:250, height:40}} onChange={event => setName(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="Email" sx={{width:250, height:40}} onChange={event => setEmail(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <Button variant="contained" label="Password" sx={{width:250, height:40}} size="large" onClick={event=>sendOtp()}>Send OTP</Button>    
                </div>
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="OTP" sx={{width:250, height:40}} onChange={event => setOtp(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <Button variant="contained" label="Password" sx={{width:250, height:40}} size="large" onClick={event=>verifyOtp()}>Verify OTP</Button>    
                </div>
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="Password" sx={{width:250, height:40}} onChange={event => setPass(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="Confirm Password" sx={{width:250, height:40}} onChange={event => setConfirmPass(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <Button variant="contained" label="Password" sx={{width:250, height:40}} size="large" onClick={event=>signUp()}>Sign Up</Button>    
                </div>
            </div>
        </CardContent>
    </div>
  )
}

export default BuyerSignUp