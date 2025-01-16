import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import qs from 'qs'
import CartButton from '../designLayouts/buttons/AddCart/index'
import { API_URL } from '../../constants/ConfigAPI'

function Accueil({ setIsLoading }) {
  const { id } = useParams()
  const [produit, setProduit] = useState(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [background, setBackground] = useState('')

  const query = qs.stringify(
    {
      fields: ['DetailTitre'],
      populate: {
        FirstIllustrationImage: {
          fields: ['name', 'url', 'alternativeText'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  useEffect(() => {
    let timer

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        setIsLoading(true)
        img.onload = () => {
          resolve()
          setIsImageLoaded(true)
          setIsLoading(false)
        }
        img.onerror = () => {
          reject()
          setIsLoading(false)
        }
      })
    }

    const fetchProduitAndImage = async () => {
      try {
        timer = setTimeout(() => {
          setIsLoading(true)
        }, 500)

        const res = await fetch(`${API_URL}/api/produits/${id}?${query}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })

        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`)
        }

        const response = await res.json()
        const produitData = response.data
        setProduit(produitData)

        // Charge l'image du produit
        const imageSrc = `${API_URL}${produitData.attributes.FirstIllustrationImage.data.attributes.url}`
        await loadImage(imageSrc)
        setBackground(imageSrc)

        clearTimeout(timer)
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données AccueilDetails',
          error
        )
      } finally {
        clearTimeout(timer)
        setIsLoading(false)
      }
    }

    fetchProduitAndImage()

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [id, query, setIsLoading])

  if (!produit) {
    return null
  }

  return (
    <div
      className="h-screen w-full"
      style={{
        backgroundImage: isImageLoaded ? `url(${background})` : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="h-full w-auto text-center flex flex-col justify-center items-center lgl:items-start h-full pt-60 lgl:pl-20">
        <div className="font-title font-bold text-black text-4xl md:text-5xl lgl:text-6xl bg-gray-300 bg-opacity-50 lgl:mb-8 md:mb-5 mb-3 p-3 rounded-lg">
          {produit.attributes.DetailTitre}
        </div>
        <div>
          <CartButton produit={produit} />
        </div>
      </div>
    </div>
  )
}

export default Accueil
