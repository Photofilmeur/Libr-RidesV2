import React, { useState } from 'react'
import LireSuiteButton from '../../components/designLayouts/buttons/LireSuite'
import background from '../../assets/IMG-Secondhand/BgImg.webp' 

function SecondhandPage({ classAdditional = 'h-full' }) {
  // Valeur par défaut h-full
  const [showMore, setShowMore] = useState(false)

  const handleToogle = () => {
    setShowMore(!showMore)
  }

  return (
      <div
        className={`relative flex flex-col items-center justify-center ${classAdditional} text-white p-6`}
      >
        {/* Image de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${background})`,
            filter: 'brightness(0.45)', 
            zIndex: '10', 
          }}
        ></div>

        <div className="text-center space-y-6 relative z-10 ">
          {/* Titre principal */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl  font-semibold font-title mt-4">
            ARRIVE BIENTÔT
          </h2>

          {/* Sous-titre et description */}
          <p className="mt-4 font-body text-base sm:text-lg md:text-xl  px-4 max-w-lg mx-auto">
            Nous sommes ravis d'annoncer l'arrivée prochaine d'une toute
            nouvelle fonctionnalité : un espace dédié à l'achat et la vente de
            motos & ATV d'occasion Libr'Ride.
          </p>

         
          <p
            className={`mt-2 font-body text-base sm:text-lg md:text-xl  px-4 max-w-lg mx-auto transition-all duration-500 ease-in-out transform ${
              showMore ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {showMore && (
              <>
                La gestion des ventes sera directement assurée par Libr'Ride :
                les propriétaires pourront vendre leur véhicule à la marque, qui
                l'ajoutera ensuite à notre catalogue d'occasions. Une fois le
                véhicule acheté, elle sera livrée directement chez vous,
                assurant une transaction simple et fiable.
              </>
            )}
          </p>
        </div>

        {/* Section Flèche */}
        <div
          className={`flex justify-center items-center ${
            showMore ? 'mt-10' : 'mt-2'
          } w-full relative z-10`}
        >
          <LireSuiteButton onClick={handleToogle} />
        </div>
      </div>
  )
}

export default SecondhandPage
