const express = require('express');
const connectDB = require('./src/config/dbConnection');
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

connectDB();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
  });

const app = express();

app.use(limiter)
app.use(express.json());
// app.use(cors(corsOptions));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
