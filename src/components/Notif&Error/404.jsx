import React from "react";
import { useNavigate } from "react-router-dom"; // Import du hook useNavigate
import errorLogo from '../../assets/404-error.webp';
import ReturnButton from '../designLayouts/buttons/SeeMoreButton';
import errorImg from '../../assets/errorImg.webp';

function Error() {
  const navigate = useNavigate(); // Initialisation de useNavigate

  // Fonction pour rediriger vers la page d'accueil
  const goToHome = () => {
    navigate("/"); // Redirection vers la page d'accueil
  };

  return (
    <div 
      className="h-screen flex items-center justify-center bg-gray-50 md:pt-5 pt-10" 
      style={{
        backgroundImage: `url(${errorImg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col md:flex-row items-center md:justify-start lg:justify-center lg:space-x-20 md:space-x-10">
        {/* Section Texte */}
        <div className="order-2 md:order-1 flex flex-col md:items-start text-center md:text-start space-y-5 md:ml-10 lg:w-1/3 md:w-3/4 xs:w-80">
          <h2 className="font-title mt-4 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">Page introuvable</h2>
          <p className="font-body mt-6 text-pretty text-lg font-medium text-gray-200 md:text-xl/8">
            Désolé, la page que vous avez demandée est introuvable.
          </p>
          <ReturnButton
            additionalStyles={{
              fontWeight: '400',
            }}
            buttonText="Accueil"
            onClick={goToHome} // Ajout de la fonction goToHome à l'événement onClick
          />
        </div>

        {/* Section Image */}
        <div className="order-1 md:order-2 lg:w-1/3 md:w-2/3 xs:w-80">
          <img
            className="w-full "
            src={errorLogo}
            alt="Animation error 404"
          />
        </div>
      </div>
    </div>
  );
}

export default Error;
