import React from 'react'
import { ReactComponent as DeliveryIcon } from '../../assets/icons/delivery.svg'
import { ReactComponent as ShippingIcon } from '../../assets/icons/shipping.svg'
import { ReactComponent as SecureIcon } from '../../assets/icons/secure-payment.svg'
import OrderCart from '../designLayouts/buttons/OrderCart'

// Formater les nombres avec des séparateurs de milliers et des décimales
const formatCurrency = (value) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

// Convertion de chaîne formatée en nombre
const parseCurrency = (value) => {
  return parseFloat(value.replace(/\s|€/g, '').replace(',', '.'))
}

function CheckoutSummary({ total }) {
  // Convertir le total en nombre
  const numericTotal = parseCurrency(total)

  // Déterminer le coût de la livraison
  const shippingCost = numericTotal === 0 ? 0 : numericTotal >= 10000 ? 0 : 250

  // Calculer le total final
  const finalTotal = numericTotal + shippingCost

  return (
    <div className="md:sticky top-0 flex md:items-center justify-center p-6 bg-gray-50 rounded-lg shadow-lg md:w-2/3 w-full md:max-w-md md:mx-auto mr-10 md:h-screen">
      <div>
        {/* Produits et Livraison */}
        <div className="flex justify-between text-gray-700 mb-4">
          <span>Produits</span>
          <span>{total}</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-6">
          <span>Livraison</span>
          <span>{formatCurrency(shippingCost)}</span>
        </div>
        {/* Total */}
        <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
          <span>Total</span>
          <span>{formatCurrency(finalTotal)}</span>
        </div>
        {/* Bouton de commande */}
        <div className="w-full">
          <OrderCart />
        </div>
        {/* Code promo */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Mon bon de réduction"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button className="mt-2 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300">
            Ajouter
          </button>
        </div>
        {/* Contact */}
        <div className="text-center mt-6 text-sm text-gray-700">
          Une question ? Contactez-nous au{' '}
          <span className="font-bold">04.82.53.40.22</span>
        </div>
        {/* Informations supplémentaires */}
        <div className="mt-20 space-y-4 text-sm text-gray-700">
          <div className="flex items-center">
            <DeliveryIcon className="w-6 h-6 mr-2" />
            <span>Expédié en 48 heures maximum</span>
          </div>
          <div className="flex items-center">
            <ShippingIcon className="w-6 h-6 mr-2" />
            <span>Frais de port offerts dès 10 000€</span>
          </div>
          <div className="flex items-center">
            <SecureIcon className="w-6 h-6 mr-2" />
            <span>Paiement ultra sécurisé</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
