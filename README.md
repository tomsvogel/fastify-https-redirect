# fastify-https-redirect

A plugin for [Fastify](http://fastify.io/) that adds support for http => https redirects.

## Example

```js
const fastify = require('fastify')();
fastify.register(require('fastify-https-redirect'));
```

With custom http Port

```js
const fastify = require('fastify')();
fastify.register(require('fastify-https-redirect'), {httpPort: 1080});
```

## License

[MIT License](http://jsumners.mit-license.org/)
