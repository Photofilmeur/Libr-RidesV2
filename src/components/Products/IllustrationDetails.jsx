import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import qs from 'qs'
import Slider from 'react-slick'
import { API_URL } from '../../constants/ConfigAPI'

function Illustration({ setIsLoading }) {
  const { id } = useParams()
  const [produit, setProduit] = useState(null)
  const [dotActive, setDotActive] = useState(0)
  const [dots, setDots] = useState(true)

  const query = qs.stringify(
    {
      populate: {
        IllustrationImage: {
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
        img.onload = resolve
        img.onerror = reject
      })
    }

    const fetchData = async () => {
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

        // Charger toutes les images
        if (
          produitData.attributes &&
          produitData.attributes.IllustrationImage &&
          produitData.attributes.IllustrationImage.data
        ) {
          const imagePromises =
            produitData.attributes.IllustrationImage.data.map((image) =>
              loadImage(`${API_URL}${image.attributes.url}`)
            )
          await Promise.all(imagePromises)

          const hasMultipleImages =
            produitData.attributes.IllustrationImage.data.length > 1
          setDots(hasMultipleImages)
        } else {
          console.warn('IllustrationImage data is missing')
        }

        clearTimeout(timer)
        setIsLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération des données IllustrationDetails:', error)
        clearTimeout(timer)
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [id, query, setIsLoading])

  if (!produit) {
    return null
  }

  if (
    !produit.attributes ||
    !produit.attributes.IllustrationImage ||
    !produit.attributes.IllustrationImage.data ||
    produit.attributes.IllustrationImage.data.length === 0
  ) {
    console.warn("Pas d'images disponible")
    return null
  }

  const settings = {
    dots,
    infinite: produit.attributes.IllustrationImage.data.length > 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true,
    height: '100vh',
    beforeChange: (prev, next) => {
      setDotActive(next)
    },
    appendDots: (dots) => (
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translatex(-50%)',
        }}
      >
        <ul
          style={{
            margin: '0px',
            padding: '0px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: '15px',
                height: '2px',
                backgroundColor: '#b81717',
                margin: '0 5px',
                cursor: 'pointer',
              }
            : {
                width: '15px',
                height: '2px',
                backgroundColor: 'white',
                margin: '0 5px',
                cursor: 'pointer',
              }
        }
      ></div>
    ),
  }

  return (
    <div className="w-full h-full">
      <Slider {...settings}>
        {produit.attributes.IllustrationImage.data.map((image, index) => (
          <div key={index}>
            <img
              className="w-full max-h-[650px] object-cover"
              src={`${API_URL}${image.attributes.url}`}
              alt={image.attributes.alternativeText}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Illustration
