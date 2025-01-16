import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchInfoUser } from './InfoUserApi'
import { API_URL } from '../../../constants/ConfigAPI'
import PersonalInfo from './PersonalInfo'
import ShoppingCart from '../../Cart/index'
import DefaultAvatar from '../../../assets/images/User.webp'
import HeaderBottomMyAccount from '../../Header/HeaderBottomMyAccount'
import OrderCart from '../../designLayouts/buttons/OrderCart'
import CartLoader from '../../designLayouts/Loaders/CartLoader'
import InfoPersoLoader from '../../designLayouts/Loaders/InfoPersoLoader'
import SecondhandPage from '../../Secondhand'
import OrderHistory from './OrderHistory'
import BillingPayments from './BillingPayments'

const MyAccount = ({ setIsLoadingPage }) => {
  const [selectedSection, setSelectedSection] = useState('personal-info')
  const [userData, setUserData] = useState(null)
  const [loadingPage, setLoadingPage] = useState(true)
  const [avatarLoading, setAvatarLoading] = useState(true)
  const [isLoadingCart, setIsLoadingCart] = useState(false)
  const [onTotalUpdate, setOnTotalUpdate] = useState(null)
  const [loadingCartSection, setLoadingCartSection] = useState(false)
  const [loadingInfoPersoSection, setLoadingInfoPersoSection] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [EmptyCart, setEmptyCart] = useState(false)
  const navigate = useNavigate()

  const handleAvatarLoad = () => {
    setAvatarLoading(false)
  }

  useEffect(() => {
    let loadingPageTimeout

    if (loadingPage || avatarLoading) {
      loadingPageTimeout = setTimeout(() => {
        if (loadingPage || avatarLoading) {
          setIsLoadingPage(true)
        }
      }, 100)
    } else {
      setIsLoadingPage(false)
    }

    return () => {
      clearTimeout(loadingPageTimeout)
    }
  }, [loadingPage, avatarLoading, setIsLoadingPage])

  useEffect(() => {
    let loadingTimeout

    if (isLoadingCart || dataLoading) {
      loadingTimeout = setTimeout(() => {
        setLoadingCartSection(true)
      }, 500)
    } else {
      setLoadingCartSection(false)
    }

    return () => {
      clearTimeout(loadingTimeout)
    }
  }, [isLoadingCart, dataLoading])

  useEffect(() => {
    let loadingTimeout

    if (dataLoading) {
      loadingTimeout = setTimeout(() => {
        setLoadingInfoPersoSection(true)
      }, 500)
    } else {
      setLoadingInfoPersoSection(false)
    }

    return () => {
      clearTimeout(loadingTimeout)
    }
  }, [dataLoading])

  useEffect(() => {
    fetchInfoUser(setDataLoading)
      .then((data) => {
        setUserData(data)
        setLoadingPage(false)
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la récupération des données utilisateur: MyAccount :',
          error
        )
        setLoadingPage(false)
      })
  }, [])

  const updateUserData = (updatedData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...updatedData,
    }))
  }

  const updateImage = (success) => {
    if (success) {
      setTimeout(() => {
        window.location.reload()
      }, 2500)
    }
  }

  if (loadingPage) {
    return null
  }

  const handleCartRedirect = () => {
    navigate('/Panier')
  }

  const renderSection = () => {
    switch (selectedSection) {
      case 'personal-info':
        return (
          <div className='w-full bg-gray-100 mx-auto sm:p-4 xs:py-4'>
            {loadingInfoPersoSection && <InfoPersoLoader />}
            <div className={loadingInfoPersoSection ? 'hidden' : ''}>
              <PersonalInfo
                userData={userData}
                onSave={updateUserData}
                onSaveImage={updateImage}
              />
            </div>
          </div>
        )
      case 'billing-payments':
        return (
          <div className="w-full bg-gray-100 mx-auto sm:p-4 xs:py-4 ">
            <h2 className='w-auto text-2xl font-title font-black text-start pb-10 font-semibold flex flex-col items-center mdl:items-start'>Panier</h2>
            <BillingPayments />
          </div>
        )
      case 'order-history':
        return <div className='w-full bg-gray-100 mx-auto sm:p-4 xs:py-4'>
          <h2 className='w-auto text-2xl font-title font-black text-start pb-10 font-semibold flex flex-col items-center mdl:items-start'>Historique de commandes</h2>
          <OrderHistory />
        </div>
      case 'ads':
        return (
          <div className="">
            <SecondhandPage classAdditional="h-auto py-20" />
          </div>
        )
      case 'Cart':
        return (
          <div className="cart-container">
            {loadingCartSection && <CartLoader />}
            <div className={loadingCartSection ? 'hidden' : ''}>
              <ShoppingCart
                noMargin={true}
                customTitleClass="text-start font-semibold flex flex-col items-center mdl:items-start"
                customEmptyClass=""
                LoadingCart={setIsLoadingCart}
                onTotalUpdate={setOnTotalUpdate}
                onShowEmptyCartChange={setEmptyCart}
              />

              <div className="mt-3 px-4 " onClick={handleCartRedirect}>
                {!EmptyCart ? <OrderCart buttonText="Détails" /> : null}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const avatarUrl = userData?.Avatar?.url
    ? `${API_URL}${userData.Avatar.url}`
    : DefaultAvatar

  return (
    <div className="pt-20 pb-10 min-h-screen bg-gray-100">
      <div className="justify-center w-full z-50">
        <HeaderBottomMyAccount />
      </div>
      <div className="mx-auto mdl:py-0 py-5 mdl:px-10 flex flex-col mdl:flex-row items-center mdl:items-start mdl:mt-5">
        <div className="w-auto mdl:w-1/4 p-4 mdl:p-4">
          <div className="flex flex-col items-center mdl:items-start mb-4 mt-5">
            <div className="flex justify-center">
              <img
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-38 md:h-38 lg:w-45 lg:h-45 object-cover bg-gray-200 rounded-full"
                src={avatarUrl}
                alt={userData?.Avatar?.alternativeText || 'Default Avatar'}
                onLoad={handleAvatarLoad}
              />
            </div>
            <h3 className="mt-2 text-lg font-semibold">
              {userData?.username || 'Nom utilisateur'}
            </h3>
            <p className="text-gray-500">
              {userData?.email || 'Email utilisateur'}
            </p>
          </div>
          <div className="pt-2">
            <nav className="flex flex-col items-center mdl:items-start text-left space-y-2">
              <button
                onClick={() => setSelectedSection('personal-info')}
                className={`w-auto text-gray-700 font-body rounded-none text-left ${
                  selectedSection === 'personal-info'
                    ? 'text-red-500 font-bold'
                    : 'hover:text-red-500'
                }`}
              >
                Informations Personnelles
              </button>
              <button
                onClick={() => setSelectedSection('billing-payments')}
                className={`w-auto text-gray-700 font-body rounded-none text-left ${
                  selectedSection === 'billing-payments'
                    ? 'text-red-500 font-bold'
                    : 'hover:text-red-500'
                }`}
              >
                Facturation & Paiement
              </button>
              <button
                onClick={() => setSelectedSection('order-history')}
                className={`w-auto text-gray-700 font-body rounded-none text-left ${
                  selectedSection === 'order-history'
                    ? 'text-red-500 font-bold'
                    : 'hover:text-red-500'
                }`}
              >
                Historique de commandes
              </button>
              <button
                onClick={() => setSelectedSection('ads')}
                className={`w-auto text-gray-700 font-body rounded-none text-left ${
                  selectedSection === 'ads'
                    ? 'text-red-500 font-bold'
                    : 'hover:text-red-500'
                }`}
              >
                Mes Annonces
              </button>
              <button
                onClick={() => setSelectedSection('Cart')}
                className={`w-auto text-gray-700 font-body rounded-none text-left ${
                  selectedSection === 'Cart'
                    ? 'text-red-500 font-bold'
                    : 'hover:text-red-500'
                }`}
              >
                Mon Panier
              </button>
            </nav>
          </div>
        </div>
        <div className="w-full min-h-full mdl:w-3/4 mdl:p-8 mt-16 mb-20 ">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}

export default MyAccount
