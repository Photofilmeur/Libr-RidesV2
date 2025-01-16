import React from 'react'

function CardLoader() {
  const cards = new Array(8).fill(0)

  return (
    <div className="relative min-h-screen min-w-full z-0 bg-black">
      <div className="w-full p-10 h-full flex flex-col items-center gap-10 pt-20">
        <br />
        <br />
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mdl:grid-cols-3 xl:grid-cols-4 gap-20 md:gap-8 sm:gap-y-2 lg:gap-20 p-10">
          {cards.map((_, index) => (
            <div
              key={index}
              className="flex flex-col bg-neutral-300 w-60 h-100 animate-pulse rounded-xl p-4 gap-4"
            >
              <div className="bg-neutral-400/50 w-full h-[140px] animate-pulse rounded-md"></div>
              <p className="flex items-center justify-center ">
                Chargement en cours...
              </p>
              <div className="flex flex-col gap-2">
                <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardLoader
