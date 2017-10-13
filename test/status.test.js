import './setup'
import test from 'ava'
import got from 'got'
import options from './options'

test('GET /status', async t => {
  const res = await got.get('/status', options)

  t.is(res.statusCode, 200)
  t.regex(res.headers['content-type'], /plain/)
})
