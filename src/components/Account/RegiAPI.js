import axios from 'axios'
import { URL_REGISTER, URL_CART } from '../../constants/ConfigAPI'

async function RegisterAPI(credentials) {
  try {
    const response = await axios.post(URL_REGISTER, credentials)
    const token = response.data.jwt

    const cartId = await createCartForUser(token)
    return { cartId, token, user: response.data.user } // Retourner le token et l'utilisateur
  } catch (error) {
    handleRegisterError(error)
  }
}

// Créer un panier pour l'utilisateur
async function createCartForUser(token) {
  try {
    const cart = {
      data: {
        users_permissions_user: null,
      },
    }

    const response = await axios.post(URL_CART, cart, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data.id
  } catch (error) {
    console.error('Erreur lors de la création du panier:', error)
  }
}

// Gérer les erreurs d'enregistrement
function handleRegisterError(error) {
  if (error.response && error.response.status === 429) {
    throw error
  } else if (
    error.response &&
    error.response.data &&
    error.response.data.error
  ) {
    const errorMessage = error.response.data.error.message
    console.log("Une erreur s'est produite:", errorMessage)

    let messageEnFrancais
    switch (errorMessage) {
      case '3 errors occurred':
        messageEnFrancais = '3 erreurs se sont produites'
        break
      case 'email must be a valid email':
        messageEnFrancais = "L'email doit être une adresse email valide"
        break
      case 'Email or Username are already taken':
        messageEnFrancais = "L'email ou le nom d'utilisateur est déjà pris"
        break
      case 'password must be at least 6 characters':
        messageEnFrancais =
          'Le mot de passe doit comporter au moins 6 caractères'
        break
      default:
        messageEnFrancais = "Une erreur s'est produite"
    }

    throw new Error(messageEnFrancais)
  } else {
    throw new Error("Une erreur inconnue s'est produite.")
  }
}

export default RegisterAPI
