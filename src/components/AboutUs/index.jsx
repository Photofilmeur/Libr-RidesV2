import React, { useEffect } from 'react'
import ShowroomIllu from '../../assets/images/La marque/Showroom.webp'
import motosIllu from '../../assets/images/La marque/450.webp'
import quadsIllu from '../../assets/images/La marque/TouringQuad.webp'
import expansionIllu from '../../assets/images/La marque/voom.webp'
import StatsIllu from '../../assets/images/La marque/banner.webp'

const LaMarque = ({ setIsLoading }) => {
  useEffect(() => {
    const images = [
      ShowroomIllu,
      motosIllu,
      quadsIllu,
      expansionIllu,
      StatsIllu,
    ]

    const loadImages = () => {
      const promises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = resolve
        })
      })

      Promise.all(promises).then(() => setIsLoading(false))
    }

    setIsLoading(true)
    loadImages()
  }, [setIsLoading])

  return (
    <div className="min-h-screen">
      {/* Section La marque */}
      <div className="relative">
        <img
          src={ShowroomIllu}
          alt="Background marque"
          className="w-full h-[750px] object-none object-bottom "
        />
        <div className="pt-20 w-auto absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center lg:items-center xs:items-start">
          <div className="mx-5 lg:mx-0 lg:text-center w-2/2 ">
            <h2 className="md:text-5xl text-4xl font-bold text-white font-body">
              LA MARQUE Libr'Rides
            </h2>
            <p className="text-white mt-4 xs:text-lg md:text-xl font-title">
              Découvrez Libr'Rides, le constructeur motos, quads et ATV depuis
              2010.
            </p>
          </div>
        </div>
      </div>

      {/* Section L'univers de la marque */}
      <div className="bg-white py-16 px-6 lg:px-20 w-2/3 mx-auto">
        <h2 className="xl:text-4xl lg:text-3xl xs:text-2xl font-body font-bold mb-8">
          L'univers Libr'Rides
        </h2>
        <p className="xl:text-xl lg:text-lg xs:text-md leading-relaxed mb-6 font-title">
          Expert dans la conception de motos et de véhicules divers, incluant
          des modèles pour la route, le circuit, et le tout-terrain tels que les
          quads et les ATV, Libr'Rides se distingue par son utilisation des
          technologies les plus avancées et des moteurs de dernière génération.
        </p>

        <p className="xl:text-xl lg:text-lg xs:text-md leading-relaxed mb-6 font-title">
          Fondée en 2010 à Paris, notre entreprise emploie aujourd'hui plus de
          1500 personnes et gère la conception, le développement et la
          fabrication de nos véhicules directement depuis notre site de
          production. Présente dans plus de 50 pays, Libr'Rides est reconnue à
          l'échelle internationale.
        </p>
        <p className="xl:text-xl lg:text-lg xs:text-md leading-relaxed mb-6 font-title">
          Nous sommes animés par une véritable passion pour la conduite et nous
          nous engageons à repousser les limites de l'innovation et des
          technologies. Chez Libr'Rides, le plaisir de conduire et la quête
          d'évasion sont au centre de notre mission.
        </p>
      </div>

      {/* Section Motos */}
      <div className="bg-gray-100 sm:pt-16 lg:py-12 px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-screen-xl mx-auto lg:mb-16">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="xl:text-4xl lg:text-3xl xs:text-2xl font-body font-medium mb-4">
              Les motos Libr'Rides
            </h2>
            <p className="xl:text-xl lg:text-lg xs:text-md mb-4 font-title">
              <span className="font-semibold">Libr'Road </span> vous propose une
              gamme diversifiée de motos pour satisfaire toutes vos envies de
              conduite. Découvrez notre gamme{' '}
              <span className="font-semibold">Libr'Road (Lr) </span> avec ses
              roadsters polyvalents, parfaits pour la ville comme pour les
              escapades. Pour les amateurs d'aventure, la{' '}
              <span className="font-semibold">Libr'RoadCross (Lrc) </span> est
              idéale, offrant une excellente performance sur route et en
              tout-terrain. Si vous cherchez des sensations fortes sur route et
              circuit, explorez la{' '}
              <span className="font-semibold">Libr'RoadSport (Lrs) </span> avec
              ses motos sportives conçues pour la vitesse et la maniabilité.
              Enfin, pour les passionnés de circuit, la{' '}
              <span className="font-semibold">Libr'RoadSuperSport (Lrss) </span>{' '}
              vous offre des motos spécifiquement conçues pour la performance
              pure sur circuit.
            </p>
            <p className="xl:text-xl lg:text-lg xs:text-md mb-4 font-title">
              <span className="font-semibold">Libr'Cross </span> vous propose
              une gamme complète de motos cross adaptées à tous les niveaux et
              besoins. La gamme{' '}
              <span className="font-semibold">Libr'Cross (Lc) </span> se décline
              en plusieurs sous-catégories : la version{' '}
              <span className="font-semibold">LcElectra </span> offre une option
              électrique pour une conduite silencieuse et écologique, la version{' '}
              <span className="font-semibold">Lce</span> est une moto enduro
              homologuée, parfaite pour les parcours techniques et variés, et
              enfin, la <span className="font-semibold">LcMini </span> est
              spécialement conçue pour les enfants, avec une cylindrée et une
              ergonomie adaptées aux jeunes pilotes.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={motosIllu}
              alt="Motos"
              className="rounded-lg shadow-lg object-cover w-full xl:max-w-xl sm:max-w-md lg:max-w-lg lg:ml-5"
            />
          </div>
        </div>
      </div>

      {/* Section Quads */}
      <div className="bg-gray-100 sm:pt-16 lg:py-12 px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-center max-w-screen-xl mx-auto pb-16 lg:mb-16">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="xl:text-4xl lg:text-3xl xs:text-2xl font-body font-medium mb-4">
              Les quads & ATV Libr'Rides
            </h2>
            <p className="xl:text-xl lg:text-lg xs:text-md mb-4 font-title">
              <span className="font-semibold">Libr'ATV </span> propose une gamme
              complète de quads et d'<span className="font-semibold">ATV </span>
              , allant de 700cc à 1200cc, conçue pour s'adapter à divers
              terrains et besoins. La gamme{' '}
              <span className="font-semibold">Libr'ATV </span> inclut des quads
              pour les loisirs personnels, comme les balades tout-terrain, ainsi
              que des <span className="font-semibold">ATV </span> (All Terrain
              Vehicle) pour des usages professionnels, offrant une performance
              exceptionnelle dans des environnements variés. Chaque modèle est
              conçu pour affronter des conditions difficiles tout en
              garantissant une conduite agréable et efficace, que ce soit pour
              l'aventure ou des tâches spécifiques.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={quadsIllu}
              alt="Quads"
              className="rounded-lg shadow-lg object-cover w-full xl:max-w-xl sm:max-w-md lg:max-w-lg lg:ml-5"
            />
          </div>
        </div>
      </div>

      {/* Section illustration Stats */}
      <div
        className="w-full h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${StatsIllu})` }}
      >
        <div className="text-white text-center grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Stat 1 */}
          <div>
            <h2 className="text-5xl font-bold mt-2">50</h2>
            <p className="text-sm mt-2">Pays & régions</p>
          </div>
          {/* Stat 2 */}
          <div>
            <h2 className="text-5xl font-bold mt-2">1,000</h2>
            <p className="text-sm mt-2">Concessions</p>
          </div>
          {/* Stat 3 */}
          <div>
            <h2 className="text-5xl font-bold mt-2">1,500</h2>
            <p className="text-sm mt-2">employées</p>
          </div>
        </div>
      </div>

      {/* Section Réseau développé */}
      <div className="bg-white sm:pt-16 lg:py-12 px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-screen-xl mx-auto pb-16 lg:mb-16">
          <div className="lg:w-1/2 lg:pr-16 mt-8 lg:mt-0">
            <h2 className="xl:text-4xl lg:text-3xl xs:text-2xl font-body font-medium mb-4">
              Un réseau en pleine expansion
            </h2>
            <p className="xl:text-xl lg:text-lg xs:text-md mb-4 font-title">
              Avec plus de 100 concessions réparties dans toute la France
              métropolitaine et les Dom-Tom, Libr'Rides propose une couverture
              nationale, répondant à la demande croissante pour ses motos et
              quads.
            </p>
            <p className="xl:text-xl lg:text-lg xs:text-md mb-6 font-title">
              Fort de son réseau de distribution solide et impliqué, Libr'Rides
              continue de se développer et de se rapprocher de ses clients, tout
              en marquant une nouvelle étape de son histoire en participant
              désormais à des compétitions de renommée mondiale, telles que le
              légendaire Tourist Trophy de l'île de Man.
            </p>
            <p className="xl:text-xl lg:text-lg xs:text-md mb-6 font-title">
              Que vous soyez à la recherche d'une moto de route performante ou
              d'un quad tout-terrain robuste, notre réseau est là pour vous
              accompagner dans votre choix et vous offrir une expérience unique.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={expansionIllu}
              alt="Moto"
              className="rounded-lg shadow-lg object-cover w-full xl:max-w-xl sm:max-w-md lg:max-w-lg lg:ml-5"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LaMarque
