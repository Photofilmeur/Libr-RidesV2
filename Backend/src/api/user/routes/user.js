'use strict';


module.exports = {
  routes: [
    {
      method: 'DELETE',
      path: '/users/me',
      handler: 'user.deleteMe',
    },

    {
      method: 'PUT',
      path: '/users/me',
      handler: 'user.updateMe',
    },

  ],
};