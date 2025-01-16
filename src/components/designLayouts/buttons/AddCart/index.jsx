import React, { useState, useEffect } from 'react'
import './style.css'
import { URL_CARTITEM, URL_CARTME } from '../../../../constants/ConfigAPI'
import { SuccessNotif, ErrorNotif } from '../../../Notif&Error/Notif'

const CartButton = ({ produit }) => {
  const [notification, setNotification] = useState({ type: '', message: '' })

  useEffect(() => {
    if (notification.type) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '' })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [notification])

  const addToCart = async () => {
    const token = localStorage.getItem('authToken')

    if (!token) {
      setNotification({
        type: 'error',
        message: 'Vous devez être connecté pour ajouter un produit au panier.',
      })

      setTimeout(() => {
        window.location.href = '/Account/Login'
      }, 3000)

      return
    }

    try {
      const responseGetCart = await fetch(URL_CARTME, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!responseGetCart.ok) {
        throw new Error('Erreur lors de la récupération du panier')
      }

      const existingCart = await responseGetCart.json()
      const existingCartItems = existingCart.cart_items || []

      const existingCartItem = existingCartItems.find(
        (item) => item.produit.id === produit.id
      )

      if (existingCartItem) {
        const updatedCartItem = {
          data: {
            quantity: existingCartItem.quantity + 1,
          },
        }

        const responseUpdateCartItem = await fetch(
          `${URL_CARTITEM}/${existingCartItem.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedCartItem),
          }
        )

        if (!responseUpdateCartItem.ok) {
          throw new Error('Erreur lors de la mise à jour du cartItem')
        }

        setNotification({
          type: 'success',
          message: 'Quantité mise à jour dans le panier',
        })
      } else {
        const cartItem = {
          data: {
            produit: produit.id,
            quantity: 1,
          },
        }

        const responseCartItem = await fetch(`${URL_CARTITEM}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartItem),
        })

        if (!responseCartItem.ok) {
          throw new Error('Erreur lors de la création du cartItem')
        }

        const createdCartItem = await responseCartItem.json()
        const cartItemId = createdCartItem.data.id

        const updatedCartItems = [...existingCartItems, cartItemId]

        const cartUpdate = {
          data: {
            cart_items: updatedCartItems,
          },
        }

        const responseUpdateCart = await fetch(URL_CARTME, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartUpdate),
        })

        if (!responseUpdateCart.ok) {
          throw new Error('Erreur lors de la mise à jour du panier')
        }

        setNotification({
          type: 'success',
          message: 'Produit ajouté au panier',
        })
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: `Erreur lors de l'ajout du produit au panier`,
      })
    }
  }

  return (
    <div className="flex flex-col xs:items-center lgl:items-start lgl:space-y-4 xs:space-y-2">
      {notification.type === 'success' && (
        <SuccessNotif message={notification.message} />
      )}
      {notification.type === 'error' && (
        <ErrorNotif message={notification.message} />
      )}

      <button className="cartBtn" onClick={addToCart}>
        <svg
          className="cart"
          fill="white"
          viewBox="0 0 576 512"
          height="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
        </svg>
        <h4 className="font-body">Ajouter au panier</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 640 512"
          className="product"
        >
          <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" />
        </svg>
      </button>
    </div>
  )
}

export default CartButton
