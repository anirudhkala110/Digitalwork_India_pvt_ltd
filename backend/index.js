const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const UserModal = require('./Modals/User');
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const doenv = require('dotenv')
const path = require('path')


const app = express();
app.use(express.static('public'));
const port = 8099;


app.use(cors({
    origin: ['http://localhost:3031'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())
doenv.config()


mongoose.connect('mongodb://127.0.0.1:27017/digitalIndia', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


//Middle ware to check authentication
const authCheck = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(req.user)
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};


// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-_-" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.get('/', (req, res) => {
    console.log('Connected')
    res.json('Connected....')
})

// API endpoint for user registration
app.post('/api/register', async (req, res) => {
    const { fname, lname, email, password, address, cpassword } = req.body;
    if (cpassword === !password || cpassword === '' || cpassword === null) {
        return res.json({ msg: "Confirm password does not match. Re-enter password.", msg_type: "error" })
    }
    try {
        // Check if user already exists
        const existingUser = await UserModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Encrypt password

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModal({ fname, lname, email, password: hashedPassword, address });
        await newUser.save();
        return res.json({ msg: 'User registered successfully', msg_type: 'good' });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// API endpoint for user login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModal.findOne({ email });
        if (!user) {
            return res.json({ msg: 'Invalid credentials', msg_type: "error" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ msg: 'Invalid credentials', msg_type: "error" });
        }
        const token = jwt.sign({ userId: user.id, email: user.email, userfname: user.fname, userlname: user.lname, address: user.address, userDetails: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        return res.json({ msg: 'Login successful', msg_type: "good" });
    } catch (error) {
        console.error('Login failed:', error);
        return res.json({ error: 'Login failed' });
    }
});

// API endpoint for uploading additional user details
app.post('/api/upload-details/:type/:data/:email', async (req, res) => {
    const { email, type, data } = req.params;
    try {
        const user = await UserModal.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Update user details
        if (type === "dob") {
            user.dob = data;
        }
        else if (type === "address") {
            user.address = data;
        }
        await user.save();
        return res.json({ msg: "Uploaded...", msg_type: 'good' })
    } catch (error) {
        console.error('Upload details failed:', error);
        res.status(500).json({ error: 'Upload details failed' });
    }
});

// API endpoint for uploading images
app.post('/api/Submit-image-data/:fileType/:email/:data', authCheck, upload.single('file'), async (req, res) => {
    const { email, fileType, data } = req.params;
    try {
        const user = await UserModal.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (fileType === "adCard") {
            user.adCard = req.file.filename
            user.adno = data
        }
        else if (fileType === "panCard") {
            user.panCard = req.file.filename
            user.pnno = data
        }
        else if (fileType === "Xth") {
            user.Xth = req.file.filename
            user.XthM = data
        }
        else if (fileType === "XIIth") {
            user.XIIth = req.file.filename
            user.XIIthM = data
        }
        await user.save();
        return res.json({ msg: "Uploaded...", msg_type: 'good' })
    } catch (error) {
        console.error('Image upload failed:', error);
        res.status(500).json({ error: 'Image upload failed' });
    }
});
// API endpoint for uploading images
app.post('/api/Submit-image/:fileType/:email', authCheck, upload.single('file'), async (req, res) => {
    const { email, fileType } = req.params;
    try {
        const user = await UserModal.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (fileType === "background") {
            user.background = req.file.filename
        }
        else if (fileType === "profilePic") {
            user.profilePic = req.file.filename
        }
        await user.save();
        return res.json({ msg: "Uploaded...", msg_type: 'good' })
    } catch (error) {
        console.error('Image upload failed:', error);
        res.status(500).json({ error: 'Image upload failed' });
    }
});


// API endpoint for user logout
app.get('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Logout successful', msg_type: "good" });
});

// Example protected route
app.get('/api/protected', authCheck, (req, res) => {
    return res.json({ msg: 'This is a protected route', user: req.user, msg_type: 'good', login: true, userDetails: req.userDetails });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
