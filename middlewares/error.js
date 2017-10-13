const createError = require('http-errors')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.isBoom) {
      const { statusCode, payload } = err.output
      ctx.status = statusCode
      ctx.body = payload.error
      return
    }

    const error = createError(
      err.status || err.statusCode || 500,
      500 && process.env.NODE_ENV !== 'production' ? err.message : ''
    )
    ctx.status = error.statusCode
    ctx.body = error.message

    ctx.app.emit('error', err, ctx)
  }
}
