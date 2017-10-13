const router = require('koa-router')()
const Boom = require('boom')
const debug = require('debug')('api:services')
const config = require('./config')

function loadServices (router) {
  debug('load services')
  Object.keys(config).forEach((name) => {
    const { path, method, service } = config[name]

    // TODO - inject validation middleware
    const middlewares = []
    middlewares.push(service.handler)

    debug(`load route %s %s`, method, path)
    router[method](path, ...middlewares)
  })
}

module.exports = app => {
  loadServices(router)

  app
    .use(router.routes())
    .use(router.allowedMethods({
      throw: true,
      notImplemented: () => new Boom.notImplemented(), // eslint-disable-line
      methodNotAllowed: () => new Boom.methodNotAllowed()  // eslint-disable-line
    }))
}
