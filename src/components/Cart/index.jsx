import React, { useState, useEffect } from 'react'
import { URL_CARTITEM, URL_CARTME } from '../../constants/ConfigAPI'
import { getAuthToken } from '../Account/MyAccount/InfoUserApi'
import { API_URL, URL_PRODUITS } from '../../constants/ConfigAPI'
import EmptyCartCard from './Empty'

function ShoppingCart({
  onTotalUpdate,
  noMargin,
  customTitleClass,
  customEmptyClass,
  LoadingCart,
  onShowEmptyCartChange,
}) {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [imagesLoading, setImagesLoading] = useState(true)
  const [loadingCart, setIsLoadingCart] = useState(false)
  const [showEmptyCart, setShowEmptyCart] = useState(false)

  // Vérifiez si onShowEmptyCartChange est une fonction
  if (typeof onShowEmptyCartChange !== 'function') {
  }

  useEffect(() => {
    let loadingTimeout
    if (imagesLoading || loadingCart) {
      loadingTimeout = setTimeout(() => {
        LoadingCart(true)
      }, 300)
    } else {
      LoadingCart(false)
    }
    return () => {
      clearTimeout(loadingTimeout)
    }
  }, [imagesLoading, loadingCart])

  useEffect(() => {
    const fetchCart = async () => {
      const token = getAuthToken()
      setIsLoadingCart(true)
      try {
        const response = await fetch(`${URL_CARTME}?populate=*`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        const items = data?.cart_items || []
        setCartItems(items)
        calculateTotal(items)
        await loadImages(items)
      } catch (error) {
        console.error('Erreur lors de la récupération du panier :', error)
      } finally {
        setIsLoadingCart(false)
      }
    }
    fetchCart()
  }, [LoadingCart])

  useEffect(() => {
    if (cartItems.length === 0) {
      const timer = setTimeout(() => {
        setShowEmptyCart(true)
        if (typeof onShowEmptyCartChange === 'function') {
          onShowEmptyCartChange(true)
        }
      }, 800)

      return () => clearTimeout(timer)
    } else {
      setShowEmptyCart(false)
      if (typeof onShowEmptyCartChange === 'function') {
        onShowEmptyCartChange(false)
      }
    }
  }, [cartItems])

  const loadImages = (items) => {
    const imagePromises = items.map((item) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = `${API_URL}${item.produit.PreviewImage.url}`
        img.onload = resolve
        img.onerror = reject
      })
    })

    return Promise.all(imagePromises)
      .then(() => {
        setImagesLoading(false) // Les images sont prêtes
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des images:', error)
        setImagesLoading(false)
      })
  }

  const calculateTotal = (items) => {
    const totalAmount = items.reduce(
      (total, item) => total + item.produit.prix * item.quantity,
      0
    )
    setTotal(totalAmount)
    const formattedTotal = totalAmount.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    })
    onTotalUpdate(formattedTotal)
  }

  const removeItem = async (itemId) => {
    try {
      await fetch(`${URL_CARTITEM}/${itemId}`, {
        method: 'DELETE',
      })

      const updatedItems = cartItems.filter((item) => item.id !== itemId)
      setCartItems(updatedItems)
      calculateTotal(updatedItems)
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error)
    }
  }

  const updateQuantity = async (itemId, newQuantity) => {
    const token = getAuthToken()
    try {
      const response = await fetch(`${URL_CARTITEM}/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            quantity: newQuantity,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const updatedItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )

      setCartItems(updatedItems)
      calculateTotal(updatedItems)
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité :', error)
    }
  }

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value, 10)
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity)
    }
  }

  const handleDetailsClick = async (produitId) => {
    try {
      // Obtenir la catégorie
      const response = await fetch(
        `${URL_PRODUITS}/${produitId}?populate=category`
      )
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      const category = data.data.attributes.category.data.attributes.Nom // Recherche de la catégorie
      const productUrl = `/Product/${category}/${produitId}` // Construire l'URL

      // Rediriger vers l'URL
      window.location.href = productUrl
    } catch (error) {
      console.error('Erreur lors de la récupération de la catégorie :', error)
    }
  }


  return (
    <div
      className={`w-full bg-gray-100 mx-auto sm:p-4 xs:py-4 ${
        noMargin ? '' : 'mt-20'
      }`}
    >
      <h2
        className={`w-auto text-2xl font-title font-black text-center pb-10  ${customTitleClass}`}
      >
        Panier
      </h2>

      {showEmptyCart ? (
        <div className={`h-full bg-gray-100 ${customEmptyClass} `}>
          <EmptyCartCard />
        </div>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center p-4 bg-white shadow rounded-lg w-4/4 h-24"
            >
              <img
                src={`${API_URL}${item.produit.PreviewImage.url}`}
                alt={item.produit.PreviewImage.name}
                className="w-24 sm:w-32 h-auto object-cover rounded cursor-pointer"
                onClick={() => handleDetailsClick(item.produit.id)}
              />
              <div className="ml-4 flex-1">
                <h3
                  className="mdl:text-xl text-m font-body font-medium cursor-pointer"
                  onClick={() => handleDetailsClick(item.produit.id)}
                >
                  {item.produit.DetailTitre}
                </h3>
                <p className="text-gray-600">
                  Prix:{' '}
                  {item.produit.prix.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </p>
                <div
                  className="flex items-center xl:justify-center space-x-4"
                  onClick={(e) => {}}
                >
                  <p className="text-gray-600">Quantité:</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    className="w-16 text-center border rounded"
                  />
                </div>
              </div>

              <button
                className="absolute top-0 right-0 bg-transparent text-gray-500 hover:text-red-500 w-auto h-auto"
                onClick={(e) => {
                  removeItem(item.id)
                }}
                aria-label="Supprimer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-tabler icon-tabler-trash"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3h6v3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ShoppingCart
