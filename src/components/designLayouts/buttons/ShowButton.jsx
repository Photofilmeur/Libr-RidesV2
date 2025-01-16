import React from 'react'

export function ShowAllButton({ onClick }) {
  return (
    <div className="w-full flex items-center justify-center">
      <button
        onClick={onClick}
        className="w-auto text-red-700 font-semibold flex flex-col items-center"
      >
        <div className="border-t-2 border-red-500 w-8 mb-2"></div>
        TOUT AFFICHER
      </button>
    </div>
  )
}

export function CloseButton({ onClick }) {
  return (
    <div className="w-full flex items-center justify-center">
      <button
        onClick={onClick}
        className="w-auto text-red-700 font-semibold flex flex-col items-center"
      >
        <div className="border-t-2 border-red-500 w-3 mb-2"></div>
        FERMER
      </button>
    </div>
  )
}
