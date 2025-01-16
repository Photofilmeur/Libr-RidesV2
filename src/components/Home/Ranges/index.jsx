import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RangeImgOne from '../../../assets/images/Accueil/IMG_Route.webp'
import RangeImgTwo from '../../../assets/images/Accueil/IMG_Cross.webp'
import RangeImgThree from '../../../assets/images/Accueil/IMG_Quad.webp'
import SeeMoreButton from '../../designLayouts/buttons/SeeMoreButton'

const Ranges = ({ setIsLoading }) => {
  const navigate = useNavigate()

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

    const loadImages = async () => {
      try {
        timer = setTimeout(() => {
          setIsLoading(true)
        }, 500)

        await Promise.all([
          loadImage(RangeImgOne),
          loadImage(RangeImgTwo),
          loadImage(RangeImgThree),
        ])

        clearTimeout(timer)
        setIsLoading(false)
      } catch (error) {
        console.error('Erreur lors du chargement des images:', error)
        clearTimeout(timer)
        setIsLoading(false)
      }
    }

    loadImages()

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [setIsLoading])

  const rangesData = [
    {
      id: 1,
      imgSrc: RangeImgOne,
      title: 'Routières',
      discount: '-10%',
      description: 'sur toutes nos routières',
      link: '/Product/Route',
      handleClick: () => {
        navigate('/Product/Route')
        window.scrollTo(0, 0)
      },
      minHeight: '41rem',
      titleClass: 'text-4xl md:text-5xl lg:text-5xl',
      descriptionClass: 'font-title text-lg md:text-xl lg:text-2xl',
    },
    {
      id: 2,
      imgSrc: RangeImgTwo,
      title: 'Cross',
      discount: '-15%',
      description: 'sur une sélection de modèles',
      link: '/Product/Cross',
      handleClick: () => {
        navigate('/Product/Cross')
        window.scrollTo(0, 0)
      },
      minHeight: '20rem',
      titleClass: 'text-2xl md:text-3xl lg:text-3xl',
      descriptionClass: 'font-title text-base md:text-lg lg:text-xl',
    },
    {
      id: 3,
      imgSrc: RangeImgThree,
      title: 'Quads',
      discount: '-30%',
      description: 'sur tous nos quads',
      link: '/Product/Quads',
      handleClick: () => {
        navigate('/Product/Quads')
        window.scrollTo(0, 0)
      },
      minHeight: '20rem',
      titleClass: 'text-2xl md:text-3xl lg:text-3xl',
      descriptionClass: 'font-title text-base md:text-lg lg:text-xl',
    },
  ]

  return (
    <div className="py-20  flex flex-col md:flex-row items-start justify-between gap-4 lg:gap-10">
      {/* Affichage du premier rangeData à gauche */}
      <div
        className="flex flex-col justify-end items-center text-white w-full md:w-1/2 lg:w-2/3"
        style={{
          backgroundImage: `url(${rangesData[0].imgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: rangesData[0].minHeight,
        }}
      >
        <div className="text-left w-full mx-4 mt-8 md:mt-0">
          <div className="mx-8">
            <h2
              className={`${rangesData[0].titleClass} font-title font-bold mb-6`}
            >
              {rangesData[0].title}
            </h2>
            <p className={`${rangesData[0].descriptionClass} mb-6`}>
              Jusqu'à{' '}
              <span className="text-4xl md:text-5xl lg:text-5xl font-bold">
                {rangesData[0].discount}
              </span>{' '}
              {rangesData[0].description}
            </p>
            <div className="mb-8">
              <SeeMoreButton onClick={rangesData[0].handleClick} />
            </div>
          </div>
        </div>
      </div>

      {/* Affichage des autres rangeData à droite */}
      <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
        {rangesData.slice(1).map((range) => (
          <div
            key={range.id}
            className={`flex flex-col justify-end items-center text-white w-full`}
            style={{
              backgroundImage: `url(${range.imgSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: range.minHeight,
              marginTop: range.id === 3 ? '1rem' : '0', // Appliquer la marge uniquement à la carte 3
            }}
          >
            <div className="text-left w-full mx-4 mt-8 md:mt-0">
              <div className="mx-8">
                <h2 className={`${range.titleClass} font-title font-bold `}>
                  {range.title}
                </h2>
                <p className={`${range.descriptionClass} mb-5`}>
                  Jusqu'à{' '}
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    {range.discount}
                  </span>{' '}
                  {range.description}
                </p>
                <div className="mb-8">
                  <SeeMoreButton onClick={range.handleClick} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ranges
