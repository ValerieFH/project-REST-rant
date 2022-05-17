//CONFIG
const express = require('express')
const app = express()
require('dotenv').config()

app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//ROUTES
app.use('/places', require('./controllers/places'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('*', (req, res) => {
    res.status(404).send('<h1>Dang, 404, yall</h1>')
})

app.listen(process.env.PORT)

// Colors to use, Deep Taupe (#815E5B), Purple (#7A6F9B), Light Purple (#D4CDF4)