const router = require('express').Router()
const db = require('../models')

//CREATE ROUTES
//Create one GET
router.get('/new', (req,res) => {
    res.render('places/new')
})

//READ ROUTES
//Read Index
router.get('/', (req,res) => {
    db.Place.find()
    .then((places) => {
        res.render('places/index', { places })
    })
    .catch(err => {
        console.log(err)
        res.render('error404')
    })
})

//Read one by id
router.get('/:id', (req,res) => {
    db.Place.findById(req.params.id)
    .populate('comments')
    .then(place => {
        // console.log(place.comments)
        res.render('places/show', { place })
    })
    .catch(err => {
        console.log(err)
        res.render('error404')
    })
})

//Create one POST
router.post('/', (req, res) => {
    if(!req.body.pic){
        delete req.body['pic']
    }
    db.Place.create(req.body)
    .then(() => {
        res.redirect('/places')
    })
    .catch(err => {
        if (err && err.name == 'ValidationError'){
                let message = 'Validation Error: '
                for (let field in err.errors) {
                    message += `${field} was ${err.errors[field].value}. `
                    message += `${err.errors[field].message} `
                }
                res.render('places/new', { message })
        } else {
            console.log(err)
            res.render('error404')
        }
    })
})

//UPDATE ROUTES
//Update GET route
router.get('/:id/edit', (req, res) => {
    db.Place.findById(req.params.id)
    .then(place => {
        res.render('places/edit', { place })
    })
    .catch(err => {
        res.render('error404')
    })
})

//Update PUT route
router.put('/:id', (req, res) => {
    db.Place.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.redirect(`/places/${req.params.id}`)
    })
    .catch(err => {
        console.log('err', err)
        res.render('error404')
    })
})

//DELETE ROUTES
//Delete one
router.delete('/:id', (req, res) => {
    db.Place.findByIdAndDelete(req.params.id)
    .then(place => {
        res.redirect('/places')
    })
    .catch(err => {
        console.log('err', err)
        res.render('error404')
    })
})

router.post('/:id/comment', (req, res) => {
    // console.log(req.body)
    console.log('ID is: ' + req.params.id)

    
    if(req.body.rant === 'on'){
        req.body.rant = true
    } else {
        req.body.rant = false
    }

    db.Place.findById(req.params.id)
    .then(place => {
        // console.log('Place is: ' + place)
        db.Comment.create(req.body)
        .then(comment => {
            place.comments.push(comment._id)
            place.save()
            .then(()=> {
                res.redirect(`/places/${req.params.id}`)
            })
        })
        .catch(err => {
            res.render('error404')
        })
    })
    .catch(err => {
        res.render('error404')
    })
})

router.delete('/:id/rant/:rantId', (req, res) => {
    res.send('GET /places/:id/:rantId stub')
})

module.exports = router