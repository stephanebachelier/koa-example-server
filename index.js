require('dotenv-safe').config()
const Koa = require('koa')
const helmet = require('koa-helmet')
const cors = require('kcors')
const body = require('koa-better-body')
const handleError = require('./middlewares/error')
const ip = require('ip')

const PORT = process.env.PORT || 4004
const HOST = process.env.HOST || '127.0.0.1'

const debug = require('debug')('app')

// require('./db')

const app = new Koa()

app
  .use(handleError)
  .use(helmet())
  .use(cors())
  .use(helmet.hsts({
    maxAge: 10886400000,
    includeSubDomains: true,
    preload: true,
    force: true
  }))
  .use(body({
    textLimit: '100kb',
    jsonLimit: '100kb'
  }))

require('./api')(app)

app.listen(PORT, HOST, infos => {
  debug(`Listening on ${HOST}:${PORT} - current server ip : ${ip.address()}`)
})
