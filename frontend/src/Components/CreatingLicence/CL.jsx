import React, { useRef } from 'react';
import MyPIC from '../Home/MyPIC.jpg';
import axios from 'axios';
import { useAuth } from '../../Auth/Context/AuthProvider';

axios.defaults.withCredentials = true
const CL = () => {
    const drivingLicenseRef = useRef(null);
    const { userData, setUserData } = useAuth()

    const handlePrint = () => {
        const printableContent = drivingLicenseRef.current.innerHTML;
        const originalBodyContent = document.body.innerHTML;

        // Temporarily replace the entire body content with just the content inside the driving-license class
        document.body.innerHTML = printableContent;

        // Open the print dialog
        window.print();

        // Restore the original body content
        document.body.innerHTML = originalBodyContent;
    };

    const handleDownload = () => {
        // Create a Blob object containing the printable content
        const printableContentBlob = new Blob([drivingLicenseRef.current.innerHTML], { type: 'text/html' });

        // Create an anchor element
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(printableContentBlob);

        // Set the filename for the download
        downloadLink.download = 'DrivingLicense'; // Change the filename as needed

        // Append the anchor element to the body and trigger the click event to start the download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up by removing the anchor element
        document.body.removeChild(downloadLink);
    };

    return (
        <div className='w-100 d-flex justify-content-center align-items-center ' style={{ minHeight: "50vh" }}>
            <div>
                <div className="driving-license card p-3 my-3 shadow" style={{ minWidth: "400px", maxWidth: "650px" }} ref={drivingLicenseRef}>
                    <center><h2 className=''>Driving License</h2></center>
                    <hr />
                    <div className='row'>
                        <div className="license-details col-sm-6 col-lg-6 col-xl-6 col-md-6">
                            <div className="field mb-1">
                                <strong>Name:</strong> {userData.fname}&nbsp;{userData.lname}
                            </div>
                            <div className="field mb-1">
                                <strong>License Number:</strong> DL{userData._id.substring(0,12)}
                            </div>
                            <div className="field mb-1">
                                <strong> Date of Birth:</strong> {userData.dob.substring(0,10)}
                            </div>
                            <div className="field mb-1">
                                <strong>Issue Date:</strong> 01/01/2023
                            </div>
                            <div className="field mb-1">
                                <strong>Expiration Date:</strong> 01/01/2030
                            </div>
                            <div className="field mb-1">
                                <strong>Address:</strong> {userData.address}
                            </div>
                            {/* Add more fields as needed */}
                        </div>
                        <div className='col-sm-6 col-lg-6 col-xl-6 col-md-6 mb-3 d-flex align-items-center justify-content-center'>
                            <div>
                                <img src={`http://localhost:8099/uploads/${userData.profilePic}`} className='border p-1 rounded' style={{ width: "100px", height: "100px" }} />
                                <br />
                                <strong>&nbsp;&nbsp;Signature : </strong>
                            </div>
                        </div>
                    </div>
                    <button className='btn w-100 fw-bold onfocus'>D.L. Number: <strong>||| || |||| | || | | |||| ||</strong> </button>
                    <hr />
                    <span>
                        <p className='text-dark'>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                        </svg> &nbsp;This is Automatically generated License, hence their is no need any signature. But make sure to take the original document from govenment.</p>
                        <hr />
                        <p className='text-warning print'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                        </svg> &nbsp;If the Profile Picture is not loaded while printing then try to refresh page and then again to print.</p>
                    </span>
                </div>
                <div className='container w-75 my-2'>
                    <button className='btn btn-primary my-1 w-100 print' onClick={handlePrint} disabled={!userData.password}>Print</button>
                    {/* <button className='btn btn-dark my-1 w-100 download' onClick={handleDownload} disabled={!userData.userfname}>Download</button> */}
                </div>
            </div>
        </div>
    );
}

export default CL;
