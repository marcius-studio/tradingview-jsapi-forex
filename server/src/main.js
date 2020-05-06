// Require the framework and instantiate it
const server = require('fastify')({ logger: false })
const cors = require('cors')

const { getData, setData } = require('./database')

// Allow crossdomain requests
server.use(cors())

// Declare a route
server.get('/charts-storage/', async (request, reply) => {
    const symbol = request.query.symbol
    getData(symbol, cb => reply.status(200).send(cb || {}))
})

server.post('/charts-storage/', (request, reply) => {
    const symbol = request.query.symbol
    setData({ symbol, content: request.body })
    reply.code(200).send({})
})

server.listen(3000, (err, address) => {
    if (err) throw err
    console.log('server listening on http://localhost:3000')
})