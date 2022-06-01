const db = require('../models')

async function seed() {
    let place = await db.Place.findOne({ name: 'H-Thai-ML' })

    let comment = await db.Comment.create({
        author: 'Famished Fran',
        rant: false,
        stars: 5.0,
        content: "Wow, much good, such food!"
    })

    place.comments.push(comment.id)

    await place.save()

    process.exit()
}

seed()