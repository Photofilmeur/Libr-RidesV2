'use strict';

/**
 * user controller
 */

module.exports = {
  async deleteMe(ctx) {
    try {
      const user = ctx.state.user;
      console.log('Utilisateur tentant de supprimer :', user);

      if (!user) {
        return ctx.unauthorized(`Vous n'êtes pas connecté`);
      }

      await strapi.plugins['users-permissions'].services.user.remove({ id: user.id });
      console.log('Compte supprimé avec succès');
      return ctx.send({ message: 'Compte supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error);
      return ctx.internalServerError("Une erreur s'est produite lors de la suppression du compte");
    }
  },

  async updateMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized(`Vous n'êtes pas connecté`);
      }

      const { id } = user;
      const updateData = ctx.request.body;

      if (!updateData || Object.keys(updateData).length === 0) {
        return ctx.badRequest('Aucune donnée fournie pour la mise à jour');
      }

      // Vérification de l'unicité de l'email
      if (updateData.email) {
        const existingUserWithEmail = await strapi.query('plugin::users-permissions.user').findOne({
          where: { email: updateData.email, id: { $ne: id } },
        });
        if (existingUserWithEmail) {
          return ctx.conflict("Le nom d'utilisateur ou l'adresse email est déjà prise.");
        }
      }

      // Vérification de l'unicité du nom d'utilisateur
      if (updateData.username) {
        const existingUserWithUsername = await strapi.query('plugin::users-permissions.user').findOne({
          where: { username: updateData.username, id: { $ne: id } },
        });
        if (existingUserWithUsername) {
          return ctx.conflict("Le nom d'utilisateur ou l'adresse email est déjà prise.");
        }
      }

      // Mise à jour de l'utilisateur
      const updatedUser = await strapi.query('plugin::users-permissions.user').update({ where: { id }, data: updateData });

      return ctx.send(updatedUser);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du compte:', error);
      return ctx.internalServerError("Une erreur s'est produite lors de la mise à jour du compte");
    }
  }
};
