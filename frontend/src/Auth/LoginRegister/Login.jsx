import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        axios.post('http://localhost:8099/api/login', { email: email, password: password })
            .then(res => {
                if(res.data.msg_type==="good")
                    window.location.href='/home';
            })
            .catch(err => {
                console.log(err);
            });
    };  

    return (
        <Card sx={{minWidth:""}}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Registered Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <p className='' style={{ fontSize: "14px" }}>New Account ? <a href='/sign-up' className='text-decoration-none'><b style={{ color: "blue" }}>Register Here</b></a></p>
                            <a href='/sign-up'>
                                <div type="" variant="contained" color="success" className='text-decoration-none btn w-100 btn-success'>
                                    Register
                                </div>
                            </a>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};
const Login = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: "#000000c9" }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
