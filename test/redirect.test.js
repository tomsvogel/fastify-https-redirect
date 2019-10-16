'use strict'
const tap = require('tap')
const { test, tearDown } = tap
const Fastify = require('fastify')
const request = require('request')
const httpsRedirect = require('../plugin.js')
const fs = require('fs')
const path = require('path')

function doRequest (url, options) {
  const req = request.defaults(options)
  return new Promise(function (resolve, reject) {
    req(url, function (error, res) {
      if (!error) {
        resolve(res)
      } else {
        reject(error)
      }
    })
  })
}

test('check redirect', async t => {
  const server = Fastify()
  server.register(httpsRedirect)
  await server.listen(1080)

  const reqOpts = {
    method: 'GET',
    baseUrl: 'http://localhost:1080',
    followRedirect: false
  }
  try {
    const response = await doRequest('/test', reqOpts)
    t.strictEqual(response.statusCode, 301)
  } catch (err) {
    t.error(err)
  }
  tearDown(server.close.bind(server))
})

test('check next() on https request', async t => {
  const server = Fastify({
    http2: true,
    https: {
      allowHTTP1: true,
      key: fs.readFileSync(path.resolve(__dirname, './fastify.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './fastify.cert'))
    }
  })
  server.register(httpsRedirect)

  server.get('/test', (req, reply) => {
    reply.code(200).send('success')
  })
  await server.listen(10443)

  const reqOpts = {
    method: 'GET',
    baseUrl: 'https://localhost:10443',
    followRedirect: false
  }
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
  try {
    const response = await doRequest('/test', reqOpts)
    t.strictEqual(response.statusCode, 200)
  } catch (err) {
    t.error(err)
  }
  tearDown(server.close.bind(server))
})
