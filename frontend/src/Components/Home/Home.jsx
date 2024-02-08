import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import CoverImg from './Cover.jpg';
import Adhr from './Cover.jpg';
import PanCard from './Cover.jpg';
import MyPIC from './MyPIC.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Auth/Context/AuthProvider';

axios.defaults.withCredentials = true

const Home = () => {
    const { login, setLogin } = useAuth()
    const { userData, setUserData } = useAuth()
    const [openModal, setopenModal] = useState(false)
    const [dob, setDOB] = useState(null)
    const [address, setAddress] = useState(null)
    const [adno, setAdno] = useState(null)
    const [pnno, setPnno] = useState(null)
    const [background, setBackground] = useState()
    const [profilePic, setProfilePic] = useState()
    const [XthM, setXthM] = useState()
    const [XIIthM, setXIIthM] = useState()
    const [Xth, setXth] = useState()
    const [XIIth, setXIIth] = useState()
    const [adCard, setAdCard] = useState()
    const [panCard, setPanCard] = useState()
    const handleCheckAll = (fileType) => {
        if (fileType === 'Xth') {
            const file = Xth[0];
            const type = 'Xth'
            handleSubmit(file, type, XthM)
        }
        if (fileType === 'XIIth') {
            const file = XIIth[0];
            const type = fileType
            handleSubmit(file, type, XIIthM)
        }
        if (fileType === 'adCard') {
            const file = adCard[0];
            const type = fileType
            handleSubmit(file, type, adno)
        }
        if (fileType === 'panCard') {
            const file = panCard[0];
            const type = fileType
            handleSubmit(file, type, pnno)
        }
        if (fileType === 'profilePic') {
            const file = profilePic[0];
            const type = fileType
            handleSubmitOnlyPic(file, type)
        }
        if (fileType === 'background') {
            const file = background[0];
            const type = fileType
            handleSubmitOnlyPic(file, type)
        }
        if (fileType === 'dob') {
            const type = fileType
            handleSubmitOnlyDetails(dob, type)
        }
        if (fileType === 'address') {
            const type = fileType
            handleSubmitOnlyDetails(address, type)
        }

    }
    const handleSubmit = (file, fileType, data) => {
        const formData = new FormData();
        const email = userData.email
        formData.append('file', file);
        console.log(formData, file, fileType)
        axios.post(`http://localhost:8099/api/Submit-image-data/${fileType}/${email}/${data}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmitOnlyPic = (file, fileType) => {
        const formData = new FormData();
        const email = userData.email
        formData.append('file', file);
        console.log(formData, file, fileType)
        axios.post(`http://localhost:8099/api/Submit-image/${fileType}/${email}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmitOnlyDetails = (data, type) => {
        const email = userData.email
        axios.post(`http://localhost:8099/api/upload-details/${type}/${data}/${email}`, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleTest = () => {
        window.location.href = '/test'
    }
    return (
        <div className='pt-2 ' style={{ minWidth: "560px" }}>
            <Grid container spacing={2} justifyContent="center" sx={{ boxShadow: " 0 0 10 10 black" }} className='bg-light border-0'>
                <Grid item lg={6} className='shadow'>
                    <Card className='p-2 border-0' sx={{ border: "0px" }}>
                        <div>
                            <CardMedia
                                className='rounded-0'
                                component="img"
                                height="200"
                                image={`http://localhost:8099/uploads/${userData.background}`}
                                alt="User Image"
                            />
                            <div className='mdl p-2 rounded-4 border bg-dark' style={{ display: `${openModal ? 'flex' : 'none'}`, position: "absolute" }}>
                                <div class="p-2 d-flex align-items-center justify-content-start" style={{ boxShadow: "0px 0px 0px 5000px #000000a1" }}>
                                    <input class="form-control w-50 p-2" type="file" id="formFile" onChange={e => setBackground(e.target.files)} />
                                    <button className='btn btn-primary mt-1 w-50 ms-2 p-2' onClick={e => handleCheckAll('background')}>Add</button>
                                </div>
                            </div>
                            <button className='btn' style={{ position: "absolute", marginTop: "-40px", marginLeft: "10px", background: `${openModal ? 'red' : 'white'}`, color: `${openModal ? 'white' : 'black'}` }} onClick={e => setopenModal(!openModal)}>
                                {
                                    openModal ? "Close" : "Add New"
                                }
                            </button>
                        </div>
                        <img src={`http://localhost:8099/uploads/${userData.profilePic}`} height={100} width={100} className='rounded-circle m-2' />
                        <div class="mb-3 d-flex align-items-center justify-content-start">
                            <input class="form-control w-50 p-2" type="file" id="formFile" onChange={e => setProfilePic(e.target.files)} />
                            <button className='btn btn-dark mt-1 w-25 ms-2 p-2' onClick={e => handleCheckAll('profilePic')}>Add</button>
                        </div>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                User Information
                            </Typography>
                            <Divider />
                            <Typography variant="body1" className='mb-3 fw-bold' xs={12} sm={12} md={6} lg={6}>
                                Date of Birth: {!userData.dob? 'DD / MM / YY':userData.dob.substring(0, 10)}{!dob && <span className='text-danger fw-bold fs-3'>*</span>}
                                <input class="form-control w-50 p-2 mb-1" type="date" id="formFile" onChange={e => setDOB(e.target.value)} />
                                <button className='btn btn-primary mx-1' onClick={e => handleCheckAll('dob')}>Submit</button>
                            </Typography>
                            <hr />
                            <Typography variant="body1" className='mb-3 fw-bold' xs={12} sm={12} md={6} lg={6}>
                                Address: {userData.address}{!userData.address && <span className='text-danger fw-bold fs-3'>*</span>}
                                <input class="form-control w-50 p-2 mb-1" type="text" id="formFile" onChange={e => setAddress(e.target.value)} />
                                {userData.address ? <button className='btn btn-primary mx-1' onClick={e => handleCheckAll('address')}>Submit</button> : <button className='btn btn-primary mx-1'>Submit</button>}
                            </Typography>
                            <hr />
                            <Typography variant="body1" className='mb-3' xs={12} sm={12} md={6} lg={6}>
                                Aadhar Card: {userData.adno} {!adno && <span className='fw-bold fs-3 text-danger'>*</span>}
                                <br />
                                <img src={`http://localhost:8099/uploads/${userData.adCard}`} height={200} width={500} className='rounded' />
                                <br />
                                {adCard && <p className='text-danger'>*save this image to prevent any error</p>}
                                <div class="my-1 d-flex align-items-center justify-content-between">
                                    <input class="form-control " type="file" id="formFile" onChange={e => setAdCard(e.target.files)} />
                                    <input class="form-control " type="text" id="formFile" placeholder="Addhar Number" onChange={e => setAdno(e.target.value)} />
                                </div>
                                <button className='btn btn-primary me-1 mt-2' onClick={e => handleCheckAll('adCard')}>Submit</button>
                                {/* <button className='btn btn-danger me-1 mt-2'>Delete</button> */}
                            </Typography>
                            <hr />
                            <Typography variant="body1" className='mb-3' xs={12} sm={12} md={6} lg={6}>
                                Pan Card: {userData.pnno}
                                {panCard && <span className='text-danger fw-bold fs-3'>*</span>}
                                <br />
                                <img src={`http://localhost:8099/uploads/${userData.panCard}`} height={200} width={500} className='rounded' />
                                <br />
                                {panCard && <p className='text-danger'>*save this image to prevent any error</p>}
                                <div class="my-1 d-flex align-items-center justify-content-between">
                                    <input class="form-control " type="file" id="formFile" onChange={e => setPanCard(e.target.files)} />
                                    <input class="form-control " type="text" id="formFile" placeholder="Pan Card Number" onChange={e => setPnno(e.target.value)} />
                                </div>
                                <button className='btn btn-primary me-1 mt-2' onClick={e => handleCheckAll('panCard')}>Submit</button>
                                {/* <button className='btn btn-danger me-1 mt-2'>Delete</button> */}
                            </Typography>
                            <hr />
                            <Typography variant="body1" className='mb-3' xs={12} sm={12} md={6} lg={6}>
                                12th Marksheet Percentage: {userData.XIIthM} &nbsp;
                                {!Xth && <span className='text-danger'>*</span>}
                                <br />
                                <img src={`http://localhost:8099/uploads/${userData.XIIth}`} height={200} width={500} className='rounded' />
                                {XIIth && <p className='text-danger'>*save this image to prevent any error</p>}
                                <div class="my-1 d-flex align-items-center justify-content-between">
                                    <input class="form-control " type="file" id="formFile" onChange={e => setXIIth(e.target.files)} />
                                    <input class="form-control " type="text" id="formFile" placeholder="12th %" onChange={e => setXIIthM(e.target.value)} />
                                </div>
                                <button className='btn btn-primary me-1 mt-2' onClick={e => handleCheckAll('XIIth')}>Submit</button>
                            </Typography>
                            <hr />
                            <Typography variant="body1" className='mb-3' xs={12} sm={12} md={6} lg={6}>
                                10th Marksheet:{userData.XthM}&nbsp;
                                {!Xth && <span className='text-danger'>*</span>}
                                <br />
                                <img src={`http://localhost:8099/uploads/${userData.Xth}`} height={200} width={500} className='rounded' />
                                {Xth && <p className='text-danger'>*save this image to prevent any error</p>}
                                <div class="my-1 d-flex align-items-center justify-content-between">
                                    <input class="form-control " type="file" id="formFile" onChange={e => setXth(e.target.files)} />
                                    <input class="form-control " type="text" id="formFile" placeholder="10th CGPA or %" onChange={e => setXthM(e.target.value)} />
                                </div>
                                <button className='btn btn-primary me-1 mt-2' onClick={e => handleCheckAll('Xth')}>Submit</button>
                                {/* <button className='btn btn-danger me-1 mt-2'>Delete</button> */}
                            </Typography>
                        </CardContent>
                    </Card>
                    {login && <button className='btn my-2 btn-success w-100' onClick={e => handleTest()}>Take Test</button>}
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
