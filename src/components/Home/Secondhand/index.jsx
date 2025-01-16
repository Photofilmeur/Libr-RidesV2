import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import productRange from '../../../assets/images/logo.webp'
import ShopNow from '../../designLayouts/buttons/SeeMoreButton'
import ImageComponent from '../../designLayouts/Image'

function Secondhand({ setIsLoading }) {
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = resolve
      img.onerror = reject
    })
  }

  useEffect(() => {
    let timer

    const fetchImage = async () => {
      try {
        timer = setTimeout(() => {
          setIsLoading(true)
        }, 500)

        // Chargement de l'image principale
        await loadImage(productRange)

        clearTimeout(timer)
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement de l'image:", error)
        clearTimeout(timer)
        setIsLoading(false)
      }
    }

    fetchImage()

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [setIsLoading])

  return (
    <div className="w-full h-auto pr-5 md:h-50 mb-20 bg-[#f3f3f3] relative font-titleFont flex flex-col md:flex-row items-center justify-center md:justify-between">
      <ImageComponent
        className="w-1/3 md:w-50 h-auto md:w-80 object-cover md:object-contain"
        imgSrc={productRange}
      />
      <div className="w-full md:w-2/3 xl:w-1/2 px-4 md:px-0 mt-4 md:mt-0 flex flex-col items-center md:items-start gap-6 justify-center flex-wrap-reverse">
        <h2 className="text-3xl font-title font-bold text-primeColor text-center md:text-right md:text-left">
          Découvrez notre sélection d'articles d'occasion
        </h2>
        <p className="font-body text-base text-primeColor max-w-[600px] text-center md:text-left">
          Explorez notre gamme d'articles d'occasion soigneusement sélectionnés.
          Parcourez notre inventaire varié pour trouver des offres
          exceptionnelles sur des véhicules tout-terrain, parfaitement
          entretenus et prêts à reprendre la route.
        </p>
        <Link to="/Occasion">
          <ShopNow />
        </Link>
      </div>
    </div>
  )
}

export default Secondhand
