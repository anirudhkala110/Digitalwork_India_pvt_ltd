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
const Register = () => {
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate()

    const handleSignUp = (e) => {
        e.preventDefault()
        console.log('Signing up with:', email, password, cpassword, address, fname);
        axios.post('http://localhost:8099/api/register', { fname: fname,lname: lname, email: email, password: password, cpassword: cpassword, address: address })
            .then(res => {
                if (res.data.msg_type == 'good')
                    navigate('/login')
                else {
                    alert("Error")
                }
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: "#000000c9" }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Sign Up
                        </Typography>
                        <form onSubmit={handleSignUp}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        type="text"
                                        variant="outlined"
                                        value={fname}
                                        onChange={(e) => setFName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        type="text"
                                        variant="outlined"
                                        value={lname}
                                        onChange={(e) => setLName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
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
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        type="password"
                                        variant="outlined"
                                        value={cpassword}
                                        onChange={(e) => setCpassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        type="text"
                                        variant="outlined"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Sign Up
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <p className='' style={{ fontSize: "14px" }}>Already have and acount ? <a href='/login' className='text-decoration-none'><b style={{ color: "blue" }}>Login Here</b></a></p>
                                    <a href='/login'>
                                        <div type="" variant="contained" color="success" className='text-decoration-none btn w-100 btn-success'>
                                            Login Page
                                        </div>
                                    </a>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
};

export default Register