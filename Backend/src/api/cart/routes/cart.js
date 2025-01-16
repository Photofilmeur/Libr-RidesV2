'use strict';

/**
 * cart router
 */


module.exports = {
    routes: [
      {
        method: 'DELETE',
        path: '/carts/me',
        handler: 'cart.deleteMe',
      },
  
      {
        method: 'GET',
        path: '/carts/me',
        handler: 'cart.findMe',
      },

      {
        method: 'POST',
        path: '/carts',
        handler: 'cart.create',
      },

      {
        method: 'POST',
        path: '/carts/me',
        handler: 'cart.updateMe',
      },
  
    ],
  };
