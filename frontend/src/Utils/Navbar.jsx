import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import MyPIC from '../Components/Home/MyPIC.jpg'
import { useAuth } from '../Auth/Context/AuthProvider.jsx';
import axios from 'axios';

axios.defaults.withCredentials = true
const Navbar = () => {
    const { login, setLogin } = useAuth();
    const { userData } = useAuth();
    const handleLogout = () => {
        axios.get('http://localhost:8099/api/logout')
            .then(res => {
                console.log(res.data)
                if(res.data.msg_type==="good"){
                    window.location.href='/'
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <AppBar position="sticky" color="primary" sx={{ minWidth: "560px" }}>
            <Toolbar className='d-flex justify-content-between aling-items-center'>
                <Typography variant="h6" component="div" color="" >
                    Digitalwork India Private Limited
                </Typography>
                {
                    login && <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }} >
                        <a href='/home'>
                            <img src={`http://localhost:8099/uploads/${userData.profilePic}`} className='mx-1 rounded-circle' width={40} height={40} />
                        </a>
                        <button className='btn btn-danger mx-1' onClick={handleLogout}>Logout</button>
                    </Card>
                }
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
