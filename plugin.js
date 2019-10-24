"use strict";
const fp = require("fastify-plugin");
const http = require("http");

function plugin(fastify, options, next) {
  const httpPort = options.httpPort ? options.httpPort : 80;
  const server = http
    .createServer(function(req, res) {
      const {
        headers: { host },
        url
      } = req;
      const redirectUrl = `https://${host.split(":")[0]}${url}`;
      res.writeHead(301, {
        Location: redirectUrl
      });
      res.end();
    })
    .listen(httpPort);

  fastify.addHook("onClose", (_, done) => {
    server.close();
    done();
  });
  next();
}

module.exports = fp(plugin, {
  fastify: ">=2.0.0",
  name: "fastify-https-redirect"
});
