// Init database
const Datastore = require('nedb')

var db = new Datastore({
    filename: 'tradingview.db',
    autoload: true,
    inMemoryOnly: false,
})

// increased productivity, conversion to single-line format
db.persistence.compactDatafile()
db.persistence.setAutocompactionInterval(60 * 1000) // every 1m

const getData = async (symbol, callback) => {
    db.findOne({ symbol }).exec((err, doc) => callback(doc.content))
}

const setData = ({ symbol, content }) => {
    return db.findOne({ symbol }, (err, doc) => {
        if (doc) {
            // 1 - search, 2 - update data, 3 - options
            return db.update({ symbol }, { $set: { content } }, {})
        }

        return db.insert({ symbol, content })
    })
}

module.exports = {
    getData,
    setData
}