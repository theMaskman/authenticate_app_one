const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const apiRouter = require('./Routes/signIn');
const profileRouter = require('./Routes/profile');
require('dotenv/config');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/auth', apiRouter);
app.use('/auth/profile', profileRouter);

mongoose.connect(process.env.DB_COLLECTION)
    .then(() => app.listen(PORT,  () => console.info("Backend connection established")))
    .catch(error => console.error(error));
