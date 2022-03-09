import React, {useState} from 'react'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./SellerSignUp.css";
import axios from 'axios';
const SellerSignUp = () => {
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
    const [storeName, setStoreName] = useState('');
    const [signUpErr, setSignUpErr] = useState();
    const [storeLogo, setStoreLogo] = useState('');
    const [storeBanner, setStoreBanner] = useState('');
    const [username, setUsername] = useState('');

    function sendOtp()
    {
        alert("CLICKED");
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
                alert("OTP is correct!");
                setSignUpErr("");
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
            axios.post('www.google.com', {username, email, pass, confirmPass, storeName, storeLogo, storeBanner}).then((response) => {setSignUpSuccess(response?.data?.success); setRoles(response?.data?.roles);}).catch(err => {setSignUpErr(err); alert(err);});
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
                    <TextField required id="outlined-required" label="Username" sx={{width:250, height:40}} onChange={event => setUsername(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="Email" sx={{width:250, height:40}} onChange={event => setEmail(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <Button variant="contained" label="Password" sx={{width:250, height:40}} size="large" onClick={event => sendOtp()}>Send OTP</Button>    
                </div>
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="OTP" sx={{width:250, height:40}} onChange={event => setOtp(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <Button variant="contained" label="Password" sx={{width:250, height:40}} size="large" onClick={event => verifyOtp()}>Verify OTP</Button>    
                </div>
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="Store Name" sx={{width:250, height:40}} onChange={event => setStoreName(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="Store Logo" sx={{width:250, height:40}} onChange={event => setStoreLogo(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="Store Banner" sx={{width:250, height:40}} onChange={event => setStoreBanner(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="Password" sx={{width:250, height:40}} onChange={event => setPass(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <TextField required id="outlined-required" label="Confirm Password" sx={{width:250, height:40}} onChange={event => setConfirmPass(event.target.value)}/>    
                </div>
                <div className='formGroup'>
                    <Button variant="contained" label="Password" sx={{width:250, height:40}} size="large" onClick={event => signUp()}>Sign Up</Button>    
                </div>
            </div>
        </CardContent>
    </div>
  )
}

export default SellerSignUp