const React = require('react')
const Def = require('./default')

function home () {
    return (
        <Def>
            <main>
                <h1>HOME</h1>
                <div>
                    <img src="/images/sandwich.jpg" alt="a delicious sandwich"/>
                    <div>
                        Photo by Ria Quartz on Unsplash
                    </div>
                </div>
                <a href="/places">
                    <button className="btn btn-primary">Places Page</button>
                </a>
            </main>
        </Def>
    )
}

module.exports = home