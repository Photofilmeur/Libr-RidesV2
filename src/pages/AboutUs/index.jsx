import React, { useEffect, useState } from 'react'
import LaMarque from '../../components/AboutUs'
import Footer from '../../components/Footer/index'
import ContactUs from '../../components/designLayouts/ContactUs'
import AccueilLoader from '../../components/designLayouts/Loaders/AccueilLoader'

const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingLaMarque, setIsLoadingLaMarque] = useState(false)
  const loadingTimeout = 500

  useEffect(() => {
    let timer

    const startTimer = () => {
      timer = setTimeout(() => {
        setIsLoading(true)
      }, loadingTimeout)
    }

    if (isLoadingLaMarque) {
      startTimer()
    } else {
      setIsLoading(false)
    }

    return () => {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }, [isLoadingLaMarque])

  return (
    <div>
      {isLoading && <AccueilLoader />}

      <div className={isLoading ? 'hidden' : ''}>
        <LaMarque setIsLoading={setIsLoadingLaMarque} />

        <div id="contact-section" style={{ scrollMarginTop: '75px' }}>
          <ContactUs />
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default AboutUs
