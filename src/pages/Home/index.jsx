import React, { useEffect, useState } from 'react';
import Banner from '../../components/Home/Banner/Banner';
import Ranges from '../../components/Home/Ranges';
import Secondhand from '../../components/Home/Secondhand';
import Footer from '../../components/Footer/index';
import AccueilLoader from '../../components/designLayouts/Loaders/AccueilLoader';
import AccueilAnimation from '../../components/designLayouts/AccueilAnimation';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBanner, setIsLoadingBanner] = useState(false);
  const [isLoadingRanges, setIsLoadingRanges] = useState(false);
  const [isLoadingSecondhand, setIsLoadingSecondhand] = useState(false);
  const [showAccueilAnimation, setShowAccueilAnimation] = useState(false);

  useEffect(() => {
    let loadingTimeout;

    if (isLoadingBanner || isLoadingRanges || isLoadingSecondhand) {
      loadingTimeout = setTimeout(() => {
        setIsLoading(true);
      }, 500); 
    } else {
      setIsLoading(false);
    }


    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [isLoadingBanner, isLoadingRanges, isLoadingSecondhand]);

  useEffect(() => {
    let animationTimeout;
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      setShowAccueilAnimation(true);
      sessionStorage.setItem('hasVisited', 'true');
      animationTimeout = setTimeout(() => {
        setShowAccueilAnimation(false);
      }, 3000);
    }

    return () => {
      clearTimeout(animationTimeout);
    };
  }, []);

  return (
    <div className="w-full mx-auto">
      {showAccueilAnimation && <AccueilAnimation />}
      {!showAccueilAnimation && isLoading && <AccueilLoader />}
      <div className={showAccueilAnimation || isLoading ? 'hidden' : ''}>
        <Banner
          className="absolute top-0 left-0 w-full"
          setIsLoading={setIsLoadingBanner}
        />
        <div className="max-w-container mx-auto px-4">
          <Ranges setIsLoading={setIsLoadingRanges} />
          <Secondhand setIsLoading={setIsLoadingSecondhand} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
