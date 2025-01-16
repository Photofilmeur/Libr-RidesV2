import React from 'react'
import '../Points.css'

function CartLoader() {
  const cards = new Array(4).fill(0)

  return (
    <div className="relative h-full min-w-full z-0 bg-gray-100">
      <div className="pointLoader pb-10 pt-4">
        <h2 className="w-auto text-2xl font-title text-center ml-4 text-start font-semibold">
          Chagement{' '}
        </h2>
        <div class="box-load1"></div>
        <div class="box-load2"></div>
        <div class="box-load3"></div>
      </div>
      <div className="w-auto pt-0 px-4 pb-4 h-full flex flex-col items-center gap-10">
        <div className="grid grid-cols-1 gap-4 w-full h-full">
          {cards.map((_, index) => (
            <div
              key={index}
              className="relative flex items-center bg-neutral-300 w-4/4 h-24 p-4 rounded-lg animate-pulse"
            >
              {/* Image Placeholder */}
              <div className="w-32 h-full bg-neutral-400/50 rounded-md"></div>

              {/* Details Placeholder */}
              <div className="flex-1 ml-4 ">
                {/* Product name */}
                <div className="bg-neutral-400/50 w-3/4 h-6 animate-pulse rounded-md mb-2"></div>

                {/* Product Price */}
                <div className=" bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md mb-2"></div>

                <div className="flex w-2/4">
                  {/* Product quantity */}
                  <div className=" bg-neutral-400/50 w-2/3 h-4 animate-pulse rounded-md mr-2"></div>
                  <div className=" bg-neutral-400/50 w-1/3 h-4 animate-pulse rounded-md"></div>
                </div>
              </div>

              {/* Trash Icon Placeholder */}
              <div className="absolute top-0 right-0 bg-neutral-400/50 w-5 h-5 animate-pulse rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CartLoader
