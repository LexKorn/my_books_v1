const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middlewares/ErrorHandlingMiddleware');

require('colors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Working'});
// });

const start = async() => {
    try {
        await sequelize.authenticate().then(console.log('Connect to DB successfull!'.bgMagenta)); 
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has started on port ${PORT}`.bgCyan));
    } catch (err) {
        console.log(err);
    }
};

start();