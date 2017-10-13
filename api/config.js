module.exports = {
  status: {
    path: '/status',
    method: 'get',
    service: require('./services/status')
  }
}
