import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './login.scss';
import '@fontsource/roboto/400.css';
import Button from '@material-ui/core/Button';
import  TextField  from '@material-ui/core/TextField';
import Typography  from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors'
const theme =  createTheme({
  palette:{
    primary: {main: orange[500],}
  }

})
class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      renderwhat: "BuyerLogIn",
      BuyerEmail: '',
      BuyerPass: '',
      BuyerOTPentered: '',
      BuyerConfirmPass: '',
      sellerEmial: '',
      sellerPass: '',
      sellerOTPentered: '',
      sellerStoreName: '',
      sellerConfirmPass: '',
      errmsgBuyerLogIn: '',
      errmsgBuyerSignUp: '',
      errmsgsellerLogIn: '',
      errmsgsellerSignUp: '',
      BuyerOTPSentSuccess: false,
      sellerOTPSentSuccess: false,
      BuyerLogInSuccess: false,
      BuyerSignUpSuccess: false,
      BuyerOTPSuccess: false,
      BuyerOTPmsg: "Enter OTP",
      sellerLogInSuccess: false,
      sellerOTPmsg: "Enter OTP",
      sellerOTPSuccess: false,
      sellerSignUpSuccess: false,
      BuyerLogInroles: {},
      BuyerSignUproles: {},
      sellerLogInroles: {},
      sellerSignUproles: {},

    };
    this.BuyerSignUpClick = this.BuyerSignUpClick.bind(this);
    this.BuyerLogInClick = this.BuyerLogInClick.bind(this);
    this.sellerSignUpClick = this.sellerSignUpClick.bind(this);
    this.sellerLogInClick = this.sellerLogInClick.bind(this);
    this.BuyerLogIn = this.BuyerLogIn.bind(this);
    this.BuyerOTPsend = this.BuyerOTPsend.bind(this);
    this.BuyerOTPverify = this.BuyerOTPverify.bind(this);
    this.BuyerSignUp = this.BuyerSignUp.bind(this);
    this.sellerLogIn = this.sellerLogIn.bind(this);
    this.sellerOTPsend = this.sellerOTPsend.bind(this);
    this.sellerOTPverify = this.sellerOTPverify.bind(this);
    this.sellerSignUp = this.sellerSignUp.bind(this);

  }
  BuyerEmailhandleChange = event => {
    this.setState({BuyerEmail: `${event.target.value}`});
    console.log(this.state.BuyerEmail);
  }
  BuyerPasshandleChange = event => {
    this.setState({BuyerPass: `${event.target.value}`});
  }
  BuyerOTPhandleChange = event => {
    this.setState({BuyerOTPentered: `${event.target.value}`});
  }
  BuyerConfirmPasshandleChange = event => {
    this.setState({BuyerConfirmPass: `${event.target.value}`});
  }
  sellerEmailhandleChange = event => {
    this.setState({sellerEmail: `${event.target.value}`});
  }
  sellerPasshandleChange = event => {
    this.setState({sellerPass: `${event.target.value}`});
  }
  sellerConfirmPasshandleChange = event => {
    this.setState({sellerConfirmPass: `${event.target.value}`});
  }
  sellerOTPhandleChange = event => {
    this.setState({sellerOTPentered: `${event.target.value}`});
  }
  sellerStoreNamehandleChange = event => {
    this.setState({sellerStoreName: `${event.target.value}`});
  }

  BuyerSignUpClick()
  {
    this.setState({
      renderwhat: "BuyerSignUp",
    });
  }
  BuyerLogInClick()
  {
    this.setState({
      renderwhat: "BuyerLogIn",
    });
  }
  sellerLogInClick()
  {
    this.setState({
      renderwhat: "sellerLogIn",
    });
  }
  sellerSignUpClick()
  {
    this.setState({
      renderwhat: "sellerSignUp",
    });
  }
  BuyerLogIn()
  {
    const BuyerEmail = this.state.BuyerEmail;
    const BuyerPass = this.state.BuyerPass;
    console.log(BuyerEmail, BuyerPass);
    try{ const response = 
    axios
    .post('www.google.com', {BuyerEmail, BuyerPass});
    const BuyerLogInSuccess = response?.data?.success;
    const BuyerLogInroles = response?.data?.roles;
    this.setState({BuyerLogInSuccess: BuyerLogInSuccess, BuyerLogInroles: BuyerLogInroles});
    }
    catch(err)
    {
      const errmsgBuyerLogIn = err.response;
      this.setState({errmsgBuyerLogIn: errmsgBuyerLogIn});
    }
  }
  BuyerOTPsend()
  {
    const BuyerEmail = this.state.BuyerEmail;
    try{ const response = 
      axios
      .post('www.google.com', BuyerEmail);
      const BuyerOTPSentSuccess = response?.data?.success; 
      const BuyerOTP = response?.data?.OTP;
      this.setState({BuyerOTPSentSuccess: BuyerOTPSentSuccess, BuyerOTP: BuyerOTP});
      }
      catch(err)
      {
        const errmsgBuyerSignUp = err.response;
        this.setState({errmsgBuyerSignUp: errmsgBuyerSignUp});
      }
    if(this.state.BuyerOTPSentSuccess)
    {
      this.setState({ BuyerOTPmsg: "OTP sent, check mail and enter OTP"});
    }
  }
  BuyerOTPverify()
  {
    const BuyerOTP = this.state.BuyerOTP;
    const BuyerOTPentered = this.state.BuyerOTPentered;
    if(BuyerOTP === BuyerOTPentered)
    {
      this.setState({BuyerOTPSuccess: true, BuyerOTPmsg: "OTP is correct!"});
    }
    else{
      this.setState({BuyerOTPmsg: "OTP incorrect, enter correct OTP"});
    }

  }
  BuyerSignUp()
  {
    const BuyerEmail = this.state.BuyerEmail;
    const BuyerPass = this.state.BuyerPass;
    const BuyerConfirmPass = this.state.BuyerConfirmPass;
    const BuyerOTPSuccess = this.state.BuyerOTPSuccess;
    if(BuyerOTPSuccess)
    {
      try{ const response = 
        axios
        .post('www.google.com', {BuyerEmail, BuyerPass, BuyerConfirmPass});
        const BuyerSignUpSuccess = response?.data?.success;
        const BuyerSignUpRoles = response?.data?.roles;
        this.setState({BuyerSignUpSuccess: BuyerSignUpSuccess});
        }
        catch(err)
        {
          const errmsgBuyerSignUp = err.response;
          this.setState({errmsgBuyerSignUp: errmsgBuyerSignUp});
        }
      }
    else{
      this.setState({errmsgBuyerSignUp: "Verify OTP first"})
    }
  }
  sellerLogIn()
  {
    const sellerEmail = this.state.sellerEmail;
    const sellerPass = this.state.sellerPass;
    try{ const response = 
    axios
    .post('www.google.com', {sellerEmail, sellerPass});
    const sellerLogInSuccess = response?.data?.success;
    const sellerLogInRoles = response?.data?.roles;
    this.setState({sellerLogInSuccess: sellerLogInSuccess});
    }
    catch(err)
    {
      const errmsgsellerLogIn = err.response;
      this.setState({errmsgsellerLogIn: errmsgsellerLogIn});
    }
  }
  sellerOTPsend()
  {
    const sellerEmail = this.state.sellerEmail;
    try{ const response = 
      axios
      .post('www.google.com', sellerEmail);
      const sellerOTPSentSuccess = response?.data?.success; 
      const sellerOTP = response?.data?.OTP;
      this.setState({sellrOTPSentSuccess: sellerOTPSentSuccess,  sellerOTP: sellerOTP});
      }
      catch(err)
      {
        const errmsgsellerSignUp = err.response;
        this.setState({errmsgsellerSignUp: errmsgsellerSignUp});
      }
    if(this.state.sellerOTPSentSuccess)
    {
      this.setState({sellerOTPmsg: "OTP sent, check mail and enter OTP"});
    }
  }
  sellerOTPverify()
  {
    const sellerOTP = this.state.sellerOTP;
    const sellerOTPentered = this.state.sellerOTPentered;
    if(sellerOTP === sellerOTPentered)
    {
      this.setState({sellerOTPSuccess: true, sellerOTPmsg: "OTP is correct!"});
    }
    else{
      this.setState({sellerOTPmsg: "OTP incorrect, enter correct OTP"});
    }

  }
  sellerSignUp()
  {
    const sellerEmail = this.state.sellerEmail;
    const sellerPass = this.state.sellerPass;
    const sellerConfirmPass = this.state.sellerConfirmPass;
    const sellerOTPSuccess = this.state.sellerOTPSuccess;
    const sellerStoreName =  this.state.sellerStoreName;
    if(sellerOTPSuccess)
    {
      try{ const response = 
        axios
        .post('www.google.com', {sellerEmail, sellerStoreName, sellerPass,sellerConfirmPass});
        const sellerSignUpSuccess = response?.data?.success;
        const sellerSignUpRoles = response?.data?.roles;
        this.setState({sellerSignUpSuccess: sellerSignUpSuccess});
        }
        catch(err)
        {
          const errmsgsellerSignUp = err.response;
          this.setState({errmsgsellerSignUp: errmsgsellerSignUp});
        }
      }
    else{
      this.setState({errmsgsellerSignUp: "Verify OTP first"})
    }
  }
  render()
  {
    const { renderwhat }= this.state;
    if( renderwhat === "BuyerLogIn" )
            {
              return (<ThemeProvider theme={theme}>
              <div className="base-container" align ="center">
                <Container>
              <Typography variant="h2" component="h2">
                <br></br>
                  Buyer LogIn
              </Typography>
              </Container >
              <br></br>
              <label>{this.state.errmsgBuyerLogIn}</label>
              <br></br>
              <br></br>
              <Container fluid="true" maxWidth="sm" color="black">
              <div className="content">
              <div className="form">
                  <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <br></br>
                  <TextField variant="outlined" value={this.state.BuyerEmail} onChange={this.BuyerEmailhandleChange}  name = "Email" placeholder="Email"></TextField>
                  </div>
                  <div className="form-group">
                  <br></br>
                  <label htmlFor="password">Password</label>
                  <br></br>
                  <TextField variant="outlined" name = "password" value={this.state.BuyerPass} onChange={this.BuyerPasshandleChange} placeholder="password"></TextField></div>
                  </div>
              </div>
              </Container>
              <br></br>
              <div className="footer">
                  <Button variant="contained" onClick = {this.BuyerLogIn}>Login</Button>
              </div>
                    <Button variant="contained" onClick = {this.BuyerSignUpClick}>Not registered? Sign-up as Buyer</Button>
                    <Button variant="contained" onClick = {this.sellerLogInClick}>I am a seller</Button>
                  </div>
                 
                  </ThemeProvider>
              );
            }
    else if(renderwhat === "BuyerSignUp")
          {
            return ( <ThemeProvider theme={theme}>
            <div className="base-container" align ="center">
            <Typography variant="h2" component="h2">
              <br></br>
                  Buyer SignUp
              </Typography>
              <br></br>
              <label>{this.state.errmsgBuyerSignUp}</label>
            <br></br>
            <br></br>
            <div className="content">
            <div className="form">
                <div className="formgroup">
                <label htmlFor="email">Email</label>
                <br></br>
                <TextField variant="outlined" name="email" value={this.state.BuyerEmail} onChange={this.BuyerEmailhandleChange} placeholder="email id"></TextField>
                <Button variant="contained" onClick={this.BuyerOTPsend}>Send OTP</Button>
                </div>
                <div className="formgroup">
                  <br></br>
                <label htmlFor="email">{this.state.BuyerOTPmsg}</label>
                <br></br>
                <TextField variant="outlined" value={this.state.BuyerOTPentered} onChange={this.BuyerOTPhandleChange} name="OTP" placeholder="Enter OTP sent on email id"></TextField>
                <Button variant="contained" onClick={this.BuyerOTPverify}>Verify OTP</Button>
                </div>
                <br></br>
                <div className="formgroup">
                <label htmlFor="Password">Create Password</label>
                <br></br>
                <TextField variant="outlined" name="Password" value={this.state.BuyerPass} onChange={this.BuyerPasshandleChange} placeholder="Create Password"></TextField>
                </div>
                <div className="formgroup">
                  <br></br>
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <br></br>
                <TextField variant="outlined" name="ConfirmPassword" value={this.state.BuyerConfirmPass} onChange={this.BuyerConfirmPasshandleChange} placeholder="Confirm Password"></TextField>
                </div>
            </div>
        </div>
        <div className="footer">
          <br></br>
            <Button variant="contained" onClick={this.BuyerSignUp}>Sign Up</Button>
        </div>
                  <Button variant="contained" onClick = {this.BuyerLogInClick}>Already Signed up? Log In</Button>
                    <Button variant="contained" onClick = {this.sellerLogInClick}>I am a Seller</Button>
                </div>
                </ThemeProvider>
            );
          }
    else if(renderwhat === "sellerLogIn")
    {
      return (<ThemeProvider theme={theme}>
      <div className="base-container" align ="center">
             <Typography variant="h2" component="h2">
               <br></br>
                  Seller LogIn
              </Typography>
              <br></br>
              <label>{this.state.errmsgsellerLogIn}</label>
              <br></br>
              <div className="content">
              <div className="form">
                <br></br>
                  <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <br></br>
                  <TextField variant="outlined" name = "Email" value={this.state.sellerEmail} onChange={this.sellerEmailhandleChange} placeholder="Email"></TextField>
                  </div>
                  <div className="form-group">
                    <br></br>
                  <label htmlFor="password">Password</label>
                  <br></br>
                  <TextField variant="outlined" name = "password" value={this.state.sellerPass} onChange={this.sellerPasshandleChange} placeholder="password"></TextField></div>
                  </div>
              </div>
              <div className="footer">
                  <Button variant="contained" onClick={this.sellerLogIn}>Login</Button>
              </div>
                    <Button variant="contained" onClick = {this.sellerSignUpClick}>Not registered? Sign-up as Seller</Button>
                    <Button variant="contained" onClick = {this.BuyerLogInClick}>I am a Buyer</Button>
                  </div>
                  </ThemeProvider>
              );
    }
    else{
      return ( <ThemeProvider theme={theme}>
      <div className="base-container" align ="center">
            <Typography variant="h2" component="h2">
              <br></br>
                  Seller SignUp
              </Typography>
            <br></br>
            <label>{this.errmsgsellerSignUp}</label>
            <br></br>
            <div className="content">
            <div className="form">
                <div className="formgroup">
                <label htmlFor="email">Email</label>
                <br></br>
                <TextField variant="outlined" name="email" value={this.state.sellerEmail} onChange={this.sellerEmailhandleChange} placeholder="email id"></TextField>
                <Button variant="contained" className="btn" onClick={this.sellerOTPsend}>Send OTP</Button>
                </div>
                <div className="formgroup">
                  <br></br>
                <label htmlFor="email">{this.state.sellerOTPmsg}</label>
                <br></br>
                <TextField variant="outlined" name="OTP" value={this.state.sellerOTPentered} onChange={this.sellerOTPhandleChange} placeholder="Enter OTP sent on email id"></TextField>
                <Button variant="contained" className="btn" onClick={this.sellerOTPverify}>Verify OTP</Button>
                </div>
                <div className="formgroup">
                  <br></br>
                <label htmlFor="Store Name">Store Name</label>
                <br></br>
                <TextField variant="outlined" name="StoreName" value={this.state.sellerStoreName} onChange={this.sellerStoreNamehandleChange} placeholder="Store Name"></TextField>
                </div>
                <div className="formgroup">
                  <br></br>
                <label htmlFor="Password">Create Password</label>
                <br></br>
                <TextField variant="outlined" name="Password" value={this.state.sellerPass} onChange={this.sellerPasshandleChange}  placeholder="Create Password"></TextField>
                </div>
                <div className="formgroup">
                  <br></br>
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <br></br>
                <TextField variant="outlined" name="ConfirmPassword" value={this.state.sellerConfirmPass} onChange={this.sellerConfirmPasshandleChange} placeholder="Confirm Password"></TextField>
                </div>
            </div>
        </div>
        <div className="footer">
            <Button variant="contained" onClick = {this.sellerSignUp}>Sign Up</Button>
        </div>
                  <Button variant="contained" onClick = {this.sellerLogInClick}>Already Signed up? Log In</Button>
                    <Button variant="contained" onClick = {this.BuyerLogInClick}>I am a Buyer</Button>
                </div>
                </ThemeProvider>
            );
    }
  }
}
  


export default App;
