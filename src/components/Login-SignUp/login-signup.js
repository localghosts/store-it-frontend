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
import {blue} from '@mui/material/colors'
import LoginBuyer from './LoginBuyer';
import SignUpBuyer from './SignUpBuyer';
import SignUpSeller from './SignUpSeller';
import LoginSeller from './LoginSeller';
const theme =  createTheme({
  palette:{
    primary: {main: blue[500],}
  }

})
function LoginSignUp (){
  const [renderWhat, setRenderWhat] = useState("buyerLogIn");
  
    if( renderWhat === "buyerLogIn" )
            {
              return (<ThemeProvider theme={theme}>
              <div className="base-container" align ="center">
               <LoginBuyer/>
                    <Button variant="contained" onClick = {event => setRenderWhat("buyerSignUp")}>Not registered? Sign-up as Buyer</Button>
                    <Button variant="contained" onClick = {event => setRenderWhat("sellerLogIn")}>I am a seller</Button>
                  </div>
                 
                  </ThemeProvider>
              );
            }
    else if(renderWhat === "BuyerSignUp")
          {
            return ( <ThemeProvider theme={theme}>
            <div className="base-container" align ="center">
              <SignUpBuyer/>
                  <Button variant="contained" onClick = {event => setRenderWhat("buyerLogIn")}>Already Signed up? Log In</Button>
                    <Button variant="contained" onClick = {event => setRenderWhat("sellerLogIn")}>I am a Seller</Button>
                </div>
                </ThemeProvider>
            );
          }
    else if(renderWhat === "sellerLogIn")
    {
      return (<ThemeProvider theme={theme}>
      <div className="base-container" align ="center">
             <LoginSeller/>
                    <Button variant="contained" onClick = {event => setRenderWhat("sellerSignUp")}>Not registered? Sign-up as Seller</Button>
                    <Button variant="contained" onClick = {event => setRenderWhat("buyerLogIn")}>I am a Buyer</Button>
                  </div>
                  </ThemeProvider>
              );
    }
    else{
      return ( <ThemeProvider theme={theme}>
      <div className="base-container" align ="center">
            <SignUpSeller/>
                  <Button variant="contained" onClick = {event => setRenderWhat("sellerLogIn")}>Already Signed up? Log In</Button>
                    <Button variant="contained" onClick = {event => setRenderWhat("buyerLogIn")}>I am a Buyer</Button>
                </div>
                </ThemeProvider>
            );
    }

}
  


export default LoginSignUp;
