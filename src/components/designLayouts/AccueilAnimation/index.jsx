import React, { useState, useEffect } from 'react'
import './style.css'
import logo from '../../../assets/images/logo.webp'

const Animation = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = logo

    img.onload = () => {
      setIsLoaded(true)
    }
  }, [])

  return (
    <div className="animation-container relative flex items-center justify-center h-screen bg-black">
      {isLoaded ? (
        <>
          {/* Conteneur pour le logo et le cercle */}
          <div className="relative flex items-center justify-center w-32 h-32 animate-moveLogo">
            {/* Cercle blanc autour du logo */}
            <div className="circle bg-white rounded-full absolute w-32 h-32 animate-circleScale"></div>

            {/* Logo */}
            <img
              src={logo}
              alt="Logo Libr' Rides"
              className="logo absolute w-4/5 h-auto animate-logoFade"
            />
          </div>

          {/* Masque pour le texte, centré sur l'écran */}
          <div className="text-mask-container flex justify-center items-center absolute w-auto">
            <div className="text-mask overflow-hidden">
              <h2 className="text-white text-4xl font-title font-bold">
                <span className="animate-textSlideUp1">Libr'</span>
                <span className="animate-textSlideUp2"> Rides</span>
              </h2>
            </div>
          </div>
        </>
      ) : (
        // Fond noir uniquement pendant le chargement
        <div className="bg-black w-full h-full"></div>
      )}
    </div>
  )
}

export default Animation
