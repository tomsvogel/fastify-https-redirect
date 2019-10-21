import fastify = require('fastify');
import {IncomingMessage, Server, ServerResponse} from 'http';
import {Http2ServerRequest, Http2ServerResponse} from 'http2';
import httpsRedirect = require('../plugin');

const http: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();
http.register(httpsRedirect);

const http2: fastify.FastifyInstance<Server, Http2ServerRequest, Http2ServerResponse> = fastify();
http2.register(httpsRedirect, {httpPort: 1080});
