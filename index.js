//CONFIG
const express = require('express')
const app = express()
const methodOverride = require('method-override')
require('dotenv').config()
const PORT = process.env.PORT

app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(express.static('public'))
app.use(express.urlencoded({  extended:true  }))
app.use(methodOverride('_method'))

//ROUTES
app.use('/places', require('./controllers/places'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('*', (req, res) => {
    res.render('error404')
})

app.listen(PORT, () => console.log(`Live and worldwide at port ${PORT}`))

// Colors to use, Deep Taupe (#815E5B), Purple (#7A6F9B), Light Purple (#D4CDF4)