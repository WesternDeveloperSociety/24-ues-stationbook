const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const certificationRoutes = require('./routes/certificationRoutes.js');
const relationRoutes = require('./routes/relationRoutes.js');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.use('/api/certification', certificationRoutes);

app.use('/api/relation', relationRoutes);

app.use(express.json()); 

app.use(cookieParser()); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))