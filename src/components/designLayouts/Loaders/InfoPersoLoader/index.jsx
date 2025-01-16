import React from 'react'
import '../Points.css'

function InfoPersoLoader() {
  const cards = new Array(1).fill(0)

  return (
    <div className="relative h-full min-w-full z-0 bg-gray-100">
      <div className="pointLoader md:pb-10">
        <h2 className="w-auto text-2xl font-title text-center ml-4 text-start font-semibold">
          Chagement{' '}
        </h2>
        <div class="box-load1"></div>
        <div class="box-load2"></div>
        <div class="box-load3"></div>
      </div>
      <div className="w-auto pt-20 px-4 pb-4 h-full flex flex-col items-center gap-10">

        <div className="grid grid-cols-1 gap-4 w-full h-full">
          {cards.map((_, index) => (
            <div
            key={index}
            className="relative bg-white shadow-lg w-full rounded-lg p-6 border border-gray-200"
            style={{ minHeight: '200px' }}
          >
           
           <div className="grid grid-cols-2 gap-6">
                {/* Première colonne de la carte */}
                <div className="space-y-4">
                  <div className="bg-neutral-300 h-8 w-full animate-pulse rounded-md"></div>
                  <div className="bg-neutral-300 h-8 w-full animate-pulse rounded-md"></div>
                  <div className="bg-neutral-300 h-8 w-full animate-pulse rounded-md"></div>
                </div>

               {/* Deuxième colonne de la carte */}
               <div className="space-y-4">
                  <div className="bg-neutral-300 h-8 w-full animate-pulse rounded-md"></div>
                  <div className="bg-neutral-300 h-8 w-full animate-pulse rounded-md"></div>
                  <div className="bg-neutral-300 h-8 w-full animate-pulse rounded-md"></div>
                </div>

                 {/* Image section at the bottom */}
              <div className="mt-6">
                <div className="bg-neutral-300 h-20 w-full animate-pulse rounded-md border-dashed border-2 border-gray-400 flex items-center justify-center">
                  
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-neutral-300 h-20 w-full animate-pulse rounded-md border-dashed border-2 border-gray-400 flex items-center justify-center">
                  <span className="text-gray-400">Image Placeholder</span>
                </div>
              </div>
              
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoPersoLoader
