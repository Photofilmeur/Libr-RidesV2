'use strict';

/**
 * cart controller
 */

module.exports = {
  // Récupérer le panier de l'utilisateur connecté
  async findMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Vous n\'êtes pas connecté');
      }

      const cart = await strapi.query('api::cart.cart').findOne({
        where: { users_permissions_user: user.id },
        populate: {
          users_permissions_user: true, 
          cart_items: {                
            populate: {
              produit: {
                populate:{
                  PreviewImage:true ,
                }
              }           
            },
          },
        },
      });

      if (!cart) {
        return ctx.notFound('Aucun panier trouvé pour cet utilisateur');
      }

      return ctx.send(cart);
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
      return ctx.internalServerError("Une erreur s'est produite lors de la récupération du panier");
    }
  },

  // Supprimer le panier de l'utilisateur connecté
  async deleteMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Vous n\'êtes pas connecté');
      }

      const cart = await strapi.query('api::cart.cart').findOne({
        where: { users_permissions_user: user.id },
      });

      if (!cart) {
        return ctx.notFound('Aucun panier trouvé pour cet utilisateur');
      }

      await strapi.query('api::cart.cart').delete({ where: { id: cart.id } });
      console.log('Panier supprimé avec succès');
      return ctx.send({ message: 'Panier supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du panier:', error);
      return ctx.internalServerError("Une erreur s'est produite lors de la suppression du panier");
    }
  },

  // Créer un panier pour l'utilisateur connecté
  async create(ctx) {
    try {
      const cartData = ctx.request.body;

      const newCart = await strapi.query('api::cart.cart').create({ data: cartData });

      return ctx.send(newCart);
    } catch (error) {
      console.error('Erreur lors de la création du panier:', error);
      return ctx.internalServerError("Une erreur s'est produite lors de la création du panier");
    }
  },

  // Mettre à jour le panier de l'utilisateur connecté
  async updateMe(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized('Vous n\'êtes pas connecté');
      }
  
      const cart = await strapi.query('api::cart.cart').findOne({
        where: { users_permissions_user: user.id },
      });
  
      if (!cart) {
        return ctx.notFound('Aucun panier trouvé pour cet utilisateur');
      }
  
  
      const updatedCartData = ctx.request.body.data || {}; 
  
      const updatedCart = await strapi.query('api::cart.cart').update({
        where: { id: cart.id },
        data: updatedCartData,
      });
  
      return ctx.send(updatedCart);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du panier:', error);
      return ctx.internalServerError("Une erreur s'est produite lors de la mise à jour du panier");
    }
  }
};
