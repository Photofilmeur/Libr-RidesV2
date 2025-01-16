import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import qs from 'qs'
import { ShowAllButton, CloseButton } from '../designLayouts/buttons/ShowButton'
import { API_URL } from '../../constants/ConfigAPI'

function FicheTechnique({ setIsLoading }) {
  const { id } = useParams()
  const [produit, setProduit] = useState(null)
  const [isOpenAll, setIsOpenAll] = useState(true)
  const [isOpenMoteur, setIsOpenMoteur] = useState(true)
  const [isOpenChassis, setIsOpenChassis] = useState(true)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const query = qs.stringify(
    {
      fields: ['FicheTechnique'],
    },
    {
      encodeValuesOnly: true,
    }
  )

  useEffect(() => {
    let timer

    const fetchProduit = async () => {
      try {
        timer = setTimeout(() => {
          setIsLoading(true)
        }, 500)

        const res = await fetch(`${API_URL}/api/produits/${id}?${query}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })

        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`)
        }

        const response = await res.json()
        setProduit(response.data)

        clearTimeout(timer)
        setIsLoading(false)
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données FicheTechnique:',
          error
        )
        clearTimeout(timer)
        setIsLoading(false)
      }
    }

    fetchProduit()

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [id, query, setIsLoading])

  if (!produit) {
    return null
  }

  return (
    <div>
      <div
        className={
          !isSmallScreen && isOpenAll ? 'h-[685px] overflow-hidden' : 'h-auto'
        }
      >
        <h2 className="lgl:pl-20 pt-10 pb-5 font-title font-bold text-2xl lgl:text-4xl text-center lgl:text-left">
          Fiche Technique
        </h2>
        <div className="h-auto lgl:p-20 grid xl:grid-cols-5 lgl:grid-cols-4 grid-cols-2 grid-rows-1 gap-0 ">
          {/* Section Moteur */}
          <div
            className={`w-full h-full col-span-2 col-start-1 row-start-1 lgl:row-start-1 space-y-10 ${
              isSmallScreen ? 'border-b border-t' : ''
            }`}
            style={{
              height: isSmallScreen && isOpenMoteur ? '72px' : 'auto',
              overflow: isSmallScreen && isOpenMoteur ? 'hidden' : 'visible',
            }}
          >
            {isSmallScreen ? (
              <div className="w-full flex items-center justify-center h-auto">
                <h3
                  onClick={() => setIsOpenMoteur(!isOpenMoteur)}
                  className="h-auto w-20 mt-6 font-title font-bold text-xl text-red-500 cursor-pointer"
                >
                  MOTEUR
                </h3>
              </div>
            ) : (
              <h3 className="font-title font-bold text-2xl text-red-500">
                MOTEUR
              </h3>
            )}
            {produit.attributes.FicheTechnique.map((Section, index) =>
              index === 0 ? (
                <div key={index} className="space-y-10 px-8 lgl:px-0">
                  {Section.children && Section.children.length > 0
                    ? Section.children.map((listItem, index) => (
                        <ul key={index}>
                          {listItem.children && listItem.children.length > 0 ? (
                            <div className="grid grid-cols-5 mb-10 gap-4">
                              <div className=" col-start-1 col-span-2 font-title font-bold text-lg lgl:text-xl">
                                <p>{listItem.children[0].text}</p>
                              </div>
                              <div className="col-start-4 lgl:col-start-3 xl:col-start-4 col-span-2 font-body text-base lgl:text-lg flex items-end justify-start">
                                {listItem.children.length > 1 ? (
                                  <p>{listItem.children[1].text}</p>
                                ) : (
                                  <p>N.A</p>
                                )}
                              </div>
                            </div>
                          ) : (
                            console.log('Problème Titre MOTEUR Manquant')
                          )}
                        </ul>
                      ))
                    : console.log('Problème Données MOTEUR Manquant')}
                </div>
              ) : null
            )}
          </div>
          {/* Section Chassis */}
          <div
            className={`w-full h-full col-span-2 col-start-1 lgl:col-start-3 xl:col-start-4 row-start-2 lgl:row-start-1 space-y-10 ${
              isSmallScreen ? ' border-b pb-10' : ''
            }`}
            style={{
              height: isSmallScreen && isOpenChassis ? '72px' : 'auto',
              overflow: isSmallScreen && isOpenChassis ? 'hidden' : 'visible',
            }}
          >
            {isSmallScreen ? (
              <div className="w-full flex items-center justify-center h-auto">
                <h3
                  onClick={() => setIsOpenChassis(!isOpenChassis)}
                  className="h-auto w-20 mt-6 font-title font-bold text-xl text-red-500 cursor-pointer"
                >
                  CHASSIS
                </h3>
              </div>
            ) : (
              <h3 className="font-title font-bold text-2xl text-red-500">
                CHASSIS
              </h3>
            )}
            {produit.attributes.FicheTechnique.map((Section, index) =>
              index === 2 ? (
                <div key={index} className="space-y-10 px-8 lgl:px-0">
                  {Section.children && Section.children.length > 0
                    ? Section.children.map((listItem, index) => (
                        <ul className="h-full" key={index}>
                          {listItem.children && listItem.children.length > 0 ? (
                            <div className="grid grid-cols-5 gap-4">
                              <div className=" col-start-1 col-span-2 font-title font-bold text-lg lgl:text-xl">
                                <p>{listItem.children[0].text}</p>
                              </div>
                              <div className="col-start-4 lgl:col-start-3 xl:col-start-4 col-span-2 font-body text-base lgl:text-lg flex items-end justify-start">
                                {listItem.children.length > 1 ? (
                                  <p>{listItem.children[1].text}</p>
                                ) : (
                                  <p>N.A</p>
                                )}
                              </div>
                            </div>
                          ) : (
                            console.log('Problème Titre Chassis Manquant')
                          )}
                        </ul>
                      ))
                    : console.log('Problème Données Chassis Manquant')}
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
      {!isSmallScreen ? (
        <div>
          {isOpenAll ? (
            <ShowAllButton onClick={() => setIsOpenAll(false)} />
          ) : (
            <CloseButton onClick={() => setIsOpenAll(true)} />
          )}
        </div>
      ) : null}
    </div>
  )
}

export default FicheTechnique
