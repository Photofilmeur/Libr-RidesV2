import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import SeeMoreButton from '../../designLayouts/buttons/SeeMoreButton'
import RoadAccueil from '../../../assets/images/Accueil/banner/RoadAccueil.webp'
import CrossAccueil from '../../../assets/images/Accueil/banner/CrossAccueil.webp'
import QuadAccueil from '../../../assets/images/Accueil/banner/QuadAccueil.webp'
import ImageComponent from '../../designLayouts/Image'
import Global from '../../../assets/MotoGlobal.webm'
import Route from '../../../assets/Route.webm'
import Cross from '../../../assets/Cross.webm'
import Quad from '../../../assets/Quad.webm'

const CustomSlide = ({
  Subtext,
  imgSrc,
  className,
  videoSrc,
  text,
  buttonLink,
  onVideoLoad,
  onImageLoad,
  onVideoLoadStart,
  onImageLoadStart,
}) => (
  <div className='flex items-center justify-center lgl:justify-between  '
    style={{
      position: 'relative',
      overflow: 'hidden',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
    }}
  >
    <video
      autoPlay
      muted
      loop
      playsInline
      onLoadedData={onVideoLoad}
      onLoadStart={onVideoLoadStart}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: '-1',
        filter: 'brightness(0.5)',
      }}
    >
      <source src={videoSrc} />
    </video>

    <div
      className="flex flex-col xs:text-center md:text-start lgl:ml-40 lgl:w-2/4 w-3/4 "

    >
      <h2 className="mb-4 md:mb-8 text-3xl md:text-4xl lg:text-5xl font-title font-bold text-white">
        {text}
      </h2>
      <p
        className="font-body font-light text-white text-lg sm:text-xl lg:text-2xl mb-8 "
      >
        {Subtext}
      </p>

      <Link to={buttonLink}>
        <SeeMoreButton />
      </Link>
    </div>

    <div className=" h-auto w-1/3  hidden lgl:block overflow-hidden mr-5 xl:mr-20 ">
      <ImageComponent
        className={" object-cover w-full h-full"}
        imgSrc={imgSrc}
        onLoad={onImageLoad}
        onLoadStart={onImageLoadStart}
      />
    </div>
  </div>
)

const Banner = ({ setIsLoading }) => {
  const [dotActive, setDocActive] = useState(0)

  const handleLoadVideo = () => {
    setIsLoading(false)
  }

  const handleLoadImage = () => {
    setIsLoading(false)
  }

  const handleVideoLoadStart = () => {
    setIsLoading(true)
  }

  const handleImageLoadStart = () => {
    setIsLoading(true)
  }

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next)
    },
    appendDots: (dots) => (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '3%',
          transform: 'translateY(-50%)',
        }}
      >
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: '30px',
                color: '#b81717',
                borderRight: '3px #262626 solid',
                padding: '8px 0',
                cursor: 'pointer',
              }
            : {
                width: '30px',
                color: 'transparent',
                borderRight: '3px white solid',
                padding: '8px 0',
                cursor: 'pointer',
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 960,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '1%',
                transform: 'translateY(-50%)',
              }}
            >
              <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: '25px',
                      color: '#b81717',
                      borderRight: '3px #262626 solid',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }
                  : {
                      width: '25px',
                      color: 'transparent',
                      borderRight: '3px white solid',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  }

  const slides = [
    {
      videoSrc: Global,
      text: "Libr'Rides ",
      Subtext: 'Constructeur et revendeur de motos, quads et ATV. ',
      buttonLink: '/AboutUs',
    },
    {
      videoSrc: Route,
      imgSrc: RoadAccueil,
      text: '1000Lrs',
      Subtext:
        "Plongez dans l'univers de la performance avec la Libr'RoadSport.",
      buttonLink: '/Product/Route/44',
    },
    {
      videoSrc: Cross,
      imgSrc: CrossAccueil,
      text: '250Lc',
      Subtext:
        "Découvrez la nouvelle référence de la gamme Libr'Cross, la 250Lc.",
      buttonLink: '/Product/Cross/50',
    },
    {
      videoSrc: Quad,
      imgSrc: QuadAccueil,
      text: '1200Lq',
      Subtext:
        "Le condensé du savoir de Libr'Rides. Un des quads les plus puissants et agiles de la gamme Libr'ATV",
      buttonLink: '/Product/Quads/62',
    },
  ]

  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide
            key={index}
            {...slide}
            onVideoLoad={handleLoadVideo}
            onImageLoad={handleLoadImage}
            onVideoLoadStart={handleVideoLoadStart}
            onImageLoadStart={handleImageLoadStart}
          />
        ))}
      </Slider>
    </div>
  )
}

export default Banner
