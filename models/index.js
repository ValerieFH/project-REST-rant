const mongoose = require('mongoose')
require('dotenv').config()

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB is locked and loaded'))
    .catch(err => console.error(err));

module.exports.Place = require('./places')