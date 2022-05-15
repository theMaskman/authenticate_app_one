import React, { useState } from 'react';
import { Typography, TextField, Button, Container, Grid, CssBaseline, Box, Link } from '@mui/material';
import logo from '../images/logo2.svg';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const registerUser = (event) => {
    event.preventDefault();
    let obj = {
      email: email,
      password: password
    };
    setEmail('');
    setPassword('');
    fetch(`http://localhost:5000/auth/signup`, {
      method: 'POST',
      cors: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    .then(response => response.json())
    .then((dataFromServer) => {
      if(dataFromServer.status=="Success"){
        toast.success("New user created");
      }
      else if(dataFromServer.status=="Duplicate"){
        toast.error(dataFromServer.message);
      }
      else {
        toast.error("Eror occurred. User cannot be registered");
      }
    })
    .catch((error) => {
      console.error(error);
      toast.error("Eror occurred. User cannot be registered");
    });
  }

  const goToLogin = () => {
    localStorage.clear();
    localStorage.setItem("loginView", true)
    window.location.reload();
}

  return (
    <div>
      <CssBaseline />
      <div>
        <Grid container justifyContent="center" alignContent="center" height="100vh">
          <Grid item xs={12} sm={4} md={4} >
            <Box sx={{ px: '40px', py:'20px', border: '1px solid #d3d0d0', borderRadius: 5 }}>
              <Typography variant="body2" sx={{ mt: '20px' }} >
                <img src={logo} style={{ height: '20px' }} />
              </Typography>
              <Typography variant="h5" sx={{ mt: '20px' }} >Join thousands of learners from around the world</Typography>
              <Typography variant="body2" sx={{ mt: '20px' }}>Master web development by making real-life projects. There are multiple paths for you to choose.</Typography>
              <form autoComplete="off" noValidate onSubmit={registerUser}>
                <TextField type="email" sx={{ mt: '25px' }} name="email" variant="outlined" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField type="password" sx={{ mt: '10px' }} name="password" variant="outlined" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="Submit" sx={{ mt: '15px' }} className="form_login_input" variant="contained" fullWidth>Start coding now</Button>
              </form>
              <Typography variant="body2" textAlign="center" sx={{ my: '15px' }}>Already a member?
                <Link href="/login" underline="none" onClick={ goToLogin }>&nbsp; Login</Link> 
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register;