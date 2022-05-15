import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, Typography, CssBaseline, Button, List, ListItem, ListItemText, ListItemButton, ListItemAvatar, Avatar } from '@mui/material';
import logo from '../images/logo2.svg';
import avatar from '../images/avatar.jpg';



const Profile = () => {

    const text = {
        color: "grey"
    };

    let [userInfo, setUserInfo] = useState({
        name: '',
        bio: '',
        phone: '',
        email: '',
        password: ''
    });

    let userInfoKey = ["Name", "Bio", "Phone", "Email", "Password"];

    const fetchProfileInfo = () => {
        let id = localStorage.getItem("id");
        let obj = {
            email: id
        };
        fetch(`http://localhost:5000/auth/profile`, {
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
                setUserInfo(dataFromServer.info);
            }
        })
        .catch(error => console.error(error));
    }

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    return(
        <div>
            <CssBaseline />
            <div>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box><img src={logo} style={{ height: '20px', marginTop: '10px', marginLeft: '10px' }} /></Box>
                    <Box>
                        <Button sx={{ margin: "10px" }} variant="contained" onClick={logout}>Logout</Button>
                    </Box>
                </Box>
                <Box textAlign="center" sx={{ my: "20px" }}>
                    <Typography variant="h4">Personal Info</Typography>
                    <Typography variant="body2">Basic info, like your name and photo</Typography>
                </Box>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6} md={6}>
                        <Box>
                            <List sx={{ border: "1px solid #d6d6d6", borderRadius: "5px" }}>
                                <ListItem>
                                    <ListItemText primary="Profile" secondary="Some info may be visible to other people"></ListItemText>
                                    <ListItemButton>
                                        <Button variant="outlined" fullWidth >Edit</Button>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                            <List sx={{ border: "1px solid #d6d6d6" }}>
                                <ListItem>
                                    <ListItemText primary="Avatar" primaryTypographyProps={{ style: text }}></ListItemText>
                                    <ListItemAvatar sx={{ marginRight: "40%" }}>
                                        <Avatar alt="User" src={avatar} />
                                    </ListItemAvatar>
                                </ListItem>
                            </List>
                            {userInfoKey.map((keyName) => {
                                let key = keyName.toLowerCase();
                                return (
                                    <List sx={{ border: "1px solid #d6d6d6" }}>
                                        <ListItem>
                                            <ListItemText primary={keyName}  primaryTypographyProps={{ style: text }} ></ListItemText>
                                            <ListItemText primary={userInfo[key]}></ListItemText>
                                        </ListItem>
                                    </List>
                                )
                            })}
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Profile;