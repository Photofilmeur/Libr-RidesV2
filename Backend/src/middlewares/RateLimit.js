'use strict';

const { RateLimit } = require('koa2-ratelimit');

const rateLimitMiddleware = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.method === 'POST') {
      const limiter = RateLimit.middleware({
        interval: { sec: 10 }, // intervalle 
        max: 5, // max 5 requêtes par minute
        message: 'Too many requests from this IP, please try again after a minute.',
        handler: (ctx) => {
          ctx.status = 429;
          ctx.body = {
            message: 'Too many requests from this IP, please try again after a minute.',
          };
        },
        ...config,
      });

      await limiter(ctx, next);
    } else {
      await next();
    }
  };
};

module.exports = rateLimitMiddleware;
