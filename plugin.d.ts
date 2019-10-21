/// <reference types="node" />
import {FastifyRequest, Plugin, DefaultQuery, DefaultParams, DefaultHeaders, FastifyError, FastifyReply} from 'fastify';
import {IncomingMessage, ServerResponse, Server} from 'http';
import {Http2ServerRequest, Http2ServerResponse, Http2Server} from 'http2';

type HttpRequest = IncomingMessage | Http2ServerRequest;
type HttpResponse = ServerResponse | Http2ServerResponse;

declare const fastifyHttpsRedirect: Plugin<
  Server,
  HttpRequest,
  HttpResponse,
  {httpPort?: number},
  (err?: FastifyError | undefined) => void
>;

export = fastifyHttpsRedirect;
