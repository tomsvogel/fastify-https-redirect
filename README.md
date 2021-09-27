# fastify-https-redirect

A plugin for [Fastify](http://fastify.io/) that adds support for http => https redirects.

## Example

    npm install fastify-https-redirect

```js
const server = Fastify({
    http2: true,
    https: {
      allowHTTP1: true,
      key: fs.readFileSync(path.resolve(__dirname, './yourSSL.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './yourSSL.cert')),
    },
  });
server.register(httpsRedirect);
```

With custom http Port

```js
const server = Fastify({
    http2: true,
    https: {
      allowHTTP1: true,
      key: fs.readFileSync(path.resolve(__dirname, './yourSSL.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './yourSSL.cert')),
    },
  });
server.register(httpsRedirect, {httpPort:1080});
```

With custom http Port and https redirect Port

```js
server.register(httpsRedirect,{httpPort:1080, httpsPort:10443});
```

## License

[MIT License](http://jsumners.mit-license.org/)
