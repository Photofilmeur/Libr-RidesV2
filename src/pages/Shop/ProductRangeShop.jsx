import React, { useState, useEffect } from 'react'
import {styled, StyleSheetManager }  from 'styled-components'
import SeeMoreButton from '../../components/designLayouts/buttons/SeeMoreButton'
import RangeCross from '../../assets/images/RangeProduct/RangeCross.webp'
import RangeRoute from '../../assets/images/RangeProduct/RangeRoadster.webp'
import RangeQuad from '../../assets/images/RangeProduct/RangeQuad.webp'
import { Link } from 'react-router-dom'
import ProductRangeLoader from '../../components/designLayouts/Loaders/ProductRangeLoader/ProductRangeLoader'

const GalleryContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 85rem;
  height: 80vh;
  margin-top: 5vh;
  gap-0;

  

  @media (max-width: 1370px) {
    width: 75rem;
    height: 80vh;
  }

  @media (max-width: 1025px) {
    flex-direction: column;
    width: 100vh;
  }
`

const Card = styled.figure`
;
  overflow: hidden;
  transition: .8s ease-in-out;
  box-shadow: 0 5px 12px rgba(0, 0, 0, .3);
  flex: ${({ isActive }) => (isActive ? '1 1 0' : '.15')};
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  filter: ${({ isActive }) =>
    isActive ? 'grayscale(0%) saturate(120%)' : 'grayscale(100%)'};

@media (max-width: 1025px) {
  border-radius: 0;
}

  }
`

const CardImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: brightness(0.7);
`

const ContainerTextOn = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  text-align: left;
  transform: translateY(${({ isActive }) => (isActive ? '0' : '500%')});
  opacity: ${({ isActive }) => (isActive ? '1' : '0')};
  overflow: hidden;

  transition: transform 0.8s ease-in-out, opacity 0.6s ease-in-out;
`

const ContainerTextOff = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
  font-weight: bold;
  margin-bottom: 4rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  text-align: left;
  transform: rotate(-90deg);

  @media (max-width: 1025px) {
    opacity: ${({ isActive }) => (isActive ? '0' : '1')};
    overflow: hidden;

    transition: ${({ isActive }) =>
      isActive
        ? 'opacity 0.2s ease-in-out 0.3s '
        : 'opacity 0.1s ease-in-out 0.3s'};

    transform: rotate(0deg);
    margin-bottom: 0.5rem;
  }
`

function ProductRangeShop() {
  const [activeCard, setActiveCard] = useState(1);
  const [imagesLoading, setImagesLoading] = useState(false);

  const images = [RangeRoute, RangeCross, RangeQuad];
  const loadingTimeout = 1000; 

  useEffect(() => {
    let timer; 

    
    const startTimer = () => {
      timer = setTimeout(() => {
        setImagesLoading(true);
      }, loadingTimeout);
    };

    // Chargement des images
    const loadImages = () => {
      const imagePromises = images.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          clearTimeout(timer); 
          setImagesLoading(false); 
        })
        .catch((error) => {
          console.error('Erreur lors du chargement des images:', error);
          clearTimeout(timer); 
          setImagesLoading(false); 
        });
    };

    startTimer();
    loadImages();

    return () => clearTimeout(timer);
  }, []);

  return (
    // stylesheetmanager pour gérer les props non reconnu qui sont envoyé au DOM
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'isActive'}>
      { imagesLoading ? (
        <ProductRangeLoader />
      ) : (
    <div className="flex justify-center items-center h-full w-full mt-20">
      <GalleryContainer>
        <Card
          className="rounded-r-none rounded-3xl"
          isActive={activeCard === 1}
          onClick={() => setActiveCard(1)}
        >
          <CardImage src={RangeRoute} alt="Motos de Route" />

          <div className="text-left w-full mx-4 mt-8 md:mt-0">
            <ContainerTextOn isActive={activeCard === 1}>
              <h2 className="font-body text-lg md:text-2xl lg:text-4xl mb-6  ">
                Routières
              </h2>
              <p className="font-title text-lg md:text-lg lg:text-xl mb-6">
              Toute notre gamme de motos à partir du permis A2.
              </p>
              <div className="mb-8 w-40">
                <Link to="/Product/Route">
                  <SeeMoreButton />
                </Link>
              </div>
            </ContainerTextOn>

            <ContainerTextOff isActive={activeCard === 1}>
              <h2 className="font-body text-lg md:text-2xl lg:text-4xl mb-6">
                Routières
              </h2>
            </ContainerTextOff>
          </div>
        </Card>
        <Card
          className="card"
          isActive={activeCard === 2}
          onClick={() => setActiveCard(2)}
        >
          <CardImage src={RangeCross} alt="Motos Cross" />
          <div className="text-left w-full mx-4 mt-8 md:mt-0">
            <ContainerTextOn isActive={activeCard === 2}>
              <h2 className="font-body text-lg md:text-2xl lg:text-4xl mb-6  ">Cross & Enduro</h2>
              <p className="font-title text-lg md:text-lg lg:text-xl mb-6">
              Toute notre gamme motos tout terrain, du cross à l'enduro.
              </p>
              <div className="mb-8 w-40">
                <Link to="/Product/Cross">
                  <SeeMoreButton />
                </Link>
              </div>
            </ContainerTextOn>

            <ContainerTextOff isActive={activeCard === 2}>
              <h2 className="font-body text-lg md:text-2xl lg:text-4xl mb-6">Cross&nbsp;&amp;&nbsp;Enduro</h2>
            </ContainerTextOff>
          </div>
        </Card>

        <Card
          className="card rounded-l-none rounded-3xl"
          isActive={activeCard === 3}
          onClick={() => setActiveCard(3)}
        >
          <CardImage src={RangeQuad} alt="Quads" />
          <div className="text-left w-full mx-4 mt-8 md:mt-0">
            <ContainerTextOn isActive={activeCard === 3}>
              <h2 className="font-body text-lg md:text-2xl lg:text-4xl mb-6">Quads & ATV</h2>
              <p className="font-title text-lg md:text-lg lg:text-xl mb-6">
              Découvrez notre gamme de quads, de 700 à 1200cc.
              </p>
              <div className="mb-8 w-40">
                <Link to="/Product/Quads">
                  <SeeMoreButton />
                </Link>
              </div>
            </ContainerTextOn>

            <ContainerTextOff isActive={activeCard === 3}>
              <h2 className="font-body text-lg md:text-2xl lg:text-4xl mb-6">Quads&nbsp;&amp;&nbsp;ATV</h2>
            </ContainerTextOff>
          </div>
        </Card>
      </GalleryContainer>
    </div>
    )}
    </StyleSheetManager>
  )
}

export default ProductRangeShop
