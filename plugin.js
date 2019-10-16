'use strict'
const fp = require('fastify-plugin')

async function fastifyCookieOnReqHandler (fastifyReq, fastifyRes) {
  const { hostname } = fastifyReq
  const { connection, originalUrl } = fastifyReq.req
  if (!connection.ssl) {
    const redirectUrl = `https://${hostname.split(':')[0]}${originalUrl}`
    fastifyRes.redirect(301, redirectUrl)
  }
}

function plugin (fastify, options, next) {
  fastify.addHook('onRequest', fastifyCookieOnReqHandler)
  next()
}

module.exports = fp(plugin, {
  fastify: '>=2.0.0',
  name: 'fastify-https-redirect'
})
