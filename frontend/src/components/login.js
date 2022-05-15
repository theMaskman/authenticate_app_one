import React, { useState } from 'react';
import { Container, Box, Link, Grid, CssBaseline, Button, Typography, TextField } from '@mui/material';
import logo from '../images/logo2.svg';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const loginUser = (event) => {
        event.preventDefault();
        let obj = {
            email: email,
            password: password
        };
        setEmail('');
        setPassword('');
        fetch(`http://localhost:5000/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then((dataFromServer) => {
            if(dataFromServer.status=="Success"){
                localStorage.clear();
                localStorage.setItem("id", email);
                window.location.reload();
            }
            else
                toast.error(dataFromServer.message);
        })
        .catch((error) => {
            console.error(error);
            toast.error("Server error occurred");
        })
    }

    const goToRegister = () => {
        localStorage.clear();
        localStorage.setItem("loginView", false);
        window.location.reload();
    }

    return (
        <div>
            <div>
                <Grid container justifyContent="center" alignContent="center" height="100vh">
                    <Grid item xs={12} sm={4} md={4}>
                        <Box sx={{ px: '40px', py: '20px', border: '1px solid grey', borderRadius: '5px' }}>
                            <img src={logo} style={{ height: '20px', marginTop: '10px' }} />
                            <Typography variant="h5" sx={{ my: '25px' }}>Login</Typography>
                            <form autoComplete="off" noValidate onSubmit={loginUser}>
                                <TextField type="email" sx={{ mb: '15px' }} name="email" variant="outlined" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                                <TextField type="password" sx={{ mb: '20px' }} name="password" variant="outlined" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Button type="Submit" variant="contained" fullWidth>Login</Button>
                            </form>
                            <Typography variant="body2" textAlign="center"  sx={{ my: '25px' }}>Don't have an account yet? 
                                <Link href="/" underline="none" onClick={ goToRegister }>&nbsp; Register</Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;