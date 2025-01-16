import React, { useState } from 'react'
import { motion } from 'framer-motion'
import FooterListTitle from './FooterListTitle'
import paymentCard from '../../assets/images/payment.webp'
import ImageComponent from '../designLayouts/Image'
import SocialButton from './SocialButton'

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState('')
  const [subscription, setSubscription] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)
  }

  const handleSubscription = () => {
    if (emailInfo === '') {
      setErrMsg('Veuillez fournir un e-mail !')
    } else if (!emailValidation(emailInfo)) {
      setErrMsg('Veuillez fournir un e-mail valide !')
    } else {
      setSubscription(true)
      setErrMsg('')
      setEmailInfo('')
    }
  }
  return (
    <div className="w-full bg-[#F5F5F3] py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <FooterListTitle title="Découvrez encore plus sur Libr'Rides" />
          <div className="flex flex-col gap-6">
            <p className="font-title text-base w-full xl:w-[80%]">
              votre destination pour des motos neuves et d'occasion de qualité.
            </p>
            <div>
              <SocialButton />
            </div>
          </div>
        </div>
        <div>
          <FooterListTitle title="Produits" />
          <ul className="flex flex-col gap-2">
            <a
              href="/Product/Route"
              className="font-body text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
            >
              Route
            </a>

            <a
              href="/Product/Cross"
              className="font-body text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
            >
              Cross
            </a>
            <a
              href="/Product/Quads"
              className="font-body text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
            >
              ATV
            </a>
            <a
              href="/Occasion"
              className="font-body text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
            >
              Occasion
            </a>
          </ul>
        </div>
        <div>
          <FooterListTitle title="Univers" />
          <ul className="flex flex-col gap-2">
            <a
              href="/AboutUs"
              className="font-body text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
            >
              La marque
            </a>
            <a
              href="/AboutUs#contact-section"
              className="font-body text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
            >
              Contact & Adresse
            </a>
          </ul>
        </div>
        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <FooterListTitle title="Inscrivez-vous à notre newsletter." />
          <div className="w-full">
            <p className="font-title text-center mb-4">
              Recevez nos dernières nouveautés par e-mail en vous inscrivant à
              notre newsletter
            </p>
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-title font-semibold text-green-600"
              >
                Abonnement réussi !
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Insérez votre e-mail ...*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-white text-lightText w-[30%] h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide"
                >
                  S'inscrire
                </button>
              </div>
            )}

            <ImageComponent
              className={`w-[80%] lg:w-[60%] mx-auto ${
                subscription ? 'mt-2' : 'mt-6'
              }`}
              imgSrc={paymentCard}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
