require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const models = require('./models/models');
const router = require('./routes/index');

const PORT = process.env.PORT || 5000;

// server
const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {console.log(`SERVER STARTED ON PORT ${PORT}`)})
    } catch (error) {
        console.error(error);
    }
}

start();

