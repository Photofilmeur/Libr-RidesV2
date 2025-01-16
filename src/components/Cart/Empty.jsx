import React from 'react'
import { useNavigate } from 'react-router-dom' // Importation du hook useNavigate
import EmptyIcon from '../../assets/icons/panier-vide.webp'
import SeeMoreButton from '../designLayouts/buttons/SeeMoreButton'

const EmptyCartCard = () => {
  const navigate = useNavigate()

  const handleGoHomeClick = () => {
    navigate('/Product')
  }

  return (
    <div className="flex items-center justify-center h-3/4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm text-center">
        {/* Illustration */}
        <div className="mb-6">
          <img
            src={EmptyIcon}
            alt="Panier vide"
            className="w-24 h-24 mx-auto"
          />
        </div>

        {/* Message */}
        <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
        <p className="text-gray-500 mb-6">
          On dirait que vous n'avez encore rien ajouté à votre panier.
        </p>

        {/* Button */}
        <SeeMoreButton buttonText="Les produits" onClick={handleGoHomeClick} />
      </div>
    </div>
  )
}

export default EmptyCartCard
