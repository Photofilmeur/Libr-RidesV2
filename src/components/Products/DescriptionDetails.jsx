import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import qs from 'qs'
import Slider from 'react-slick'
import { NextArrow, PreviousArrow } from '../designLayouts/buttons/CustomArrows'
import { API_URL } from '../../constants/ConfigAPI'

function Details({ setIsLoading }) {
  const { id } = useParams()
  const [produit, setProduit] = useState(null)
  const [dots, setDots] = useState(false)
  const [dotActive, setDotActive] = useState(0)
  const [arrows, setArrows] = useState(true)

  const backgroundRadial = {
    background:
      'radial-gradient(circle, rgba(66,66,66,1) 4%, rgba(29,29,29,1) 100%)',
  }

  const query = qs.stringify(
    {
      fields: ['titre', 'prix', 'DetailDescription'],
      populate: {
        DetailImage: {
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
        const imagePromises = produitData.attributes.DetailImage.data.map(
          (image) => loadImage(`${API_URL}${image.attributes.url}`)
        )
        await Promise.all(imagePromises)

        clearTimeout(timer)
        setIsLoading(false)
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données DescriptionDetails:',
          error
        )
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

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      const hasMultipleImages = produit
        ? produit.attributes.DetailImage.data.length > 1
        : true
      setDots(screenWidth < 1280 && hasMultipleImages)
      setArrows(screenWidth >= 1280 && hasMultipleImages)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [produit])

  if (!produit) {
    return null
  }
  const settings = {
    dots,
    arrows,
    infinite: produit.attributes.DetailImage.data.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
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
                width: '10px',
                height: '3px',
                backgroundColor: '#b81717',
                margin: '0 3px',
                cursor: 'pointer',
              }
            : {
                width: '10px',
                height: '2px',
                backgroundColor: 'white',
                margin: '0 3px',
                cursor: 'pointer',
              }
        }
      ></div>
    ),
  }

  return (
    <div className="min-h-screen" style={backgroundRadial}>
      <div className="w-full h-full p-0 xl:pl-40 xl:pr-5 xl:pt-20 pt-10 flex flex-col justify-center items-center">
        {/* Section titre et prix */}
        <div className="w-full flex flex-col xl:flex-row items-center xl:items-start text-white p-4 border-b border-red-500 xl:border-b-0">
          <div className="flex flex-col items-center xl:items-start xl:mr-8">
            <div className="font-title font-bold text-4xl xl:text-7xl text-center xl:text-left mt-8 xl:mt-0 mb-0 xl:mb-2">
              {produit.attributes.titre}
            </div>
            <div className="text-sm xl:text-sml text-red-600 text-center xl:text-left">
              {`À partir de ${produit.attributes.prix.toLocaleString(
                'fr-FR'
              )}€`}
            </div>
          </div>
        </div>

        {/* Section images et description */}
        <div className="flex flex-col justify-end gap-8 xl:flex-row w-full h-full ">
          {/* images */}
          <div className="order-1 xl:order-2 flex flex-col justify-center w-full xl:w-3/5">
            <Slider {...settings}>
              {produit.attributes.DetailImage.data.map((image, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center h-full"
                >
                  <img
                    className="w-4/4 md:w-2/4 xl:w-3/4  h-auto mx-auto object-contain flex justify-center"
                    src={`${API_URL}${image.attributes.url}`}
                    alt={image.attributes.alternativeText}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* description */}
          <div className="order-2 xl:order-1 flex flex-col items-center xl:items-start text-white text-base xl:text-lg p-4 xl:mr-8 xl:border-t border-red-500 xl:w-2/5">
            {produit.attributes.DetailDescription}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
