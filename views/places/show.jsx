const React = require('react')
const Def = require('../default')

function show(data){
    let comments = (
        <h3 className="inactive">
            No comments yet!
        </h3>
    )
    let rating = (
        <h3 className="inactive">
            Not yet rated
        </h3>
    )
    if (data.place.comments.length) {
        let sumRatings = data.place.comments.reduce((tot, c) => {
            return tot + c.stars
        }, 0)
        let averageRating = Math.round(sumRatings / data.place.comments.length)
        let stars = ''
        for (let i = 0; i < averageRating; i++){
            stars += '⭐️'
        }
        rating = (
            <h3>
            {stars} stars
            </h3>
        )
        comments = data.place.comments.map(c => {
            return (
                <div className="border">
                    <h2 className="rant">{c.rant ? 'Rant! 🤬' : 'Rave! 🥰'}</h2>
                    <h4>{c.content}</h4>
                    <h3>
                        <strong>- {c.author}</strong>
                    </h3>
                    <h4>Rating: {c.stars}</h4>
                </div>
            )
        })
    }
    return (
        <Def>
            <main>
                <h1>{ data.place.name }</h1>
                <h2>Rating</h2>
                {rating}
                <br />
                <img src={data.place.pic} alt={data.place.name}></img>
                <h2>Rating</h2>
                <p>Not Rated</p>
                <h2>Description</h2>
                <h3>{data.place.showEstablished()}</h3>
                <h4>Serving { data.place.cuisines }</h4>
                <h2>Comments</h2>
                {comments}
                <br />
                <form method="POST" action={`/places/${data.place._id}/comment`}>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input className="form-control" id="author" name="author" type="text"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Comment</label>
                        <input className="form-control" id="content" name="content" type="textarea"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stars">Rating</label>
                        <input className="form-control" id="stars" name="stars" type="number" step="0.5"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rant">Rant?</label>
                        <input className="form-control" id="rant" name="rant" type="checkbox"/>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Add Comment" />
                </form>
                <br />
                <a href={`/places/${data.place._id}/edit`} className="btn btn-warning">
                    Edit Place
                </a>
                <form method="POST" action={`/places/${data.place._id}?_method=DELETE`}>
                    <button type="submit" className="btn btn-danger">
                        Delete Place
                    </button>
                </form>
            </main>
        </Def>
    )
}

module.exports = show