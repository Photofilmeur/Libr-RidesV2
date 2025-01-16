const { RateLimit } = require('koa2-ratelimit');
const path = require('path');

module.exports = [
  'strapi::logger',
  'strapi::errors',

  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
 
  'global::RateLimit',


  {
    name: "strapi::security",
    config: {
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
        "connect-src": ["'self'", "https:"],
          "script-src": ["'self'", "https://cdnjs.cloudflare.com"],
          "media-src": ["'self'", "data:", "blob:"],
          "img-src": ["'self'", "data:", "blob:"],
        },
    },
    },
},
  


];
