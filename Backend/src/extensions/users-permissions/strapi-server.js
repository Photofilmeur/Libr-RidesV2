

module.exports = (plugin) => {
    plugin.controllers.user.create = async (ctx, next) => {
      const { username, email } = ctx.request.body;
  
      if (!username) {
        return ctx.throw('Nom d\'utilisateur manquant');
      }
  
      // Vérifier si le nom d'utilisateur existe déjà
      const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
        where: { username },
      });
  
      if (existingUser) {
        return ctx.throw('Nom d\'utilisateur déjà existant');
      }
  
      // Vérifier si l'email existe déjà
      const existingEmail = await strapi.query('plugin::users-permissions.user').findOne({
        where: { email },
      });
  
      if (existingEmail) {
        return ctx.throw('Email déjà existant');
      }
  
      // Appeler la méthode create d'origine
      const defaultCreate = strapi.plugin('users-permissions').controller('user').create;
      return defaultCreate(ctx, next);
    };

    return plugin;
  };
  