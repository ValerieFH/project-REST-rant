const express = require('express')
const app = express()
require('dotenv').config()

app.get('/places', require('./controllers/places'))

app.get('/', (req, res) => {
    res.send('Howdy yall')
})

app.get('*', (req, res) => {
    res.status(404).send('<h1>Dang, 404, yall</h1>')
})

app.listen(process.env.PORT)