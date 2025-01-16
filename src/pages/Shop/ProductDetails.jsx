import React, { useEffect, useState } from 'react'
import Description from '../../components/Products/DescriptionDetails.jsx'
import Footer from '../../components/Footer/index'
import Illustration from '../../components/Products/IllustrationDetails.jsx'
import Accueil from '../../components/Products/AccueilDetails.jsx'
import FicheTechnique from '../../components/Products/FicheTechniqueDetails.jsx'
import AccueilLoader from '../../components/designLayouts/Loaders/AccueilLoader/index.jsx'

function ProductDetailsPage() {
  const [isLoading, setIsLoading] = useState(false) // Indicateur global de chargement
  const [isLoadingAccueil, setIsLoadingAccueil] = useState(false)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [isLoadingIllustration, setIsLoadingIllustration] = useState(false)
  const [isLoadingFicheTechnique, setIsLoadingFicheTechnique] = useState(false)
  const [showFooter, setShowFooter] = useState(false) // Nouvel état pour le Footer

  useEffect(() => {
    let loadingTimeout;

 
    if (
      isLoadingAccueil ||
      isLoadingDetails ||
      isLoadingIllustration ||
      isLoadingFicheTechnique
    ) {
      loadingTimeout = setTimeout(() => {
        setIsLoading(true);
      }, 500);
    } else {
      setIsLoading(false); 
    }

   
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [
    isLoadingAccueil,
    isLoadingDetails,
    isLoadingIllustration,
    isLoadingFicheTechnique
  ]);

  // Retarder l'affichage du Footer de 500ms
  useEffect(() => {
    const footerTimeout = setTimeout(() => {
      setShowFooter(true);
    }, 500);

    return () => {
      clearTimeout(footerTimeout); 
    };
  }, []); 

  return (
    <div className="w-full mx-auto">
      {isLoading && <AccueilLoader />} 
      <div style={{ display: isLoading ? 'none' : 'block' }}>
        <Accueil setIsLoading={setIsLoadingAccueil} />
        <Description setIsLoading={setIsLoadingDetails} />
        <Illustration setIsLoading={setIsLoadingIllustration} />
        <FicheTechnique setIsLoading={setIsLoadingFicheTechnique} />
        {showFooter && <Footer />} 
      </div>
    </div>
  )
}

export default ProductDetailsPage
