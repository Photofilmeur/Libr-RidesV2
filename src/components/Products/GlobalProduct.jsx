import React, { useState, useEffect } from 'react'
import qs from 'qs'
import SeeMoreButton from '../designLayouts/buttons/SeeMoreButton'
import background_cross from '../../assets/images/Accueil/IMG_Cross3.webp'
import background_route from '../../assets/images/Accueil/IMG_Route2.webp'
import background_quad from '../../assets/images/Accueil/IMG_Quad.webp'
import CardLoader from '../designLayouts/Loaders/CardLoader/CardLoader'
import { API_URL } from '../../constants/ConfigAPI'
import { useNavigate } from 'react-router-dom'  

function GlobalProduct() {
  const [produits, setproduits] = useState([])
  const [imagesLoading, setImagesLoading] = useState(false)
  const navigate = useNavigate()  

  const loadingTimeout = 900

  const currentPath = window.location.pathname
  const pathSegments = currentPath.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]

  let background_img
  if (lastSegment === 'Route') {
    background_img = background_route
  } else if (lastSegment === 'Cross') {
    background_img = background_cross
  } else if (lastSegment === 'Quads') {
    background_img = background_quad
  }

  const CategoryToFilter = lastSegment

  const query = qs.stringify(
    {
      fields: ['titre', 'prix', 'PreviewDescription'],

      populate: {
        PreviewImage: {
          fields: ['name', 'url', 'alternativeText'],
        },
        category: {
          fields: ['Nom'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  useEffect(() => {
    let timer 

    // Fonction pour démarrer le timer
    const startTimer = () => {
      timer = setTimeout(() => {
        setImagesLoading(true)
      }, loadingTimeout)
    }

    
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = resolve
        img.onerror = reject
      })
    }

    // Chargement de toutes les images
    const loadImages = async (response) => {
      const imagePromises = response.data.map((produit) => {
        return loadImage(
          `${API_URL}${produit.attributes.PreviewImage.data.attributes.url}`
        )
      })

      // Promesse de chargement de l'image de fond
      imagePromises.push(loadImage(background_img))

      try {
        await Promise.all(imagePromises)
        clearTimeout(timer)
        setImagesLoading(false)
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error)
        clearTimeout(timer)
        setImagesLoading(false)
      }
    }

    startTimer()

    fetch(`${API_URL}/api/produits?${query}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setproduits(response.data)
        loadImages(response) 
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits:', error)
        clearTimeout(timer)
        setImagesLoading(false)
      })

    return () => {
      if (timer) {
        clearTimeout(timer) 
      }
    }
  }, [query, background_img, loadingTimeout])

  const handleDetailsClick = (produitId) => {
    navigate(`/Product/${lastSegment}/${produitId}`)
  }

  return (
    <div>
      {imagesLoading ? (
        <CardLoader />
      ) : (
        <div className="relative min-h-screen w-full bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed min-w-full z-0 "
            style={{
              backgroundImage: `url(${background_img || 'black'})`,
              filter: 'brightness(0.7) blur(2px)',
            }}
          ></div>
          <div className=" w-full p-10 h-full flex flex-col items-center gap-10">
            <div className="mt-40 mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mdl:grid-cols-3 xl:grid-cols-4 gap-20 md:gap-8 sm:gap-8 lg:gap-20 ">
              {produits.map((produit) =>
                produit &&
                produit.attributes.category.data.attributes.Nom ===
                  CategoryToFilter ? (
                  <div
                    className="group p-5 w-60 h-100 p-3 flex flex-col gap-4 bg-[#646464] transition-all duration-700 ease-in-out transform hover:scale-105 rounded-[8px] hover:rounded-tl-[50px] hover:rounded-br-[60px] bg-opacity-70 hover:bg-opacity-95 "
                    key={produit.id}
                  >
                    <img
                      className="w-full h-auto md:h-[140px] object-cover"
                      src={
                        `${API_URL}${produit.attributes.PreviewImage.data.attributes.url}` ??
                        null
                      }
                      alt={
                        produit.attributes.PreviewImage.data.attributes
                          .alternativeText ?? null
                      }
                    />
                    <div className="w-20 mx-auto border-t border-gray-30"></div>
                    <div className="flex flex-col gap-8 ">
                      <div className="h-[90px] flex flex-row justify-between gap-4">
                        <div className="flex flex-col">
                          <h2 className=" text-lg md:text-xl  text-gray-50 font-bold mb-1">
                            {' '}
                            {produit.attributes.titre || 'Titre manquant'}
                          </h2>
                          <p className="text-xs text-white">
                            {produit.attributes.PreviewDescription ||
                              'Titre manquant'}
                          </p>
                        </div>
                        <h2 className="font-bold  text-right xs:text-sm md:text-base">
                          {' '}
                          {produit.attributes.prix
                            ? `${produit.attributes.prix.toLocaleString(
                                'fr-FR'
                              )}€`
                            : 'Prix non disponible'}
                        </h2>
                      </div>

                      <SeeMoreButton
                        buttonText="Voir plus"
                        additionalStyles={{ fontSize: '15px' }}
                        onClick={() => handleDetailsClick(produit.id)} 
                      />
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GlobalProduct
