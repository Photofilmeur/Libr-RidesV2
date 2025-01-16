import React, { useEffect, useState } from 'react'
import MyAccount from '../../components/Account/MyAccount/index'
import Footer from '../../components/Footer/index'
import AccueilLoader from '../../components/designLayouts/Loaders/AccueilLoader'

function MyAccountPage() {
  const [loading, setLoading] = useState(false)
  const [showFooter, setShowFooter] = useState(false)

  useEffect(() => {
    const footerTimeout = setTimeout(() => {
      setShowFooter(true); 
    }, 500); 

    return() => {
      clearTimeout(footerTimeout)
    }
  },[])

  return (
    <div>
      {loading && <AccueilLoader />}
      <div className={loading ? 'hidden' : ''}>
        <MyAccount setIsLoadingPage={setLoading} />
       { showFooter && <Footer />}
      </div>
    </div>
  )
}

export default MyAccountPage
