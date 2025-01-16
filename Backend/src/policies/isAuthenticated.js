'use strict';

module.exports = async (ctx, next) => {
  console.log('Vérification de l\'authentification');
  console.log('ctx.state.user:', ctx.state.user);

  if (ctx.state.user) {
    console.log('Utilisateur authentifié:', ctx.state.user);
    return next();
  }

  console.log('Utilisateur non authentifié');
  ctx.unauthorized(`You're not logged in`);
};